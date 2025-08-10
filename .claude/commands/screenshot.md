# Screenshot Command

Take a screenshot of a page running on localhost:8080 (Vite dev server).

Usage: `/screenshot [page_path]`

Examples:

- `/screenshot` - Screenshot the home page (/)
- `/screenshot /about` - Screenshot the about page
- `/screenshot /contact` - Screenshot the contact page

## Implementation

1. **Run via NPM**: `npm run take-screenshot -- [page_path] [--output <output_file>]`
2. **Read and display** the generated screenshot file
3. **Clean up** old screenshot files if needed

## Script Usage

The universal screenshot script supports any website:

```bash
# Local development (default: localhost:8080)
npm run take-screenshot -- http://localhost:8080/services --output screenshot.png # Port 8080 with output file

# External websites
npm run take-screenshot -- https://example.com/pricing --output screenshot.png        # Any external site
```

## Command Implementation

When `/screenshot [args...]` is used:

1. **Parse arguments** - Extract base URL and path from arguments
2. **Run script** - Execute `npm run take-screenshot -- [args...]`
3. **Capture output** - Show progress and filename
4. **Display image** - Read and show the generated screenshot
5. **Cleanup** - Optionally remove old screenshots

## Benefits

The screenshot functionality helps with:

- **Visual testing** of the website
- **Responsive design** verification
- **Layout checking** and component placement
- **Comparison** against the original crawled site design
- **Documentation** of development progress

## Error Handling

- Handle server not running (ECONNREFUSED)
- Provide clear error messages
- Suggest checking the build using `npm run build`
