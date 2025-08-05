# Refining a page

Create a step-by-step plan to refine a cloned page to more closely match the live site.

## Usage

Run the command `/refine-page [page-name]` to start the refinement process for a specific page.

## Capture the current date + time

Run the system command `date -Iseconds` to obtain the current date and time. This will be used to timestamp the plan.

## Take screenshots of the local and live sites

Take a screenshot of the local page using `npm run take-screenshot -- http://localhost:8080/$ARGUMENTS --output screenshots/localhost/[page-name]-[timestamp].png`.

Then take a screenshot of the live site using `npm run take-screenshot -- [live-site-url]/$ARGUMENTS --output screenshots/live/[page-name]-[timestamp].png`.

## Compare the local and live sites

Compare the screenshots to identify differences between the local implementation and the live site. Also, inspect the relevant page(s) from the crawl to look for dynamic elements that may not be captured in screenshots, such as animations, hover effects, or responsive design changes.

## Faithful replication of text and other content

When cloning a page, ensure that all text content is faithfully replicated from the crawled content. Minor adjustments may be made for formatting or structure in order to fit into the site architecture or best practices of the technology components in use, but the core content should remain unchanged.

## Build a TODO list

Create a TODO list of items to address based on the comparison, in order to make the site match the live site. Each fixup item should contain a priority: high, medium, or low.

Save the plan to `plans/[page-name]-fixup/[timestamp]`.

## Fix the site by addressing the TODO items

Iterate through TODO items, updating the site as needed to match the live site.

## Iterate on site fixes

Repeat the fixup process until the site matches the live site. The site is considered matching when only low priority items remain.
