# INTEGRAL Page Clone Plan - Overview

**Page**: en/integral  
**Date**: 2025-08-05T15:53:19-05:00  
**Source**: `/crawl/aura-aero.com/en/integral/index.html`

## Executive Summary

This plan outlines the implementation of the INTEGRAL aircraft showcase page as a React component. The page features a sophisticated single-page application with video hero section, interactive 360° aircraft viewer, technical specifications, and testimonials.

## Page Architecture

The INTEGRAL page follows a premium aerospace product showcase pattern with these key characteristics:

- **Single-page application** with smooth scroll navigation
- **Dark theme** with white text and accent colors
- **Video-first hero section** showcasing the aircraft
- **Interactive 360° aircraft viewer** with model switcher
- **Technical specifications focus** for aviation professionals
- **Social proof** through customer testimonials
- **Fixed sidebar navigation** for easy section access

## Implementation Strategy

### 1. Component Architecture
- **Page Component**: `IntegralPage.tsx` - main page wrapper
- **Layout Components**: Reuse existing Header/Footer from site architecture
- **Section Components**: Individual components for each major section
- **UI Components**: Reusable elements (cards, buttons, viewers)

### 2. Data Management
- **JSON Data Files**: Separate content into structured data files
- **TypeScript Interfaces**: Strong typing for all data structures
- **Custom Hooks**: Data access layer with type safety
- **Asset Management**: Optimize and organize media assets

### 3. Interactive Features
- **360° Aircraft Viewer**: Custom component or CloudImage integration
- **Model Switcher**: State management for INTEGRAL R/S/E variants
- **Feature Cards**: Expandable cards with hover states
- **Smooth Scrolling**: Section navigation with active states

### 4. Media Assets
- **Video**: Hero section background video
- **Images**: 70+ 360° rotation frames, logos, icons, backgrounds
- **Optimization**: Lazy loading, WebP conversion, responsive sizing

## Key Components Required

1. **HeroVideoSection** - Video background with overlay content
2. **AircraftViewer360** - Interactive 360° product viewer
3. **ModelSwitcher** - Toggle between INTEGRAL variants
4. **FeatureCards** - Expandable feature highlights
5. **SpecificationsTable** - Two-column technical data
6. **TestimonialsSection** - Customer testimonial cards
7. **SidebarNavigation** - Fixed navigation with scroll-to functionality

## Data Structure Design

### Core Data Files
- `integral.json` - Main page content and copy
- `aircraftModels.json` - INTEGRAL R/S/E variant data
- `specifications.json` - Technical specifications data
- `testimonials.json` - Customer testimonials

### Asset Organization
- `src/assets/images/integral/` - Page-specific images
- `src/assets/videos/` - Hero video assets
- `src/assets/icons/` - Feature and UI icons

## Technical Considerations

### Performance
- **Lazy Loading**: 360° image sequences and video
- **Code Splitting**: Route-level component splitting
- **Image Optimization**: WebP/AVIF formats with fallbacks
- **Bundle Size**: Monitor impact of 360° viewer assets

### Accessibility
- **ARIA Labels**: Proper labeling for interactive elements
- **Keyboard Navigation**: Full keyboard support for 360° viewer
- **Screen Readers**: Meaningful descriptions for visual content
- **Motion Preferences**: Respect reduced motion settings

### SEO
- **Meta Tags**: Aircraft-specific title and descriptions
- **Structured Data**: Product schema markup
- **Image Alt Text**: Descriptive alt attributes
- **Heading Structure**: Proper H1-H6 hierarchy

## Implementation Sequence

1. **Data Structure Setup** - JSON files and TypeScript interfaces
2. **Page Layout** - Basic component structure and routing
3. **Hero Section** - Video background and overlay content
4. **Aircraft Viewer** - 360° viewer and model switching
5. **Content Sections** - Features, specifications, testimonials
6. **Navigation** - Fixed sidebar and smooth scrolling
7. **Responsive Design** - Mobile and tablet optimizations
8. **Performance** - Lazy loading and asset optimization
9. **Testing** - Accessibility, performance, cross-browser
10. **Integration** - Site-wide navigation and footer

## Success Criteria

- **Visual Fidelity**: 95%+ match to original design
- **Performance**: < 3s load time on 3G connection
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive**: Seamless experience across all devices
- **Maintainability**: Clean, type-safe, reusable code
- **SEO**: Proper meta tags and structured data

## Risk Mitigation

- **360° Viewer Complexity**: Start with simple image carousel, enhance progressively
- **Video Performance**: Provide poster image and format fallbacks
- **Asset Size**: Implement progressive loading and compression
- **Browser Compatibility**: Test extensively on target browsers
- **Content Management**: Ensure all text is editable via JSON files

This plan provides a roadmap for faithfully replicating the INTEGRAL page while leveraging modern React best practices and the existing site architecture.