# Browser Console Logger

Capture and analyze console messages from web pages using Playwright automation. This command loads a page in a headless browser and returns all console output including logs, warnings, errors, and uncaught exceptions.

## Usage

Run the command `/browser-console <url> [options]` to capture console messages from a specific page.

Examples:

- `/browser-console http://localhost:8080` - Capture console from home page
- `/browser-console http://localhost:8080/contact` - Capture console from contact page  
- `/browser-console https://example.com --timeout 15000` - External site with custom timeout

## Implementation

1. **Run via NPM**: `npm run browser-console <url> [options]`
2. **Parse arguments** - Extract URL and options
3. **Launch browser** - Start headless Chromium instance
4. **Capture messages** - Listen for all console events
5. **Generate report** - Structured output with summary

## Script Options

The browser console script supports various configuration options:

```bash
# Basic usage (default: 10 second timeout, wait for network idle)
npm run browser-console http://localhost:8080

# Custom timeout
npm run browser-console http://localhost:8080/services --timeout 15000

# Faster loading (don't wait for network idle)
npm run browser-console http://localhost:8080/about --no-network-idle

# External websites
npm run browser-console https://example.com --timeout 20000
```

## Command Implementation

When `/browser-console <url> [options]` is used:

1. **Validate URL** - Ensure valid URL format
2. **Parse options** - Extract timeout and network settings
3. **Launch Playwright** - Start headless Chromium browser
4. **Set up listeners** - Capture console, page errors, and request failures
5. **Navigate to page** - Load the target URL
6. **Wait for completion** - Allow time for dynamic content and console messages
7. **Generate report** - Structured summary with message categorization

## Output Format

The command returns comprehensive console analysis:

### Summary Statistics
- Total messages captured
- Error count
- Warning count  
- Log count
- Page load time

### Message Details
Each console message includes:
- **Type**: log, error, warning, info, debug
- **Text**: The actual console message
- **Timestamp**: When the message occurred
- **Location**: File, line, and column (if available)
- **Arguments**: Additional console.log arguments

### Error Categories
- **Console Errors**: JavaScript errors logged to console
- **Uncaught Exceptions**: Unhandled JavaScript errors
- **Request Failures**: Failed network requests
- **Navigation Errors**: Page loading issues

## Benefits

The browser console functionality helps with:

- **JavaScript debugging** - Find runtime errors and warnings
- **Performance monitoring** - Identify console performance messages
- **Network issue detection** - Spot failed requests and resources
- **Development testing** - Validate console output during development
- **Production monitoring** - Check for client-side errors in deployed sites

## Error Handling

- Handle browser launch failures
- Manage page navigation timeouts
- Capture request failures and network errors
- Provide clear error messages for invalid URLs
- Graceful handling of browser crashes

## Advanced Features

- **Message categorization** with visual icons (❌ ⚠️ ℹ️ 📝 🐛)
- **Source location tracking** for debugging
- **Network request monitoring** for failed loads
- **Timeout configuration** for slow-loading pages
- **Network idle detection** for complete page loads
- **Structured JSON output** for programmatic analysis

## Use Cases

1. **Development Testing**: Check for console errors during local development
2. **Build Validation**: Ensure production builds don't generate console errors
3. **Performance Analysis**: Monitor console performance warnings
4. **Regression Testing**: Detect new console errors in deployments
5. **Third-party Integration**: Debug issues with external libraries
6. **SEO Auditing**: Identify JavaScript errors that might affect crawlers