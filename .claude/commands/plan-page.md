# Cloning a page

Create architectural-level plan to clone a page from the crawled content into the site structure.

The purpose of this plan is site architecture, components, and strategy.

DO NOT emit code details int he plan. The plan will be an input to a subsquent step, "/create-page", that will fill in the details.

## Capture the current date + time

Run the system command `date -Iseconds` to obtain the current date and time. This will be used to timestamp the plan.

## Resources to use

Analyze the crawl in order to create this plan.

Inspect the available components, data files, and hooks in the project to determine how to structure the new page. These can be found in the `src/` directory, including:

- Data files in `src/data/`
- Component files in `src/components/`
- Custom hooks in `src/hooks/`
- Page components in `src/pages/`
- Media in `src/assets/` and catalogued in `src/data/media.json`

## Do not output specific code, data or text

The plan should be kept at a high level.

Describe the work to be done at an architecture level, and provide pointers to specific files, lines, and snippets in the crawl from which the final data and text can be obtained.

## Use of reusable components

Page cloning should leverage reusable components defined in the `src/components/` directory. This ensures consistency across pages and reduces duplication of code.

Some examples of reusable components include:

- Layout components (Header, Footer, Navigation)
- UI components (Button, cards, forms)
- Section components (Hero, content sections)
- Custom hooks for data access

Ensure that these components are created when cloning a page, and that they are used in the React page component.

Ensure that components are reused throughout the site to maintain consistency.

## Saving the plan

Save the plan in the file `plans/[timestamp]-[page-name]`. The steps of the plan should be sequenced in a way that allows the developer to follow the steps to clone the page.

Each component should include a clear description of what it does and how it should be used. When an existing component is being reused, it does not need its own specification, but should be referenced in the plan.

The plan should also include a description of data files that need to be created or updated.

## Use of data files

Use existing data files in the `src/data/` directory when they already exist and match the purpose of the page. Create corresponding TypeScript interfaces in `src/data/types.ts` and custom hooks in `src/hooks/` for type-safe data access.
