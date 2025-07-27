# Navigation Data Consolidation Plan

## 1. Consolidate Navigation Data

-   **Objective:** Merge the contents of `about_navigation.json`, `contact_navigation.json`, `services_navigation.json`, and `navigation.json` into a single `src/_data/navigation.json` file.
-   **Data Structure:** The new `navigation.json` will contain a single `primary` array. Each item in the array will have `text` and `url` properties. The `active` property will be removed from the JSON file.

## 2. Update Templates to Use Consolidated Data

-   **Objective:** Modify the Eleventy templates to use the new `navigation.json` data source.
-   **Task:** Identify all templates that currently use the old navigation data files (`about_navigation.json`, `contact_navigation.json`, `services_navigation.json`).
-   **Implementation:** Update the identified templates to reference the new `navigation.json` file.

## 3. Dynamically Set Active State

-   **Objective:** Implement a mechanism to dynamically set the `active` state for the current page in the navigation menu.
-   **Implementation:** Use a filter or a helper function in the Eleventy configuration to compare the current page's URL with the URL of each navigation item. If the URLs match, the `active` state will be set to `true`.

## 4. Remove Redundant Navigation Files

-   **Objective:** Clean up the project by removing the old, redundant navigation files.
-   **Task:** Delete the following files:
    -   `src/_data/about_navigation.json`
    -   `src/_data/contact_navigation.json`
    -   `src/_data/services_navigation.json`

## 5. Verify Changes

-   **Objective:** Ensure that the navigation menu works correctly on all pages after the changes have been implemented.
-   **Task:**
    -   Serve the site locally.
    -   Navigate to each page (Home, About, Services, Contact) and verify that the navigation menu is displayed correctly and that the active state is set correctly for each page.
