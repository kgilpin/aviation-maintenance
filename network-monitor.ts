#!/usr/bin/env tsx

import { chromium } from 'playwright';

/**
 * Network Request Monitor
 * 
 * Usage: tsx network-monitor.ts <url> [options]
 * 
 * Features:
 * - Monitors all network requests (XHR, fetch, resources)
 * - Tracks failed requests with detailed error information
 * - Categorizes requests by type (images, scripts, stylesheets, etc.)
 * - Reports on slow requests and timeouts
 * - Provides comprehensive network analysis
 */

interface NetworkRequest {
  url: string;
  method: string;
  resourceType: string;
  status?: number;
  statusText?: string;
  failureText?: string;
  timing: {
    startTime: number;
    endTime?: number;
    duration?: number;
  };
  size?: {
    requestBodySize: number;
    responseBodySize: number;
    responseHeadersSize: number;
  };
  redirected: boolean;
  fromCache: boolean;
}

interface NetworkFailure {
  url: string;
  method: string;
  resourceType: string;
  error: string;
  timing: {
    startTime: number;
    duration: number;
  };
}

interface NetworkAnalysis {
  url: string;
  timestamp: string;
  loadTime: number;
  summary: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    cachedRequests: number;
    redirectedRequests: number;
    slowRequests: number;
  };
  requestsByType: Record<string, number>;
  failedRequests: NetworkFailure[];
  slowRequests: NetworkRequest[];
  allRequests: NetworkRequest[];
}

class NetworkMonitor {
  private url: string;
  private timeout: number;
  private slowThreshold: number;
  private requests: NetworkRequest[];
  private failures: NetworkFailure[];
  private startTime: number;

  constructor(url: string, options: { timeout?: number; slowThreshold?: number } = {}) {
    this.url = url;
    this.timeout = options.timeout || 15000;
    this.slowThreshold = options.slowThreshold || 3000; // 3 seconds
    this.requests = [];
    this.failures = [];
    this.startTime = 0;
  }

  async monitor(): Promise<NetworkAnalysis> {
    console.log(`Monitoring network requests for: ${this.url}`);
    this.startTime = Date.now();

    const browser = await chromium.launch({ 
      headless: true,
      args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
    });

    try {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      });

      const page = await context.newPage();

      // Monitor all requests
      page.on('request', (request) => {
        const networkRequest: NetworkRequest = {
          url: request.url(),
          method: request.method(),
          resourceType: request.resourceType(),
          timing: {
            startTime: Date.now()
          },
          redirected: request.redirectedFrom() !== null,
          fromCache: false
        };

        this.requests.push(networkRequest);
      });

      // Monitor successful responses
      page.on('response', (response) => {
        const request = this.requests.find(r => r.url === response.url());
        if (request) {
          request.timing.endTime = Date.now();
          request.timing.duration = request.timing.endTime - request.timing.startTime;
          request.status = response.status();
          request.statusText = response.statusText();
          request.fromCache = response.fromServiceWorker();

          // Get response size if available
          try {
            const headers = response.headers();
            if (headers['content-length']) {
              request.size = {
                requestBodySize: 0,
                responseBodySize: parseInt(headers['content-length']),
                responseHeadersSize: JSON.stringify(headers).length
              };
            }
          } catch (error) {
            // Ignore size calculation errors
          }
        }
      });

      // Monitor failed requests
      page.on('requestfailed', (request) => {
        const failure: NetworkFailure = {
          url: request.url(),
          method: request.method(),
          resourceType: request.resourceType(),
          error: request.failure()?.errorText || 'Unknown error',
          timing: {
            startTime: Date.now(),
            duration: Date.now() - this.startTime
          }
        };

        this.failures.push(failure);

        // Update the request in our tracking
        const trackedRequest = this.requests.find(r => r.url === request.url());
        if (trackedRequest) {
          trackedRequest.failureText = failure.error;
          trackedRequest.timing.endTime = Date.now();
          trackedRequest.timing.duration = trackedRequest.timing.endTime - trackedRequest.timing.startTime;
        }
      });

