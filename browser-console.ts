#!/usr/bin/env tsx

import { chromium } from 'playwright';

/**
 * Browser Console Logger
 * 
 * Usage: tsx browser-console.ts <url> [options]
 * 
 * Features:
 * - Captures all console messages (log, warn, error, debug, info)
 * - Supports timeout configuration
 * - Waits for page load completion
 * - Returns structured console output
 * - Handles network errors and timeouts
 */

interface ConsoleMessage {
  type: string;
  text: string;
  timestamp: string;
  location?: string;
  args?: string[];
}

interface ConsoleResult {
  url: string;
  timestamp: string;
  loadTime: number;
  messages: ConsoleMessage[];
  errors: string[];
  summary: {
    totalMessages: number;
    errorCount: number;
    warningCount: number;
    logCount: number;
  };
}

class BrowserConsoleLogger {
  private url: string;
  private timeout: number;
  private waitForNetworkIdle: boolean;
  private messages: ConsoleMessage[];
  private errors: string[];
  private startTime: number;

  constructor(url: string, options: { timeout?: number; waitForNetworkIdle?: boolean } = {}) {
    this.url = url;
    this.timeout = options.timeout || 10000;
    this.waitForNetworkIdle = options.waitForNetworkIdle !== false;
    this.messages = [];
    this.errors = [];
    this.startTime = 0;
  }

  async capture(): Promise<ConsoleResult> {
    console.log(`Capturing console messages from: ${this.url}`);
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

      // Set up console message capturing
      page.on('console', (msg) => {
        const message: ConsoleMessage = {
          type: msg.type(),
          text: msg.text(),
          timestamp: new Date().toISOString(),
          location: msg.location() ? `${msg.location().url}:${msg.location().lineNumber}:${msg.location().columnNumber}` : undefined,
          args: msg.args().map(arg => arg.toString())
        };
        this.messages.push(message);
      });

      // Capture page errors
      page.on('pageerror', (error) => {
        this.errors.push(`Page Error: ${error.message}`);
        this.messages.push({
          type: 'error',
          text: `Uncaught Exception: ${error.message}`,
          timestamp: new Date().toISOString()
        });
      });

      // Capture request failures
      page.on('requestfailed', (request) => {
        const failureText = request.failure()?.errorText || 'Unknown error';
        this.errors.push(`Request Failed: ${request.url()} - ${failureText}`);
        this.messages.push({
          type: 'error',
          text: `Failed to load: ${request.url()} (${failureText})`,
          timestamp: new Date().toISOString()
        });
      });

      // Navigate to the page
      try {
        await page.goto(this.url, { 
          waitUntil: this.waitForNetworkIdle ? 'networkidle' : 'domcontentloaded',
          timeout: this.timeout 
        });

        // Wait a bit more for dynamic content and console messages
        await page.waitForTimeout(2000);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown navigation error';
        this.errors.push(`Navigation Error: ${errorMessage}`);
        this.messages.push({
          type: 'error',
          text: `Navigation failed: ${errorMessage}`,
          timestamp: new Date().toISOString()
        });
      }

      await context.close();
      
    } finally {
      await browser.close();
    }

    const loadTime = Date.now() - this.startTime;
    return this.generateResult(loadTime);
  }

  private generateResult(loadTime: number): ConsoleResult {
    const summary = {
      totalMessages: this.messages.length,
      errorCount: this.messages.filter(m => m.type === 'error').length,
      warningCount: this.messages.filter(m => m.type === 'warning' || m.type === 'warn').length,
      logCount: this.messages.filter(m => m.type === 'log').length
    };

    return {
      url: this.url,
      timestamp: new Date().toISOString(),
      loadTime,
      messages: this.messages,
      errors: this.errors,
      summary
    };
  }

  printResults(result: ConsoleResult): void {
    console.log('\n=== BROWSER CONSOLE CAPTURE RESULTS ===');
    console.log(`URL: ${result.url}`);
    console.log(`Load Time: ${result.loadTime}ms`);
    console.log(`Capture Time: ${result.timestamp}`);
    console.log('\n=== SUMMARY ===');
    console.log(`Total Messages: ${result.summary.totalMessages}`);
    console.log(`Errors: ${result.summary.errorCount}`);
    console.log(`Warnings: ${result.summary.warningCount}`);
    console.log(`Logs: ${result.summary.logCount}`);

    if (result.errors.length > 0) {
      console.log('\n=== NAVIGATION/REQUEST ERRORS ===');
      result.errors.forEach(error => {
        console.log(`❌ ${error}`);
      });
    }

    if (result.messages.length > 0) {
      console.log('\n=== CONSOLE MESSAGES ===');
      result.messages.forEach((message, index) => {
        const icon = this.getMessageIcon(message.type);
        const location = message.location ? ` (${message.location})` : '';
        console.log(`${index + 1}. ${icon} [${message.type.toUpperCase()}] ${message.text}${location}`);
        
        if (message.args && message.args.length > 1) {
          console.log(`   Args: ${message.args.slice(1).join(', ')}`);
        }
      });
    } else {
      console.log('\n📝 No console messages captured');
    }

    console.log('\n=== END RESULTS ===\n');
  }

  private getMessageIcon(type: string): string {
    switch (type) {
      case 'error': return '❌';
      case 'warning':
      case 'warn': return '⚠️';
      case 'info': return 'ℹ️';
      case 'debug': return '🐛';
      case 'log':
      default: return '📝';
    }
  }
}

// CLI usage
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: tsx browser-console.ts <url> [--timeout <ms>] [--no-network-idle]');
    console.log('');
    console.log('Capture console messages from a web page using Playwright');
    console.log('');
    console.log('Options:');
    console.log('  url                    URL to load and capture console from');
    console.log('  --timeout <ms>         Page load timeout in milliseconds (default: 10000)');
    console.log('  --no-network-idle      Don\'t wait for network idle, load faster');
    console.log('');
    console.log('Examples:');
    console.log('  tsx browser-console.ts http://localhost:8080');
    console.log('  tsx browser-console.ts http://localhost:8080/contact --timeout 15000');
    console.log('  tsx browser-console.ts https://example.com --no-network-idle');
    process.exit(1);
  }

  const url = args[0];
  let timeout = 10000;
  let waitForNetworkIdle = true;

  // Parse options
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--timeout' && i + 1 < args.length) {
      timeout = parseInt(args[i + 1], 10);
      if (isNaN(timeout)) {
        console.error('Error: --timeout must be a number');
        process.exit(1);
      }
      i++; // Skip the next argument as it's the timeout value
    } else if (args[i] === '--no-network-idle') {
      waitForNetworkIdle = false;
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
    const logger = new BrowserConsoleLogger(url, { timeout, waitForNetworkIdle });
    const result = await logger.capture();
    logger.printResults(result);
  } catch (error) {
    console.error('Console capture failed:', error);
    process.exit(1);
  }
}

// Only run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default BrowserConsoleLogger;