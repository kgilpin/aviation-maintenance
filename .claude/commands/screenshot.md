# Screenshot Command

Take a screenshot of a page running on localhost:8081.

Usage: `/screenshot [page_path]`

Examples:

- `/screenshot` - Screenshot the home page (/)
- `/screenshot /about` - Screenshot the about page
- `/screenshot /contact` - Screenshot the contact page

## Implementation

### Current Approach: Node.js Script

Since MCP tools aren't available in the current Claude session, use the local Playwright script:

1. **Modify the script** (`take-screenshot.js`) to accept a page path parameter
2. **Run via Bash**: `node take-screenshot.js [page_path]`
3. **Read and display** the generated screenshot file
4. **Clean up** old screenshot files if needed

### Future MCP Integration

When MCP server is properly connected:

1. Use the `mcp__puppeteer__screenshot` tool to capture screenshots
2. Set URL to `http://localhost:8081{page_path}` where page_path defaults to "/"
3. Use viewport settings: 1920x1080 desktop view
4. Take full-page screenshots

## Script Usage

The universal screenshot script supports any website:

```bash
# Local development (default: localhost:8081)
node take-screenshot.js                                    # Home page
node take-screenshot.js /about                             # About page
node take-screenshot.js /contact                           # Contact page

# Different local ports
node take-screenshot.js http://localhost:3000              # Port 3000
node take-screenshot.js http://localhost:8081 /services    # Port 8081 with path

# External websites
node take-screenshot.js https://eagleeastaviation.com      # Production site
node take-screenshot.js https://example.com /pricing       # Any external site
```

## Command Implementation

When `/screenshot [args...]` is used:

1. **Parse arguments** - Extract base URL and path from arguments
2. **Run script** - Execute `node take-screenshot.js [args...]`
3. **Capture output** - Show progress and filename
4. **Display image** - Read and show the generated screenshot
5. **Cleanup** - Optionally remove old screenshots

## Benefits

The screenshot functionality helps with:

- **Visual testing** of the aviation maintenance website
- **Responsive design** verification
- **Layout checking** and component placement
- **Comparison** against the original crawled site design
- **Documentation** of development progress

## Error Handling

- Handle server not running (ECONNREFUSED)
- Provide clear error messages
- Suggest starting dev server with `npm start`
