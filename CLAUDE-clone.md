# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website generator for aviation maintenance websites built with Eleventy (11ty), a simple static site generator. The project generates HTML from Markdown content and Nunjucks templates.

The project is a clone of an existing aviation maintenance website, with the goal of replicating its structure and content while modernizing the codebase.

## Development Commands

- **Crawl the site**: `node crawl.js <domainName>` - Crawls the original site and saves content to the `crawl/` directory
- **Development server**: `npm start` - Starts Eleventy with live reload on file changes
- **Build**: `npx @11ty/eleventy` - Builds the site to the `dist/` directory

## Architecture

### Directory Structure

- `crawl/` - Contains crawled content from the original site
- `src/` - Source files
  - `_includes/` - Template files
    - `layouts/` - Page layouts (base.html, home.html)
    - `partials/` - Reusable components (header.html)
  - `css/` - Stylesheets
  - `images/` - Static assets (logo.png)
  - `index.md` - Homepage content
- `dist/` - Generated output (created by Eleventy)
- `.eleventy.js` - Eleventy configuration

### Template System

- Uses Nunjucks templating engine for HTML, Markdown, and data files
- Layouts extend base templates using `{% extends %}`
- Partials included with `{% include %}`
- Content files use front matter to specify layout and data

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

# Site Purpose

Create a professional aviation maintenance website while using modern static site architecture.

## Target Audience

- Aircraft owners needing maintenance services
- Aviation professionals seeking FAA-certified maintenance
- Customers looking for reliable, experienced aviation services

## Key Messaging Themes

1. **Experience & Credibility** - 44+ years in business, FAA-designated representative
2. **Regulatory Compliance** - Focus on FAA certifications and proper documentation
3. **Location Advantage** - Plymouth, MA location between Boston and Cape Cod
4. **Customer Relationships** - Long-term customer testimonials highlighting trust and reliability
5. **Aircraft Maintenance Services** - Emphasizing comprehensive, professional maintenance

## Section Implementation Order

1. **Hero Section** - Primary brand messaging and CTA
2. **Navigation Cards** - Visual site navigation
3. **Company Overview** - Credibility and positioning
4. **About Us** - Background and location advantages
5. **Services Detail** - Specific FAA services offered
6. **Testimonials** - Customer validation and social proof
7. **Footer Contact** - Contact information and location map

## Technical Architecture

- **Static Site Generator**: Eleventy (11ty)
- **Templating**: Nunjucks
- **Data Management**: JSON files in `src/_data/`
- **Content**: Markdown with front matter
- **Styling**: CSS with responsive design
- **Images**: Optimized web formats in `src/images/`

## Data Structure Requirements

- Contact information centralized in `contact.json`
- Company information in `company.json`
- Services data in `services.json`
- Testimonials in `testimonials.json`
- Navigation structure in `navigation.json`

## Design Principles

- **Professional**: Clean, trustworthy appearance
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG compliance for aviation industry standards
- **Performance**: Optimized images and minimal JavaScript
- **SEO-Friendly**: Proper heading structure and meta tags
