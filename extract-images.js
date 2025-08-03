#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const https = require('https');
const http = require('http');
const { URL } = require('url');

/**
 * Extract images from Wix site HTML files
 * 
 * Usage: node extract-images.js <htmlFile> [outputDir]
 * 
 * Features:
 * - Extracts images from various Wix image patterns
 * - Downloads images to specified directory
 * - Handles both linked and embedded images
 * - Generates a manifest of extracted images
 */

class WixImageExtractor {
  constructor(htmlFile, outputDir = './extracted-images') {
    this.htmlFile = htmlFile;
    this.outputDir = outputDir;
    this.images = new Set();
    this.downloadedImages = [];
    this.errors = [];
  }

  async extract() {
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

  extractFromStandardImgTags($) {
    $('img').each((i, elem) => {
      const src = $(elem).attr('src');
      const dataSrc = $(elem).attr('data-src');
      
      if (src) this.addImage(src);
      if (dataSrc) this.addImage(dataSrc);
    });
  }

  extractFromWixStaticUrls($, html) {
    // Extract all Wix static URLs from the HTML content
    const wixUrlRegex = /https?:\/\/static\.wixstatic\.com\/[^"'\s)>]+\.(jpg|jpeg|png|gif|webp|svg|ico)/gi;
    const matches = html.match(wixUrlRegex) || [];
    
    matches.forEach(url => this.addImage(url));
  }

  extractFromDataSrcAttributes($) {
    // Look for elements with data-src attributes
    $('[data-src]').each((i, elem) => {
      const dataSrc = $(elem).attr('data-src');
      if (dataSrc && this.isImageUrl(dataSrc)) {
        this.addImage(dataSrc);
      }
    });
  }

  extractFromStyleBackgrounds($, html) {
    // Extract background images from style attributes and CSS
    const bgImageRegex = /background-image\s*:\s*url\(['"]?([^'")\s]+)['"]?\)/gi;
    let match;
    
    while ((match = bgImageRegex.exec(html)) !== null) {
      const url = match[1];
      if (this.isImageUrl(url)) {
        this.addImage(url);
      }
    }

    // Also check inline styles
    $('[style]').each((i, elem) => {
      const style = $(elem).attr('style');
      const bgMatch = style.match(/background-image\s*:\s*url\(['"]?([^'")\s]+)['"]?\)/i);
      if (bgMatch && this.isImageUrl(bgMatch[1])) {
        this.addImage(bgMatch[1]);
      }
    });
  }

  extractFromScriptData($, html) {
    // Extract images from JSON data in script tags (common in Wix sites)
    $('script[type="application/json"], script:not([src])').each((i, elem) => {
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

  extractFromFavicons($) {
    // Extract favicon and app icons
    $('link[rel*="icon"], link[rel="apple-touch-icon"]').each((i, elem) => {
      const href = $(elem).attr('href');
      if (href && this.isImageUrl(href)) {
        this.addImage(href);
      }
    });
  }

  addImage(url) {
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
    } catch (error) {
      // Invalid URL, skip
    }
  }

  isImageUrl(url) {
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

  async downloadImages() {
    console.log(`Downloading ${this.images.size} images...`);
    
    const promises = Array.from(this.images).map(url => this.downloadImage(url));
    await Promise.allSettled(promises);
    
    console.log(`Successfully downloaded: ${this.downloadedImages.length}`);
    console.log(`Failed downloads: ${this.errors.length}`);
  }

  async downloadImage(url) {
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
      
      return new Promise((resolve, reject) => {
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
      this.errors.push({ url, error: error.message });
    }
  }

  generateFilename(url) {
    try {
      const urlObj = new URL(url);
      let pathname = urlObj.pathname;
      
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
        const mediaMatch = pathname.match(/\/media\/([^\/]+)/);
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
    } catch (error) {
      // Fallback filename
      return `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`;
    }
  }

  generateManifest() {
    const manifest = {
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

  printSummary() {
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
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node extract-images.js <htmlFile> [outputDir]');
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

  const extractor = new WixImageExtractor(htmlFile, outputDir);
  extractor.extract().catch(error => {
    console.error('Extraction failed:', error);
    process.exit(1);
  });
}

module.exports = WixImageExtractor;