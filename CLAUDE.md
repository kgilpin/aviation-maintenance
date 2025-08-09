# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern React + Vite application built with TypeScript, designed as a responsive website with component-based architecture. The project emphasizes type safety, performance, and maintainable code structure.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite dev server with hot module replacement
- **Build**: `npm run build` - Builds optimized production version
- **Preview**: `npm run preview` - Preview production build locally
- **Crawl website**: `npm run crawl <domain>` - Crawl a website for content and assets using TypeScript crawler
- **Screenshot utility**: `npm run screenshot -- <page_url> [--output <output_file>]` - Capture screenshots of pages
- **Extract media**: `npm run extract-media -- <html_file> [output_dir]` - Extract all media files from HTML pages
- **Browser console**: `npm run browser-console -- <url> [--timeout <ms>] [--no-network-idle]` - Capture console messages from web pages
- **Network monitor**: `npm run network-monitor -- <url> [--timeout <ms>] [--slow-threshold <ms>]` - Monitor network requests and identify failures

Notes on screenshots:

- Always use `npm run screenshot -- <page_url> [--output <output_file>]` instead of running the script directly.
- By convention, save screenshots in the `screenshots/` directory, organized by `live/` for reference sites and `localhost/` for local development.

Notes on network monitoring:

- The network monitor is essential for detecting missing media files, broken API endpoints, and performance issues
- Use `npm run network-monitor -- <url>` to identify failed requests for images, videos, fonts, and other resources
- Configure `--slow-threshold` to flag requests that may impact user experience (default: 3000ms)
- Particularly useful for validating that all extracted media files load correctly after deployment

## Development Server

The React development server runs with hot module replacement for instant updates:

**URL**: `http://localhost:8080/`

Do not try and run your own development server; just use the server that's already running on port 8080.

## Debugging site errors

Use `npm run build` to debug site errors, such as import errors or problems with types.

### Debugging workflow

1. **Build errors**: `npm run build` to identify TypeScript and import issues
2. **Console issues**: `npm run browser-console -- http://localhost:8080` to check for JavaScript errors and warnings
3. **Network problems**: `npm run network-monitor -- http://localhost:8080` to find failed requests, missing media files, and performance issues
4. **Visual validation**: `npm run screenshot -- http://localhost:8080` to capture and compare visual output

The network monitor is particularly valuable for ensuring all media assets extracted with `extract-media` are accessible and load correctly.

## Faithfully reproduce the original site

Strive to use the same text, styles and media from the original site.

Don't fall back on attempts to generate text, styles and media that you can't find. You should find it in the crawl.

If the site contains a reference to media at a certain URL, and you don't have that media in your crawl, fetch it by accessing the live website.

## Architecture

### Directory Structure

```
├── src/
│   ├── components/
│   │   ├── layout/         # Layout components (Header, Footer, Navigation, Layout)
│   │   ├── sections/       # Page sections (Hero, content sections, etc.)
│   │   └── ui/            # Reusable UI components (Button, cards, forms, etc.)
│   ├── data/              # JSON data files and TypeScript interfaces
│   │   ├── types.ts       # TypeScript interfaces for all data structures
│   │   ├── company.json   # Company/organization information
│   │   ├── contact.json   # Contact and location data
│   │   ├── navigation.json # Site navigation structure
│   │   └── [page].json    # Page-specific content data
│   ├── hooks/             # Custom React hooks for data access
│   │   ├── useCompanyData.ts
│   │   ├── useContactData.ts
│   │   └── use[Data].ts   # Data-specific hooks
│   ├── pages/             # Page components
│   │   └── [Page].tsx     # Individual page components
│   ├── utils/             # Utility functions
│   │   ├── cn.ts          # className utility with clsx
│   │   └── imageMap.ts    # Image path resolution utility
│   ├── App.tsx           # Root application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles with Tailwind CSS
├── src/
│   ├── assets/
│   │   └── images/         # Image assets imported via ES modules
├── public/
├── claude-log            # A log directory of Claude code actions
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration with path aliases
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.app.json     # TypeScript configuration
└── postcss.config.js     # PostCSS configuration
```

### Path Aliases

Uses `@/` prefix for clean imports:

```typescript
import { Button } from "@/components/ui/Button";
import { usePageData } from "@/hooks/usePageData";
```

## Logging

You should maintain a log directorie called `claude-log/`, located in the project directory.

In this log you should record the actions that you've taken, decisions that you made, things that you tried, and whether you were successful or had to try something else.

Each time you perform an action or get a result, create a file `claude-log/[timestamp-in-seconds]-[action-name].md`. Record what you did and what the result was; whether you were successful or had to try something else.

## Additional Resources

### Planning and Documentation

- `plans/` - Directory for planning tasks and project documentation
- `screenshots/` - Directory for storing visual comparisons and testing
  - `live/` - Screenshots of live/reference sites
  - `localhost/` - Screenshots of local development

### Website Crawler

- `crawl.ts` - TypeScript website crawler for downloading complete websites
- `crawl/` - Output directory for crawled website content (auto-generated)
- **Usage**: `npm run crawl <domain>` - Example: `npm run crawl yankeeaviation.com`
- **Features**: Recursively crawls websites up to 2 levels deep, downloads HTML, CSS, JS, images, and other assets

### Media Files

Image assets are stored in `src/assets/images/` and imported as ES modules for optimal bundling and performance. The `src/utils/imageMap.ts` utility resolves JSON data paths to imported assets. This architecture ensures:

