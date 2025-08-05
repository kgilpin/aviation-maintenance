#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import https from "https";
import http from "http";
import { URL } from "url";

/**
 * Extract media files from Wix site HTML files
 *
 * Usage: tsx extract-media.ts <htmlFile> [outputDir]
 *
 * Features:
 * - Extracts all media types (images, videos, audio) from various Wix patterns
 * - Downloads media files to specified directory
 * - Handles both linked and embedded media
 * - Generates a manifest of extracted media files
 */

interface MediaDownloadResult {
  url: string;
  filename: string;
  type: "image" | "video" | "audio" | "document";
  status: "downloaded" | "exists";
}

interface ExtractorError {
  url: string;
  error: string;
}

interface MediaManifest {
  sourceFile: string;
  extractionDate: string;
  totalMedia: number;
  downloadedMedia: number;
  failedDownloads: number;
  mediaByType: {
    images: number;
    videos: number;
    audio: number;
    documents: number;
  };
  media: MediaDownloadResult[];
  errors: ExtractorError[];
}

class WixMediaExtractor {
  private htmlFile: string;
  private outputDir: string;
  private mediaUrls: Set<string>;
  private downloadedMedia: MediaDownloadResult[];
  private errors: ExtractorError[];

  constructor(htmlFile: string, outputDir: string = "./extracted-media") {
    this.htmlFile = htmlFile;
    this.outputDir = outputDir;
    this.mediaUrls = new Set();
    this.downloadedMedia = [];
    this.errors = [];
  }

  async extract(): Promise<void> {
    console.log(`Extracting media from: ${this.htmlFile}`);

    // Create output directory
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Read and parse HTML
    const html = fs.readFileSync(this.htmlFile, "utf8");
    const $ = cheerio.load(html);

    // Extract media using various patterns
    this.extractFromStandardImgTags($);
    this.extractFromVideoTags($);
    this.extractFromAudioTags($);
    this.extractFromWixStaticUrls($, html);
    this.extractFromDataSrcAttributes($);
    this.extractFromStyleBackgrounds($, html);
    this.extractFromScriptData($);
    this.extractFromFavicons($);
    this.extractFromLinkTags($);

    console.log(`Found ${this.mediaUrls.size} unique media files`);

    // Download media
    if (this.mediaUrls.size > 0) {
      await this.downloadMedia();
      this.generateManifest();
    }

    this.printSummary();
  }

  private extractFromStandardImgTags($: cheerio.CheerioAPI): void {
    $("img").each((_, elem) => {
      const src = $(elem).attr("src");
      const dataSrc = $(elem).attr("data-src");

      if (src) this.addMedia(src);
      if (dataSrc) this.addMedia(dataSrc);
    });
  }

  private extractFromVideoTags($: cheerio.CheerioAPI): void {
    $("video").each((_, elem) => {
      const src = $(elem).attr("src");
      const poster = $(elem).attr("poster");

      if (src) this.addMedia(src);
      if (poster) this.addMedia(poster);

      // Extract from source tags within video
      $(elem)
        .find("source")
        .each((_, sourceElem) => {
          const sourceSrc = $(sourceElem).attr("src");
          if (sourceSrc) this.addMedia(sourceSrc);
        });
    });
  }

  private extractFromAudioTags($: cheerio.CheerioAPI): void {
    $("audio").each((_, elem) => {
      const src = $(elem).attr("src");

      if (src) this.addMedia(src);

      // Extract from source tags within audio
      $(elem)
        .find("source")
        .each((_, sourceElem) => {
          const sourceSrc = $(sourceElem).attr("src");
          if (sourceSrc) this.addMedia(sourceSrc);
        });
    });
  }

  private extractFromLinkTags($: cheerio.CheerioAPI): void {
    // Extract stylesheets, documents, and other linked resources
    $("link[href]").each((_, elem) => {
      const href = $(elem).attr("href");
      const rel = $(elem).attr("rel");

      if (href && this.isMediaUrl(href) && rel !== "stylesheet") {
        this.addMedia(href);
      }
    });
  }

