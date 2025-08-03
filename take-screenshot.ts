import { chromium, Browser, Page } from "playwright";
import { promises as fs } from "fs";
import { dirname } from "path";

interface ScreenshotOptions {
  url: string;
  outputPath?: string;
}

async function takeScreenshot(): Promise<void> {
  const browser: Browser = await chromium.launch({
    args: [
      "--disable-web-security",
      "--disable-features=VizDisplayCompositor",
      "--disable-blink-features=AutomationControlled",
      "--no-first-run",
      "--disable-dev-shm-usage",
    ],
  });
  const page: Page = await browser.newPage();

  // Set viewport for desktop view
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Set user agent to mimic regular browser
  await page.setExtraHTTPHeaders({
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  try {
    // Parse command line arguments
    const args = process.argv.slice(2);
    let url = "http://localhost:5173";
    let outputPath: string | null = null;

    // Check for help
    if (args.includes("--help") || args.includes("-h")) {
      showHelp();
      return;
    }

    // Parse --output flag
    const outputIndex = args.indexOf("--output");
    if (outputIndex !== -1 && outputIndex + 1 < args.length) {
      outputPath = args[outputIndex + 1];
      // Remove --output and its value from args
      args.splice(outputIndex, 2);
    }

    // First remaining argument should be the URL
    if (args.length >= 1) {
      url = args[0];
    }

    // Ensure URL is valid
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      // Assume localhost if no protocol provided
      url = "http://localhost:5173" + (url.startsWith("/") ? url : "/" + url);
    }

    console.log(`📸 Taking screenshot of ${url}`);

    // Try multiple strategies for loading the page
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 5000 });
    } catch (error) {
      console.log("⚠️  Network idle timeout, trying with domcontentloaded...");
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 5000 });
      } catch (error2) {
        console.log("⚠️  DOM content loaded timeout, trying with load event...");
        await page.goto(url, { waitUntil: "load", timeout: 45000 });
      }
    }

    // Wait for page to be fully rendered with fallbacks
    try {
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 5000 });
    } catch (error) {
      console.log("⚠️  Network idle not achieved, continuing with current state...");
    }

    // Wait for main content elements to appear
    try {
      await page.waitForSelector('main, .main, [role="main"], .page-width', { timeout: 5000 });
    } catch (e) {
      console.log("⚠️  Main content selector not found, continuing...");
    }

    // Additional wait for any dynamic content, animations, and loading
    await page.waitForTimeout(5000);

    // Progressive scrolling to trigger all lazy loading like a user would
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = 1080;
    const scrollSteps = Math.ceil(scrollHeight / viewportHeight);

    console.log(`📜 Scrolling through page in ${scrollSteps} steps to load all content...`);

    for (let i = 0; i <= scrollSteps; i++) {
      const scrollY = i * viewportHeight;
      await page.evaluate((y: number) => {
        window.scrollTo(0, y);
      }, scrollY);
      await page.waitForTimeout(800); // Wait for content to load at each scroll position
    }

    // Scroll back to top for the final screenshot
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);

    // Try to wait for any lazy-loaded images
    try {
      await page.waitForFunction(
        () => {
          const images = document.querySelectorAll("img");
          return Array.from(images).every((img) => img.complete);
        },
        { timeout: 5000 }
      );
    } catch (e) {
      console.log("⚠️  Some images may not be fully loaded");
    }

    // Final wait to ensure everything is rendered
    await page.waitForTimeout(2000);

    // Generate filename - use custom output path or generate descriptive filename
    let filename: string;
    if (outputPath) {
      // Ensure directory exists
      const dir = dirname(outputPath);
      try {
        await fs.access(dir);
      } catch {
        await fs.mkdir(dir, { recursive: true });
      }
      filename = outputPath;
    } else {
      // Generate descriptive filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace(/\./g, "-");
      const pathPart = urlObj.pathname === "/" ? "home" : urlObj.pathname.replace(/\//g, "-");
      filename = `screenshot-${domain}${pathPart}-${timestamp}.png`;
    }

    await page.screenshot({
      path: filename,
      fullPage: true,
    });

    console.log(`✅ Screenshot saved as: ${filename}`);

    // Get file size for user info
    const stats = await fs.stat(filename);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📁 File size: ${fileSizeInMB} MB`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Error taking screenshot:", errorMessage);

    if (errorMessage.includes("ECONNREFUSED")) {
      console.log("\n💡 Connection refused - is the server running?");
      console.log("   For local development: npm run dev");
    } else if (errorMessage.includes("net::ERR_ABORTED") || errorMessage.includes("404")) {
      console.log("\n💡 Page not found - check if the URL/path is correct");
    } else if (errorMessage.includes("timeout")) {
      console.log("\n💡 Page load timeout - the site might be slow or unreachable");
    }
  } finally {
    await browser.close();
  }
}

function showHelp(): void {
  console.log(`
📸 Universal Screenshot Tool

Usage: 
  tsx take-screenshot.ts [url] [--output filename]

Arguments:
  url         Full URL to screenshot (defaults to http://localhost:5173 if not provided)
              Can be a full URL or just a path (will use localhost:5173 as base)
  --output    Custom output filename/path (optional)

Examples:
  tsx take-screenshot.ts                                                    # localhost:5173 home
  tsx take-screenshot.ts /about                                             # localhost:5173/about
  tsx take-screenshot.ts /about --output screenshots/about.png              # Custom filename
  tsx take-screenshot.ts http://localhost:3000/contact                      # Different local port
  tsx take-screenshot.ts https://example.com/pages/services                 # External site
  tsx take-screenshot.ts https://example.com --output live.png              # Production site

Without --output: screenshot-[domain]-[path]-[timestamp].png
With --output: Uses your specified filename/path
`);
}

takeScreenshot().catch(console.error);
