# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website generator for aviation maintenance websites built with Eleventy (11ty), a simple static site generator. The project generates HTML from Markdown content and Nunjucks templates.

The project is a clone of an existing aviation maintenance website, with the goal of replicating its structure and content while modernizing the codebase.

## Development Commands

- **Crawl the site**: `node crawl.js <domainName>` - Crawls the original site and saves content to the `crawl/` directory
- **Development server**: `npm start` - Starts Eleventy with live reload on file changes
- **Build**: `npx @11ty/eleventy` - Builds the site to the `dist/` directory

## Development Server

While developing interactively with the developer, a hot-reloading local server is already setup and running. This allows for immediate feedback on changes made to the source files.

## Architecture

### Directory Structure

- `crawl/` - Contains crawled content from the original site
- `src/` - Source files
  - `_data/` - Data files used across the site
    - `_data/media.json` - Media file metadata. Consult this file when determining how to use media files in the site.
    - `_data/navigation.json` - Navigation structure.
    - `_data/contact.json` - Contact information
    - `_data/company.json` - Company information
    - ... other data files as needed
  - `_includes/` - Template files
    - `layouts/` - Page layouts (base.html, home.html)
    - `partials/` - Reusable components (header.html)
  - `css/` - Stylesheets
    - `input.css` - Main stylesheet, using Tailwind CSS
  - `images/` - Static assets
  - `js/` - JavaScript files (if any)
  - Markdown and HTML files for content
- `dist/` - Generated output (created by Eleventy)
- `.eleventy.js` - Eleventy configuration
- `plans/` - Directory for planning tasks
- `screenshots/` - Directory for storing screenshots of pages
  - `live/` - Screenshots of the live site
  - `localhost/` - Screenshots of the local site
- `take-screenshot.js` - Script for taking screenshots of pages. Usage: `node take-screenshot.js [url] (--output [filename])`

### Template System

- Uses Nunjucks templating engine for HTML, Markdown, and data files
- Layouts extend base templates using `{% extends %}`
- Partials included with `{% include %}`
- Content files use front matter to specify layout and data

### CSS

- Uses Tailwind CSS for utility-first styling
- Custom styles can be added in `src/css/input.css`

### Build Process

- Eleventy processes Markdown files through specified layouts
- Images are copied through to output via passthrough copy
- Output goes to `dist/` directory

## Crawl directory

A crawl of the original site is performed to gather content and structure. The crawl is stored in the `crawl/` directory. When asked to make any updates to the site, use the crawl as a reference, to see what the source / original site looks like.

## Planning

When planning new work, create a set of plans in the `plans/[task]` directory.

## Media files

Once the site is initialized, media files are stored in the `src/images/` directory. A description of the media files is stored in `src/_data/media.json`. You can reference this information when determining how to use media files in the site.

## Styles

Make a best effort to replicate the styles from the crawled site. Use the `src/css/` directory for your stylesheets.

## Text

When duplicating text from the crawled site, ensure that you maintain the same words and paragraphs. Use the crawled content as a reference to create new Markdown files in the `src/` directory.

Externalize all text into JSON data files in the `src/_data/` directory.

## Taking screenshots

You can take a screenshot of the local site or the live site using the `take-screenshot.js` script. This is useful for visual testing and ensuring the site matches the original design.

Usage:

```bash
node take-screenshot.js [url] (--output [filename])
```

## Technical Architecture

- **Static Site Generator**: Eleventy (11ty)
- **Templating**: Nunjucks
- **Data Management**: JSON files in `src/_data/`
- **Content**: Markdown with front matter
- **Styling**: CSS using Tailwind CSS, with responsive design
- **Images**: Optimized web formats in `src/images/`

## Design Principles

- **Professional**: Clean, trustworthy appearance
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG compliance for aviation industry standards
- **Performance**: Optimized images and minimal JavaScript
- **SEO-Friendly**: Proper heading structure and meta tags