  private extractFromWixStaticUrls(_: cheerio.CheerioAPI, html: string): void {
    // Extract all Wix static URLs from the HTML content (images, videos, audio)
    const wixUrlRegex =
      /https?:\/\/static\.wixstatic\.com\/[^"'\s)>]+\.(jpg|jpeg|png|gif|webp|svg|ico|mp4|webm|avi|mov|mp3|wav|ogg|pdf|doc|docx)/gi;
    const matches = html.match(wixUrlRegex) || [];

    matches.forEach((url) => this.addMedia(url));
  }

  private extractFromDataSrcAttributes($: cheerio.CheerioAPI): void {
    // Look for elements with data-src attributes
    $("[data-src]").each((_, elem) => {
      const dataSrc = $(elem).attr("data-src");
      if (dataSrc && this.isMediaUrl(dataSrc)) {
        this.addMedia(dataSrc);
      }
    });
  }

  private extractFromStyleBackgrounds($: cheerio.CheerioAPI, html: string): void {
    // Extract background images from style attributes and CSS
    const bgImageRegex = /background-image\s*:\s*url\(['"]?([^'")\s]+)['"]?\)/gi;
    let match: RegExpExecArray | null;

    while ((match = bgImageRegex.exec(html)) !== null) {
      const url = match[1];
      if (this.isMediaUrl(url)) {
        this.addMedia(url);
      }
    }

    // Also check inline styles
    $("[style]").each((_, elem) => {
      const style = $(elem).attr("style");
      if (style) {
        const bgMatch = style.match(/background-image\s*:\s*url\(['"]?([^'")\s]+)['"]?\)/i);
        if (bgMatch && this.isMediaUrl(bgMatch[1])) {
          this.addMedia(bgMatch[1]);
        }
      }
    });
  }

  private extractFromScriptData($: cheerio.CheerioAPI): void {
    // Extract images from JSON data in script tags (common in Wix sites)
    $('script[type="application/json"], script:not([src])').each((_, elem) => {
      const content = $(elem).html();
      if (content) {
        // Look for media URLs in JSON data
        const mediaUrlRegex =
          /["']https?:\/\/[^"'\s]*\.(jpg|jpeg|png|gif|webp|svg|ico|mp4|webm|avi|mov|mp3|wav|ogg|pdf|doc|docx)[^"'\s]*["']/gi;
        const matches = content.match(mediaUrlRegex) || [];

        matches.forEach((match) => {
          // Remove quotes
          const url = match.replace(/^["']|["']$/g, "");
          this.addMedia(url);
        });
      }
    });
  }

  private extractFromFavicons($: cheerio.CheerioAPI): void {
    // Extract favicon and app icons
    $('link[rel*="icon"], link[rel="apple-touch-icon"]').each((_, elem) => {
      const href = $(elem).attr("href");
      if (href && this.isMediaUrl(href)) {
        this.addMedia(href);
      }
    });
  }

  private addMedia(url: string): void {
    if (!url || url.startsWith("data:")) return; // Skip data URLs

    try {
      // Handle relative URLs
      if (url.startsWith("//")) {
        url = "https:" + url;
      } else if (url.startsWith("/")) {
        // For relative paths, we'd need the base URL - skip for now
        return;
      }

      // Validate URL
      new URL(url);

      // Only add media URLs
      if (this.isMediaUrl(url)) {
        this.mediaUrls.add(url);
      }
    } catch {
      // Invalid URL, skip
    }
  }

  private isMediaUrl(url: string): boolean {
    const mediaExtensions = {
      image: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".ico", ".bmp", ".tiff"],
      video: [".mp4", ".webm", ".avi", ".mov", ".wmv", ".flv", ".mkv"],
      audio: [".mp3", ".wav", ".ogg", ".aac", ".flac", ".wma"],
      document: [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"],
    };

    const lowerUrl = url.toLowerCase();
    const allExtensions = Object.values(mediaExtensions).flat();

    // Check file extension
    if (allExtensions.some((ext) => lowerUrl.includes(ext))) {
      return true;
    }

    // Check for Wix media patterns
    if (
      lowerUrl.includes("static.wixstatic.com") &&
      (lowerUrl.includes("/media/") ||
        lowerUrl.includes("/image/") ||
        lowerUrl.includes("fill") ||
        lowerUrl.includes("/video/"))
    ) {
      return true;
    }

    return false;
  }

  private getMediaType(url: string): "image" | "video" | "audio" | "document" {
    const lowerUrl = url.toLowerCase();

    if (
      [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".ico", ".bmp", ".tiff"].some((ext) => lowerUrl.includes(ext))
    ) {
      return "image";
    }

    if ([".mp4", ".webm", ".avi", ".mov", ".wmv", ".flv", ".mkv"].some((ext) => lowerUrl.includes(ext))) {
      return "video";
    }

    if ([".mp3", ".wav", ".ogg", ".aac", ".flac", ".wma"].some((ext) => lowerUrl.includes(ext))) {
      return "audio";
    }

    if ([".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"].some((ext) => lowerUrl.includes(ext))) {
      return "document";
    }

    return "image"; // default fallback
  }

  private async downloadMedia(): Promise<void> {
    console.log(`Downloading ${this.mediaUrls.size} media files...`);

    const promises = Array.from(this.mediaUrls).map((url) => this.downloadMediaFile(url));
    await Promise.allSettled(promises);

    console.log(`Successfully downloaded: ${this.downloadedMedia.length}`);
    console.log(`Failed downloads: ${this.errors.length}`);
  }

  private async downloadMediaFile(url: string): Promise<void> {
    try {
      const urlObj = new URL(url);
      const filename = this.generateFilename(url);
      const filepath = path.join(this.outputDir, filename);

      // Skip if file already exists
      if (fs.existsSync(filepath)) {
        this.downloadedMedia.push({ url, filename, type: this.getMediaType(url), status: "exists" });
        return;
      }

      const client = urlObj.protocol === "https:" ? https : http;

      return new Promise<void>((resolve, reject) => {
        const request = client.get(url, { timeout: 10000 }, (response) => {
          if (response.statusCode === 200) {
            const file = fs.createWriteStream(filepath);
            response.pipe(file);

            file.on("finish", () => {
              file.close();
              this.downloadedMedia.push({ url, filename, type: this.getMediaType(url), status: "downloaded" });
              resolve();
            });

            file.on("error", (err) => {
              fs.unlink(filepath, () => {}); // Delete partial file
              this.errors.push({ url, error: err.message });
              reject(err);
            });
          } else {
            this.errors.push({ url, error: `HTTP ${response.statusCode}` });
            reject(new Error(`HTTP ${response.statusCode}`));
          }
        });

        request.on("error", (err) => {
          this.errors.push({ url, error: err.message });
          reject(err);
        });

        request.on("timeout", () => {
          request.destroy();
          this.errors.push({ url, error: "Request timeout" });
          reject(new Error("Request timeout"));
        });
      });
    } catch (error) {
      this.errors.push({ url, error: error instanceof Error ? error.message : "Unknown error" });
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
        const format = urlObj.searchParams.get("fm") || urlObj.searchParams.get("format") || "jpg";
        filename += "." + format;
      }

      // Handle Wix media URLs which might have path parameters
      if (urlObj.hostname === "static.wixstatic.com" && pathname.includes("/media/")) {
        const mediaMatch = pathname.match(/\/media\/([^/]+)/);
        if (mediaMatch) {
          filename = mediaMatch[1];
          // Add extension if missing
          if (!path.extname(filename)) {
            filename += ".jpg";
          }
        }
      }

      // Sanitize filename
      filename = filename.replace(/[^a-zA-Z0-9.\-_]/g, "_");

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
    const mediaByType = {
      images: this.downloadedMedia.filter((m) => m.type === "image").length,
      videos: this.downloadedMedia.filter((m) => m.type === "video").length,
      audio: this.downloadedMedia.filter((m) => m.type === "audio").length,
      documents: this.downloadedMedia.filter((m) => m.type === "document").length,
    };

    const manifest: MediaManifest = {
      sourceFile: this.htmlFile,
      extractionDate: new Date().toISOString(),
      totalMedia: this.mediaUrls.size,
      downloadedMedia: this.downloadedMedia.length,
      failedDownloads: this.errors.length,
      mediaByType,
      media: this.downloadedMedia,
      errors: this.errors,
    };

    const manifestPath = path.join(this.outputDir, "media-manifest.json");
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`Manifest written to: ${manifestPath}`);
  }

  private printSummary(): void {
    console.log("\n=== EXTRACTION SUMMARY ===");
    console.log(`Source file: ${this.htmlFile}`);
    console.log(`Output directory: ${this.outputDir}`);
    console.log(`Total media found: ${this.mediaUrls.size}`);
    console.log(`Successfully downloaded: ${this.downloadedMedia.length}`);

    const mediaByType = {
      images: this.downloadedMedia.filter((m) => m.type === "image").length,
      videos: this.downloadedMedia.filter((m) => m.type === "video").length,
      audio: this.downloadedMedia.filter((m) => m.type === "audio").length,
      documents: this.downloadedMedia.filter((m) => m.type === "document").length,
    };

    console.log(`  - Images: ${mediaByType.images}`);
    console.log(`  - Videos: ${mediaByType.videos}`);
    console.log(`  - Audio: ${mediaByType.audio}`);
    console.log(`  - Documents: ${mediaByType.documents}`);
    console.log(`Failed downloads: ${this.errors.length}`);

    if (this.errors.length > 0) {
      console.log("\nFailed downloads:");
      this.errors.forEach((error) => {
        console.log(`  - ${error.url}: ${error.error}`);
      });
    }
  }
}

// CLI usage
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage: tsx extract-media.ts <htmlFile> [outputDir]");
    console.log("");
    console.log("Extract media files from Wix site HTML files");
    console.log("");
    console.log("Options:");
    console.log("  htmlFile   Path to the HTML file to process");
    console.log("  outputDir  Directory to save extracted media (default: ./extracted-media)");
    process.exit(1);
  }

  const htmlFile = args[0];
  const outputDir = args[1] || "./extracted-media";

  if (!htmlFile.startsWith("crawl")) {
    console.error(`Error: File path must start with "crawl": ${htmlFile}`);
    process.exit(1);
  }

  if (!fs.existsSync(htmlFile)) {
    console.error(`Error: File not found: ${htmlFile}`);
    process.exit(1);
  }

  try {
    const extractor = new WixMediaExtractor(htmlFile, outputDir);
    await extractor.extract();
  } catch (error) {
    console.error("Extraction failed:", error);
    process.exit(1);
  }
}

// Only run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default WixMediaExtractor;
