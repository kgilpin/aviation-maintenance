const { chromium } = require('playwright');

async function takeScreenshot() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport for desktop view
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  try {
    // Parse command line arguments
    const args = process.argv.slice(2);
    let baseUrl = 'http://localhost:8081';
    let pagePath = '';
    
    // Check for help
    if (args.includes('--help') || args.includes('-h')) {
      showHelp();
      return;
    }
    
    // Parse arguments: base-url [path]
    if (args.length >= 1) {
      if (args[0].startsWith('http://') || args[0].startsWith('https://')) {
        baseUrl = args[0];
        pagePath = args[1] || '';
      } else {
        // First arg is path, use default base URL
        pagePath = args[0];
      }
    }
    
    // Ensure path starts with / if provided
    if (pagePath && !pagePath.startsWith('/')) {
      pagePath = '/' + pagePath;
    }
    
    const url = baseUrl + pagePath;
    const pageDescription = pagePath || 'home page';
    
    console.log(`📸 Taking screenshot of ${pageDescription}...`);
    console.log(`🌐 Navigating to ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Generate descriptive filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const domain = new URL(baseUrl).hostname.replace(/\./g, '-');
    const pathPart = pagePath ? pagePath.replace(/\//g, '-') : 'home';
    const filename = `screenshot-${domain}${pathPart}-${timestamp}.png`;
    
    await page.screenshot({ 
      path: filename, 
      fullPage: true 
    });
    
    console.log(`✅ Screenshot saved as: ${filename}`);
    
    // Get file size for user info
    const fs = require('fs');
    const stats = fs.statSync(filename);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📁 File size: ${fileSizeInMB} MB`);
    
  } catch (error) {
    console.error('❌ Error taking screenshot:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Connection refused - is the server running?');
      console.log('   For local development: npm start');
    } else if (error.message.includes('net::ERR_ABORTED') || error.message.includes('404')) {
      console.log('\n💡 Page not found - check if the URL/path is correct');
    } else if (error.message.includes('timeout')) {
      console.log('\n💡 Page load timeout - the site might be slow or unreachable');
    }
  } finally {
    await browser.close();
  }
}

function showHelp() {
  console.log(`
📸 Universal Screenshot Tool

Usage: 
  node take-screenshot.js [base-url] [path]
  node take-screenshot.js [path]             # Uses localhost:8081 as base

Arguments:
  base-url    Full base URL (http://localhost:8081, https://example.com, etc.)
  path        Page path (/about, /contact, etc.)

Examples:
  node take-screenshot.js                                    # localhost:8081 home
  node take-screenshot.js /about                             # localhost:8081/about
  node take-screenshot.js http://localhost:3000              # Different local port
  node take-screenshot.js https://example.com /pricing       # External site
  node take-screenshot.js https://eagleeastaviation.com      # Production site

Screenshot files are saved as: screenshot-[domain]-[path]-[timestamp].png
`);
}

takeScreenshot();