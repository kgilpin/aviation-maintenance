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

Notes on screenshots:

- Always use `npm run screenshot -- <page_url> [--output <output_file>]` instead of running the script directly.
- By convention, save screenshots in the `screenshots/` directory, organized by `live/` for reference sites and `localhost/` for local development.

## Development Server

The React development server runs with hot module replacement for instant updates:

**URL**: `http://localhost:5173/` (or next available port)

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
│   │   └── cn.ts         # className utility with clsx
│   ├── App.tsx           # Root application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles with Tailwind CSS
├── public/
│   └── images/           # Static image assets
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

Static media files are stored in `public/images/` and served directly by Vite. Media metadata may be documented in data files for reference when determining usage throughout the site.

## Technical Architecture

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7 with HMR and optimized builds
- **Styling**: Tailwind CSS 3 with custom design tokens
- **Data Management**: TypeScript interfaces with JSON imports
- **State Management**: Custom React hooks for data access
- **Routing**: Single-page application (extensible with React Router)
- **SEO**: React Helmet Async for meta tag management
- **Images**: Static assets with lazy loading support

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

### Styling

- **Utility-First**: Prefer Tailwind utilities over custom CSS
- **Responsive Design**: Test across all device sizes
- **Design Tokens**: Use consistent colors, spacing, and typography
- **Performance**: Minimize custom CSS and leverage Tailwind's optimization

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

- **Development Server**: http://localhost:5173/ (or next available port)
- **Production Preview**: Available after running `npm run preview`

## Core Principles

- **Type Safety**: Always maintain TypeScript interfaces when modifying data structures
- **Component Architecture**: Follow the established pattern of layout/sections/ui organization
- **Responsive Design**: Ensure all changes work across mobile, tablet, and desktop breakpoints
- **Visual Consistency**: Maintain design consistency throughout the application
- **Performance**: Optimize for loading speed and user experience

This architecture provides a modern development environment with full TypeScript support, component-based architecture, and enhanced developer experience through Vite's fast build tools.
