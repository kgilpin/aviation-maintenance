# Screenshot Command

Take a screenshot of a page running on localhost:8081.

Usage: `/screenshot [page_path]`

Examples:
- `/screenshot` - Screenshot the home page (/)
- `/screenshot /about` - Screenshot the about page
- `/screenshot /contact` - Screenshot the contact page

## Instructions

You have access to a Puppeteer MCP server that can take screenshots of web pages. When this command is used:

1. Use the `mcp__puppeteer__screenshot` tool to capture a screenshot
2. Set the URL to `http://localhost:8081{page_path}` where page_path defaults to "/" if not provided
3. Use appropriate viewport settings for responsive testing (1920x1080 desktop view)
4. Take a full-page screenshot to capture the entire page content
5. Save the screenshot and display it to the user for review

The screenshot will help with:
- Visual testing of the aviation maintenance website
- Checking responsive design and layout
- Verifying styling and component placement
- Comparing against the original crawled site design

Make sure to handle cases where the localhost server might not be running and provide helpful error messages.