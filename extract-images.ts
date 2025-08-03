#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import https from 'https';
import http from 'http';
import { URL } from 'url';

/**
 * Extract images from Wix site HTML files
 * 
 * Usage: tsx extract-images.ts <htmlFile> [outputDir]
 * 
 * Features:
 * - Extracts images from various Wix image patterns
 * - Downloads images to specified directory
 * - Handles both linked and embedded images
 * - Generates a manifest of extracted images
 */

interface ImageDownloadResult {
  url: string;
  filename: string;
  status: 'downloaded' | 'exists';
}

interface ExtractorError {
  url: string;
  error: string;
}

interface ImageManifest {
  sourceFile: string;
  extractionDate: string;
  totalImages: number;
  downloadedImages: number;
  failedDownloads: number;
  images: ImageDownloadResult[];
  errors: ExtractorError[];
}

class WixImageExtractor {
  private htmlFile: string;
  private outputDir: string;
  private images: Set<string>;
  private downloadedImages: ImageDownloadResult[];
  private errors: ExtractorError[];

  constructor(htmlFile: string, outputDir: string = './extracted-images') {
    this.htmlFile = htmlFile;
    this.outputDir = outputDir;
    this.images = new Set();
    this.downloadedImages = [];
    this.errors = [];
  }

  async extract(): Promise<void> {
    console.log(`Extracting images from: ${this.htmlFile}`);
    
    // Create output directory
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Read and parse HTML
    const html = fs.readFileSync(this.htmlFile, 'utf8');
    const $ = cheerio.load(html);

    // Extract images using various patterns
    this.extractFromStandardImgTags($);
    this.extractFromWixStaticUrls($, html);
    this.extractFromDataSrcAttributes($);
    this.extractFromStyleBackgrounds($, html);
    this.extractFromScriptData($, html);
    this.extractFromFavicons($);

    console.log(`Found ${this.images.size} unique images`);

    // Download images
    if (this.images.size > 0) {
      await this.downloadImages();
      this.generateManifest();
    }

    this.printSummary();
  }

  private extractFromStandardImgTags($: cheerio.CheerioAPI): void {
    $('img').each((_, elem) => {
      const src = $(elem).attr('src');
      const dataSrc = $(elem).attr('data-src');
      
      if (src) this.addImage(src);
      if (dataSrc) this.addImage(dataSrc);
    });
  }