      // Navigate to the page
      try {
        await page.goto(this.url, { 
          waitUntil: 'networkidle',
          timeout: this.timeout 
        });

        // Wait a bit more for any delayed requests
        await page.waitForTimeout(2000);

      } catch (error) {
        console.warn(`Navigation warning: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      await context.close();
      
    } finally {
      await browser.close();
    }

    const loadTime = Date.now() - this.startTime;
    return this.generateAnalysis(loadTime);
  }

  private generateAnalysis(loadTime: number): NetworkAnalysis {
    const successfulRequests = this.requests.filter(r => !r.failureText && r.status && r.status < 400);
    const failedRequests = this.requests.filter(r => r.failureText || (r.status && r.status >= 400));
    const cachedRequests = this.requests.filter(r => r.fromCache);
    const redirectedRequests = this.requests.filter(r => r.redirected);
    const slowRequests = this.requests.filter(r => r.timing.duration && r.timing.duration > this.slowThreshold);

    // Group requests by resource type
    const requestsByType: Record<string, number> = {};
    this.requests.forEach(request => {
      requestsByType[request.resourceType] = (requestsByType[request.resourceType] || 0) + 1;
    });

    return {
      url: this.url,
      timestamp: new Date().toISOString(),
      loadTime,
      summary: {
        totalRequests: this.requests.length,
        successfulRequests: successfulRequests.length,
        failedRequests: failedRequests.length,
        cachedRequests: cachedRequests.length,
        redirectedRequests: redirectedRequests.length,
        slowRequests: slowRequests.length
      },
      requestsByType,
      failedRequests: this.failures,
      slowRequests,
      allRequests: this.requests
    };
  }

  printResults(analysis: NetworkAnalysis): void {
    console.log('\n=== NETWORK MONITORING RESULTS ===');
    console.log(`URL: ${analysis.url}`);
    console.log(`Total Load Time: ${analysis.loadTime}ms`);
    console.log(`Analysis Time: ${analysis.timestamp}`);
    
    console.log('\n=== REQUEST SUMMARY ===');
    console.log(`Total Requests: ${analysis.summary.totalRequests}`);
    console.log(`✅ Successful: ${analysis.summary.successfulRequests}`);
    console.log(`❌ Failed: ${analysis.summary.failedRequests}`);
    console.log(`💾 Cached: ${analysis.summary.cachedRequests}`);
    console.log(`🔄 Redirected: ${analysis.summary.redirectedRequests}`);
    console.log(`🐌 Slow (>${this.slowThreshold}ms): ${analysis.summary.slowRequests}`);

    console.log('\n=== REQUESTS BY TYPE ===');
    Object.entries(analysis.requestsByType)
      .sort(([,a], [,b]) => b - a)
      .forEach(([type, count]) => {
        console.log(`${type}: ${count}`);
      });

    if (analysis.failedRequests.length > 0) {
      console.log('\n=== FAILED REQUESTS ===');
      analysis.failedRequests.forEach((failure, index) => {
        console.log(`${index + 1}. ❌ [${failure.resourceType.toUpperCase()}] ${failure.method}`);
        console.log(`   URL: ${failure.url}`);
        console.log(`   Error: ${failure.error}`);
        console.log(`   Duration: ${failure.timing.duration}ms`);
        console.log('');
      });
    }

    if (analysis.slowRequests.length > 0) {
      console.log(`=== SLOW REQUESTS (>${this.slowThreshold}ms) ===`);
      analysis.slowRequests
        .sort((a, b) => (b.timing.duration || 0) - (a.timing.duration || 0))
        .slice(0, 10) // Show top 10 slowest
        .forEach((request, index) => {
          const status = request.status ? `${request.status} ${request.statusText}` : 'No response';
          console.log(`${index + 1}. 🐌 [${request.resourceType.toUpperCase()}] ${request.method} - ${request.timing.duration}ms`);
          console.log(`   URL: ${request.url}`);
          console.log(`   Status: ${status}`);
          if (request.size?.responseBodySize) {
            console.log(`   Size: ${(request.size.responseBodySize / 1024).toFixed(1)}KB`);
          }
          console.log('');
        });
    }

    // Media-specific analysis
    const mediaRequests = analysis.allRequests.filter(r => 
      ['image', 'media', 'font'].includes(r.resourceType) ||
      r.url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|mp4|webm|avi|mov|mp3|wav|ogg|woff|woff2|ttf|eot)(\?|$)/i)
    );
    
    const failedMedia = mediaRequests.filter(r => r.failureText || (r.status && r.status >= 400));
    
    if (failedMedia.length > 0) {
      console.log('=== FAILED MEDIA REQUESTS ===');
      failedMedia.forEach((request, index) => {
        const error = request.failureText || `HTTP ${request.status} ${request.statusText}`;
        console.log(`${index + 1}. 🖼️ [${request.resourceType.toUpperCase()}] ${request.method}`);
        console.log(`   URL: ${request.url}`);
        console.log(`   Error: ${error}`);
        console.log('');
      });
    }

    if (analysis.failedRequests.length === 0 && analysis.slowRequests.length === 0) {
      console.log('\n🎉 All requests completed successfully with good performance!');
    }

    console.log('\n=== END ANALYSIS ===\n');
  }
}

// CLI usage
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: tsx network-monitor.ts <url> [--timeout <ms>] [--slow-threshold <ms>]');
    console.log('');
    console.log('Monitor network requests and identify failures for a web page');
    console.log('');
    console.log('Options:');
    console.log('  url                    URL to monitor network requests for');
    console.log('  --timeout <ms>         Page load timeout in milliseconds (default: 15000)');
    console.log('  --slow-threshold <ms>  Consider requests slow above this threshold (default: 3000)');
    console.log('');
    console.log('Examples:');
    console.log('  tsx network-monitor.ts http://localhost:8080');
    console.log('  tsx network-monitor.ts http://localhost:8080/contact --timeout 20000');
    console.log('  tsx network-monitor.ts https://example.com --slow-threshold 2000');
    process.exit(1);
  }

  const url = args[0];
  let timeout = 15000;
  let slowThreshold = 3000;

  // Parse options
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--timeout' && i + 1 < args.length) {
      timeout = parseInt(args[i + 1], 10);
      if (isNaN(timeout)) {
        console.error('Error: --timeout must be a number');
        process.exit(1);
      }
      i++; // Skip the next argument
    } else if (args[i] === '--slow-threshold' && i + 1 < args.length) {
      slowThreshold = parseInt(args[i + 1], 10);
      if (isNaN(slowThreshold)) {
        console.error('Error: --slow-threshold must be a number');
        process.exit(1);
      }
      i++; // Skip the next argument
    }
  }

  // Validate URL
  try {
    new URL(url);
  } catch {
    console.error(`Error: Invalid URL: ${url}`);
    process.exit(1);
  }

  try {
    const monitor = new NetworkMonitor(url, { timeout, slowThreshold });
    const analysis = await monitor.monitor();
    monitor.printResults(analysis);
  } catch (error) {
    console.error('Network monitoring failed:', error);
    process.exit(1);
  }
}

// Only run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default NetworkMonitor;