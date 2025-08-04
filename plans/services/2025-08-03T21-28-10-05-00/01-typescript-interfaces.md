# TypeScript Interfaces for Services Page

## Overview

Enhance the existing TypeScript interfaces in `src/data/types.ts` to support the services page data structures, including service listings, content sections, and call-to-action elements.

## Required Interface Additions

### Services Content Interfaces

```typescript
// Individual service item interface
export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  featured?: boolean;
}

// Services list section interface
export interface ServicesListSection {
  heading: string;
  subheading?: string;
  description: string;
  services: Service[];
  image?: string;
  imageAlt?: string;
}

// Hero section for services page
export interface ServicesHeroContent {
  title: string;
  backgroundImage?: string;
  subtitle?: string;
}

// Call-to-action section interface
export interface CallToActionSection {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
  imageAlt?: string;
}

// Complete services page data structure
export interface ServicesPageData {
  hero: ServicesHeroContent;
  servicesContent: ServicesListSection;
  callToAction: CallToActionSection;
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}
```

### Enhanced Service Display Interfaces

```typescript
// Service display options
export interface ServiceDisplayProps {
  layout?: 'list' | 'grid' | 'cards';
  showIcons?: boolean;
  showDescriptions?: boolean;
  iconType?: 'checkmark' | 'custom' | 'fontawesome';
}

// Service card component props
export interface ServiceCardProps {
  service: Service;
  layout?: 'horizontal' | 'vertical';
  showIcon?: boolean;
  iconType?: string;
  className?: string;
}
```

### Content Section Interfaces

```typescript
// Generic content section for reusability
export interface ContentSection {
  id: string;
  type: 'hero' | 'content' | 'services' | 'cta' | 'image';
  heading?: string;
  subheading?: string;
  description?: string;
  content?: string;
  image?: string;
  imageAlt?: string;
  backgroundImage?: string;
  alignment?: 'left' | 'center' | 'right';
  layout?: 'single' | 'two-column' | 'full-width';
}

// Page layout configuration
export interface PageLayout {
  sections: ContentSection[];
  theme?: 'light' | 'dark' | 'brand';
  spacing?: 'compact' | 'normal' | 'spacious';
}
```

## Implementation Notes

### Design Principles

- **Extensible Structure**: Interfaces support future service additions and modifications
- **Flexible Layout**: Support for different display formats and layouts
- **Type Safety**: Comprehensive typing for all content elements
- **Reusability**: Generic interfaces that can be used across multiple pages
- **SEO Support**: Built-in meta data and structured content support

### Content Organization

- **Modular Sections**: Each content area is independently typed and manageable
- **Service Flexibility**: Support for different service types and display options
- **Media Integration**: Comprehensive image and background support
- **Call-to-Action**: Structured approach to conversion elements

### Validation Requirements

- All service items must have unique IDs for consistent referencing
- Image paths must correspond to available assets
- Button links must be valid internal or external URLs
- SEO metadata should follow best practices for length and content

## Files to Modify

- `src/data/types.ts` - Add new interfaces for services page data structures

## Integration Points

### Existing Type Compatibility

- Extends existing `Company` and `Contact` interfaces where applicable
- Maintains consistency with `ButtonProps` and other UI component interfaces
- Supports existing `Layout` and navigation patterns

### Future Extensibility

- Service interface supports additional metadata fields
- Content sections can be extended for other service pages
- Call-to-action pattern can be reused across multiple pages
- SEO structure supports rich snippets and structured data

## Validation and Testing

- TypeScript compiler validation for all new interfaces
- Runtime type checking for data consistency
- Integration testing with existing component props
- Validation of JSON data structure compliance

This interface design provides a robust foundation for the services page while maintaining flexibility for future enhancements and ensuring type safety throughout the implementation.