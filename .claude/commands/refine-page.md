# Refining a page

Create a step-by-step plan to refine a cloned page to more closely match the live site.

## Usage

Run the command `/refine-page [page-name]` to start the refinement process for a specific page.

## Capture the current date + time

Run the system command `date -Iseconds` to obtain the current date and time. This will be used to timestamp the plan.

## Comparing the page to the live site

Take a screenshot of the local page using `node take-screenshot.js http://localhost:80801/$ARGUMENTS --output screenshots/localhost/[page-name]-[timestamp].png`.

Also, take a screenshot of the live site using `node take-screenshot.js [live-site-url]/$ARGUMENTS --output screenshots/live/[page-name][timestamp].png`. Do NOT use the crawl for this! It's essential to use a screenshot of the live site to ensure that the cloned page matches the current design and content. Store the screenshot in the `screenshots/live` directory with a descriptive filename based on the page path.

Create a TODO list of items to address based on the comparison, in order to make the site match the live site. Each fixup item should contain a priority: high, medium, or low.

Run the system command `date -Iseconds` to obtain the current date and time. This will be used to timestamp the plan.

Save the plan to `plans/[page-name]-fixup/[timestamp]`.

## Fix the site by addressing the TODO items

Iterate through TODO items, updating the site as needed to match the live site.

## Iterate on site fixes

Repeat the fixup process until the site matches the live site. The site is considered matching when only low priority items remain.