- **Type Safety**: All images are imported and validated at build time
- **Optimization**: Vite automatically optimizes and fingerprints image assets
- **Git Storage**: Images are stored as regular git files (not LFS) in `src/assets/`
- **Path Resolution**: JSON data files can reference `/images/` paths which get resolved to imported assets

## Technical Architecture

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5 with HMR and optimized builds
- **Styling**: Tailwind CSS 3 with custom design tokens
- **Data Management**: TypeScript interfaces with JSON imports
- **State Management**: Custom React hooks for data access
- **Routing**: Single-page application (extensible with React Router)
- **SEO**: React Helmet Async for meta tag management
- **Images**: ES module imports with Vite asset optimization and lazy loading support

## Development Workflow

### Standard Development Process

1. **Start Development**: `npm run dev`
2. **Component Development**: Create/modify components in `src/components/`
3. **Data Updates**: Modify JSON files in `src/data/`
4. **Styling**: Use Tailwind utilities or update `src/index.css`
5. **Type Safety**: TypeScript provides compile-time type checking
6. **Hot Reload**: Instant updates with Vite HMR

### Adding New Features

1. **Create Component**: Add to appropriate `src/components/` subdirectory
2. **Define Types**: Update `src/data/types.ts` if needed
3. **Create Hook**: Add custom hook in `src/hooks/` for data access
4. **Update Page**: Integrate component into page structure
5. **Test**: Verify functionality and responsive design

### Styling Guidelines

- **Primary**: Use Tailwind CSS utility classes
- **Custom Styles**: Add to `src/index.css` for global styles
- **Component Styles**: Use Tailwind utilities within components
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Color Scheme**: Use theme tokens defined in `tailwind.config.js`

## Design Principles

- **Professional**: Clean, trustworthy appearance
- **Responsive**: Mobile-first design approach with adaptive layouts
- **Accessible**: WCAG 2.1 AA compliance with proper ARIA labels and focus management
- **Performance**: Optimized images, lazy loading, and efficient bundle sizes
- **SEO-Friendly**: Proper heading structure, meta tags, and semantic HTML
- **Type Safety**: Full TypeScript coverage for maintainable code
- **Component-Based**: Reusable, testable components with clean separation of concerns

## Best Practices

### React Development

- **Use TypeScript**: Leverage type safety for all components and data
- **Custom Hooks**: Centralize data access logic in custom hooks
- **Component Composition**: Build complex UIs from simple, reusable components
- **Path Aliases**: Use `@/` imports for clean, maintainable code
- **Accessibility**: Include ARIA labels, focus management, and semantic HTML
- **Performance**: Implement lazy loading and optimize bundle size

### Data Management

- **Single Source of Truth**: JSON files serve as the primary data source
- **Type Definitions**: Maintain comprehensive TypeScript interfaces
- **Hook Pattern**: Use custom hooks for consistent data access
- **Validation**: Implement runtime validation for data integrity

### Image Asset Management

- **Import Strategy**: All images are imported as ES modules from `src/assets/images/`
- **Path Resolution**: Use `resolveImagePath()` from `src/utils/imageResolver.ts` to resolve JSON paths
- **Git Storage**: Images stored as regular git files (excluded from LFS via `.gitattributes`)
- **Build Optimization**: Vite automatically optimizes, compresses, and fingerprints image assets
- **Component Usage**: Components either import images directly or use `resolveImagePath()` for JSON data

#### Image Resolution Best Practices

**Direct Imports (Preferred for Known Images)**
```typescript
// For images that are known at build time, use direct imports
import cmpImage from '@/assets/images/cmp.png';

// In component:
<img src={cmpImage} alt="Description" />
```

**Dynamic Path Resolution (For JSON-driven Content)**
```typescript
// For images referenced in JSON data files
import { resolveImagePath } from '@/utils/imageResolver';

// In component with JSON data:
const imageSrc = resolveImagePath(data.image); // "/images/photo.jpg" -> resolved path
<img src={imageSrc} alt={data.alt} />
```

**When to Use Each Approach:**
- **Direct imports**: Static images, logos, certificates, or any image that's always needed
- **Path resolution**: Dynamic content from JSON, optional images, or content-driven galleries

**Benefits of Direct Imports:**
- **Type Safety**: Build-time validation ensures image exists
- **Optimization**: Vite applies automatic compression and format conversion
- **Performance**: Enables proper bundling and lazy loading
- **Cache Busting**: Automatic filename hashing for optimal caching

### Styling

- **Utility-First**: Prefer Tailwind utilities over custom CSS
- **Responsive Design**: Test across all device sizes
- **Design Tokens**: Use consistent colors, spacing, and typography
- **Performance**: Minimize custom CSS and leverage Tailwind's optimization

### Typescript

Be sure that types are imported as types, or errors like this one will result:

```typescript
src/utils/validation.ts:1:34 - error TS1484: 'ValidationRules' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.

1 import { FormValues, FormErrors, ValidationRules } from '@/data/types';
```

---

# Important Development Reminders

## Quick Start Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Crawl a website for content
npm run crawl <domain>
```

## Key Development URLs

- **Development Server**: http://localhost:8080/
- **Production Preview**: Available after running `npm run preview`

## Core Principles

- **Type Safety**: Always maintain TypeScript interfaces when modifying data structures
- **Component Architecture**: Follow the established pattern of layout/sections/ui organization
- **Responsive Design**: Ensure all changes work across mobile, tablet, and desktop breakpoints
- **Visual Consistency**: Maintain design consistency throughout the application
- **Performance**: Optimize for loading speed and user experience

This architecture provides a modern development environment with full TypeScript support, component-based architecture, and enhanced developer experience through Vite's fast build tools.
