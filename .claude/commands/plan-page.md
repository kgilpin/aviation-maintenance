# Cloning a page

Create a step-by-step plan to clone a page from the crawled content into the site structure.

## Capture the current date + time

Run the system command `date -Iseconds` to obtain the current date and time. This will be used to timestamp the plan.

## Resources to use

Analyze the crawl in order to create this plan.

Inspect the available components, data files, and templates in the project to determine how to structure the new page. These can be found in the `src/` directory, including:

- Data files in `src/_data/`
- Template files in `src/_includes/`
- Layout files in `src/_layouts/`

## Use of reusable components

Page cloning should leverage reusable components and templates defined in the `_includes/` directory. This ensures consistency across pages and reduces duplication of code.

Some examples of reusable components include:

- Header and footer templates
- Navigation menus
- Common sections like contact information or company details

Ensure that these components are created when cloning a page, and that they are used in the Markdown file for the page.

Ensure that components are reused throughout the site to maintain consistency.

## Component styling

Components should be styled using Tailwind CSS.

## Saving the plan

Save the plan in the directory `plans/[page-name]/[timestamp]`. The plan should consist of multiple files that are sequenced in a way that allows the developer to follow the steps to clone the page.

Each component should be described in its own file, with a clear description of what it does and how it should be used. When an existing component is being reused, it does not need its own file, but should be referenced in the plan.

The plan should also include any necessary data files that need to be created or updated.

Create a file `overview.md` in the plan directory that describes the overall plan for cloning the page.

## Extract data files from the plan.

Analyze the plan to determine if any additional data files should be refactored out of the pages and into the `_data` directory instead. Good candidates for data file refactoring include any content that is repeated across multiple pages, or content items that are uniform in structure and are displayed in a list.

Use existing data files in the `_data` directory when they already exist and match the purpose of the page.
