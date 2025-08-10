# Network Request Monitor

Monitor and analyze all network requests made by a web page, with special focus on identifying failed requests, slow loading resources, and media file issues. This command uses Playwright to load a page and track all network activity.

## Usage

Run the command `/network-monitor <url> [options]` to analyze network requests for a specific page.

Examples:

- `/network-monitor http://localhost:8080` - Monitor home page network requests
- `/network-monitor http://localhost:8080/contact` - Monitor contact page requests
- `/network-monitor https://example.com --timeout 20000` - External site with custom timeout
- `/network-monitor http://localhost:8080 --slow-threshold 2000` - Flag requests slower than 2 seconds

## Implementation

1. **Run via NPM**: `npm run network-monitor <url> [options]`
2. **Launch browser** - Start headless Chromium instance
3. **Monitor requests** - Track all network activity (requests, responses, failures)
4. **Analyze performance** - Categorize by type, speed, and success rate
5. **Generate report** - Detailed breakdown with failure analysis

## Script Options

The network monitor supports various configuration options:

```bash
# Basic monitoring (default: 15s timeout, 3s slow threshold)
npm run network-monitor -- http://localhost:8080

# Custom timeout for slow-loading pages
npm run network-monitor -- http://localhost:8080/gallery --timeout 30000

# Custom slow request threshold
npm run network-monitor -- http://localhost:8080 --slow-threshold 1500

# Combined options
npm run network-monitor -- https://example.com --timeout 20000 --slow-threshold 2000
```

## Command Implementation

When `/network-monitor <url> [options]` is used:

1. **Validate URL** - Ensure valid URL format
2. **Parse options** - Extract timeout and performance thresholds
3. **Launch Playwright** - Start headless browser with network monitoring
4. **Track all requests** - Monitor XHR, fetch, resources, media files
5. **Record timing** - Measure request duration and response times
6. **Capture failures** - Log failed requests with detailed error information
7. **Generate analysis** - Comprehensive network performance report

## Output Analysis

The command provides detailed network analysis including:

### Request Summary

- **Total requests** made by the page
- **Successful requests** (2xx status codes)
- **Failed requests** (4xx/5xx status codes or network errors)
- **Cached requests** served from browser cache
- **Redirected requests** that were redirected
- **Slow requests** exceeding the threshold

### Request Categorization

Requests grouped by resource type:

- **document** - HTML pages
- **stylesheet** - CSS files
- **script** - JavaScript files
- **image** - Image files (jpg, png, svg, etc.)
- **font** - Web fonts
- **media** - Audio/video files
- **xhr** - XMLHttpRequest calls
- **fetch** - Fetch API calls
- **other** - Other resource types

### Failed Request Details

For each failed request:

- **Resource type** and HTTP method
- **Full URL** that failed to load
- **Error message** (timeout, DNS failure, 404, etc.)
- **Request duration** before failure

### Slow Request Analysis

For requests exceeding the slow threshold:

- **Resource type** and loading time
- **Response status** and size information
- **URL** of the slow resource
- **Performance impact** on page load

### Media-Specific Analysis

Special focus on media file failures:

- **Failed images** that couldn't load
- **Missing videos** or audio files
- **Broken media URLs** with specific error details
- **Font loading issues**

## Benefits

The network monitoring functionality helps with:

- **Broken link detection** - Find 404 errors and missing resources
- **Media file validation** - Ensure all images, videos, fonts load correctly
- **Performance optimization** - Identify slow-loading resources
- **API endpoint testing** - Monitor XHR/fetch request failures
- **CDN issue detection** - Spot external resource problems
- **Cache effectiveness** - Analyze cache hit rates
- **Development debugging** - Find network issues during development

## Use Cases

1. **Media File Auditing**: Verify all images, videos, and assets load correctly
2. **Performance Testing**: Identify bottlenecks and slow resources
3. **API Integration Testing**: Monitor AJAX requests and API failures
4. **Deployment Validation**: Ensure all resources are accessible after deployment
5. **CDN Monitoring**: Check external resource availability
6. **SEO Optimization**: Ensure critical resources load quickly
7. **User Experience**: Prevent broken media from affecting site quality

## Error Categories

The monitor detects various types of network failures:

- **HTTP Errors**: 400, 404, 500 status codes
- **Network Errors**: DNS failures, connection timeouts
- **CORS Errors**: Cross-origin request blocking
- **SSL/TLS Errors**: Certificate problems
- **Content Errors**: Malformed responses
- **Timeout Errors**: Requests exceeding time limits

## Performance Thresholds

Configurable performance monitoring:

- **Slow Threshold**: Flag requests slower than specified time (default: 3000ms)
- **Timeout**: Maximum time to wait for page load (default: 15000ms)
- **Network Idle**: Wait for all requests to complete before analysis

This comprehensive network monitoring helps ensure all page resources load correctly and perform well, which is especially important for media-rich sites with images, videos, and external dependencies.