  private extractFromWixStaticUrls(_: cheerio.CheerioAPI, html: string): void {
    // Extract all Wix static URLs from the HTML content
    const wixUrlRegex = /https?:\/\/static\.wixstatic\.com\/[^"'\s)>]+\.(jpg|jpeg|png|gif|webp|svg|ico)/gi;
    const matches = html.match(wixUrlRegex) || [];
    
    matches.forEach(url => this.addImage(url));
  }

  private extractFromDataSrcAttributes($: cheerio.CheerioAPI): void {
    // Look for elements with data-src attributes
    $('[data-src]').each((_, elem) => {
      const dataSrc = $(elem).attr('data-src');
      if (dataSrc && this.isImageUrl(dataSrc)) {
        this.addImage(dataSrc);
      }
    });
  }

  private extractFromStyleBackgrounds($: cheerio.CheerioAPI, html: string): void {
    // Extract background images from style attributes and CSS
    const bgImageRegex = /background-image\s*:\s*url\(['"]?([^'")\s]+)['"]?\)/gi;
    let match: RegExpExecArray | null;
    
    while ((match = bgImageRegex.exec(html)) !== null) {
      const url = match[1];
      if (this.isImageUrl(url)) {
        this.addImage(url);
      }
    }

    // Also check inline styles
    $('[style]').each((_, elem) => {
      const style = $(elem).attr('style');
      if (style) {
        const bgMatch = style.match(/background-image\s*:\s*url\(['"]?([^'")\s]+)['"]?\)/i);
        if (bgMatch && this.isImageUrl(bgMatch[1])) {
          this.addImage(bgMatch[1]);
        }
      }
    });
  }

  private extractFromScriptData($: cheerio.CheerioAPI, _: string): void {
    // Extract images from JSON data in script tags (common in Wix sites)
    $('script[type="application/json"], script:not([src])').each((_, elem) => {
      const content = $(elem).html();
      if (content) {
        // Look for image URLs in JSON data
        const imageUrlRegex = /["']https?:\/\/[^"'\s]*\.(jpg|jpeg|png|gif|webp|svg|ico)[^"'\s]*["']/gi;
        const matches = content.match(imageUrlRegex) || [];
        
        matches.forEach(match => {
          // Remove quotes
          const url = match.replace(/^["']|["']$/g, '');
          this.addImage(url);
        });
      }
    });
  }

  private extractFromFavicons($: cheerio.CheerioAPI): void {
    // Extract favicon and app icons
    $('link[rel*="icon"], link[rel="apple-touch-icon"]').each((_, elem) => {
      const href = $(elem).attr('href');
      if (href && this.isImageUrl(href)) {
        this.addImage(href);
      }
    });
  }

  private addImage(url: string): void {
    if (!url || url.startsWith('data:')) return; // Skip data URLs
    
    try {
      // Handle relative URLs
      if (url.startsWith('//')) {
        url = 'https:' + url;
      } else if (url.startsWith('/')) {
        // For relative paths, we'd need the base URL - skip for now
        return;
      }

      // Validate URL
      new URL(url);
      
      // Only add image URLs
      if (this.isImageUrl(url)) {
        this.images.add(url);
      }
    } catch {
      // Invalid URL, skip
    }
  }

  private isImageUrl(url: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.bmp', '.tiff'];
    const lowerUrl = url.toLowerCase();
    
    // Check file extension
    if (imageExtensions.some(ext => lowerUrl.includes(ext))) {
      return true;
    }

    // Check for Wix image patterns
    if (lowerUrl.includes('static.wixstatic.com') && 
        (lowerUrl.includes('/media/') || lowerUrl.includes('/image/') || lowerUrl.includes('fill'))) {
      return true;
    }

    return false;
  }

  private async downloadImages(): Promise<void> {
    console.log(`Downloading ${this.images.size} images...`);
    
    const promises = Array.from(this.images).map(url => this.downloadImage(url));
    await Promise.allSettled(promises);
    
    console.log(`Successfully downloaded: ${this.downloadedImages.length}`);
    console.log(`Failed downloads: ${this.errors.length}`);
  }

  private async downloadImage(url: string): Promise<void> {
    try {
      const urlObj = new URL(url);
      const filename = this.generateFilename(url);
      const filepath = path.join(this.outputDir, filename);

      // Skip if file already exists
      if (fs.existsSync(filepath)) {
        this.downloadedImages.push({ url, filename, status: 'exists' });
        return;
      }

      const client = urlObj.protocol === 'https:' ? https : http;
      
      return new Promise<void>((resolve, reject) => {
        const request = client.get(url, { timeout: 10000 }, (response) => {
          if (response.statusCode === 200) {
            const file = fs.createWriteStream(filepath);
            response.pipe(file);
            
            file.on('finish', () => {
              file.close();
              this.downloadedImages.push({ url, filename, status: 'downloaded' });
              resolve();
            });

            file.on('error', (err) => {
              fs.unlink(filepath, () => {}); // Delete partial file
              this.errors.push({ url, error: err.message });
              reject(err);
            });
          } else {
            this.errors.push({ url, error: `HTTP ${response.statusCode}` });
            reject(new Error(`HTTP ${response.statusCode}`));
          }
        });

        request.on('error', (err) => {
          this.errors.push({ url, error: err.message });
          reject(err);
        });

        request.on('timeout', () => {
          request.destroy();
          this.errors.push({ url, error: 'Request timeout' });
          reject(new Error('Request timeout'));
        });
      });
    } catch (error) {
      this.errors.push({ url, error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  private generateFilename(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      
      // Extract filename from URL
      let filename = path.basename(pathname);
      
      // If no extension, try to determine from URL params or use .jpg as default
      if (!path.extname(filename)) {
        // Check URL params for format info
        const format = urlObj.searchParams.get('fm') || 
                      urlObj.searchParams.get('format') || 
                      'jpg';
        filename += '.' + format;
      }

      // Handle Wix media URLs which might have path parameters
      if (urlObj.hostname === 'static.wixstatic.com' && pathname.includes('/media/')) {
        const mediaMatch = pathname.match(/\/media\/([^/]+)/);
        if (mediaMatch) {
          filename = mediaMatch[1];
          // Add extension if missing
          if (!path.extname(filename)) {
            filename += '.jpg';
          }
        }
      }

      // Sanitize filename
      filename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      
      // Ensure unique filename
      let counter = 1;
      let finalFilename = filename;
      const basename = path.parse(filename).name;
      const ext = path.parse(filename).ext;
      
      while (fs.existsSync(path.join(this.outputDir, finalFilename))) {
        finalFilename = `${basename}_${counter}${ext}`;
        counter++;
      }

      return finalFilename;
    } catch {
      // Fallback filename
      return `image_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.jpg`;
    }
  }

  private generateManifest(): void {
    const manifest: ImageManifest = {
      sourceFile: this.htmlFile,
      extractionDate: new Date().toISOString(),
      totalImages: this.images.size,
      downloadedImages: this.downloadedImages.length,
      failedDownloads: this.errors.length,
      images: this.downloadedImages,
      errors: this.errors
    };

    const manifestPath = path.join(this.outputDir, 'image-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`Manifest written to: ${manifestPath}`);
  }

  private printSummary(): void {
    console.log('\n=== EXTRACTION SUMMARY ===');
    console.log(`Source file: ${this.htmlFile}`);
    console.log(`Output directory: ${this.outputDir}`);
    console.log(`Total images found: ${this.images.size}`);
    console.log(`Successfully downloaded: ${this.downloadedImages.length}`);
    console.log(`Failed downloads: ${this.errors.length}`);
    
    if (this.errors.length > 0) {
      console.log('\nFailed downloads:');
      this.errors.forEach(error => {
        console.log(`  - ${error.url}: ${error.error}`);
      });
    }
  }
}

// CLI usage
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: tsx extract-images.ts <htmlFile> [outputDir]');
    console.log('');
    console.log('Extract images from Wix site HTML files');
    console.log('');
    console.log('Options:');
    console.log('  htmlFile   Path to the HTML file to process');
    console.log('  outputDir  Directory to save extracted images (default: ./extracted-images)');
    process.exit(1);
  }

  const htmlFile = args[0];
  const outputDir = args[1] || './extracted-images';

  if (!fs.existsSync(htmlFile)) {
    console.error(`Error: File not found: ${htmlFile}`);
    process.exit(1);
  }

  try {
    const extractor = new WixImageExtractor(htmlFile, outputDir);
    await extractor.extract();
  } catch (error) {
    console.error('Extraction failed:', error);
    process.exit(1);
  }
}

// Only run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default WixImageExtractor;