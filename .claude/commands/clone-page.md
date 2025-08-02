# Cloning a page

Create a step-by-step plan to clone a page from the crawled content into the site structure.

## Resources to use

Analyze the crawl in order to create this plan.

## Saving the plan

Save the plan in plans/[page-name].

## Extract data files from the plan.

Analyze the plan to determine if any additional data files should be refactored out of the pages and into the `_data` directory instead. Good candidates for data file refactoring include any content that is repeated across multiple pages, or content items that are uniform in structure and are displayed in a list.

Use existing data files in the `_data` directory when they already exist and match the purpose of the page.

## Implementing the plan

Once the plan is created, implement it by creating a new Markdown file in the `src/pages/` directory.

## Checking the page URL

Verify that the page URL matches the page URL in the crawl.

If necessary, move the Markdown file to the correct location within the `src` tree to match the URL.

## Comparing the page to the live site

Take a screenshot of the page using the `/screenshot` command to compare it against the live site.

Also, take a screenshot of the live site using the `/screenshot` command with the live site URL.

Create a TODO list of items to address based on the comparison, in order to make the site match the live site.

You have to use either a screenshot of the live site or the local site, or the crawl. Don't fetch the live site, because the fetch is already available in the crawl.

## Fix the site by addressing the TODO items

Iterate through TODO items, updating the site as needed to match the live site.
