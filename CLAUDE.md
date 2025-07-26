# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website generator for aviation maintenance websites built with Eleventy (11ty), a simple static site generator. The project generates HTML from Markdown content and Nunjucks templates.

## Development Commands

- **Development server**: `npm start` - Starts Eleventy with live reload on file changes
- **Build**: `npx @11ty/eleventy` - Builds the site to the `dist/` directory

## Architecture

### Directory Structure

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

### Current Implementation

- Basic homepage with logo branding
- Header partial with logo
- Responsive base layout structure
- Content managed through Markdown with front matter
