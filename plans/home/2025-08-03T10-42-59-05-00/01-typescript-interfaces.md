# TypeScript Interfaces Definition

**File:** `src/data/types.ts`  
**Purpose:** Define all TypeScript interfaces for type-safe data access  
**Priority:** High (Foundation)

## Overview

This file establishes the TypeScript interfaces that will ensure type safety across all data structures used in the Yankee Aviation website. These interfaces correspond to the JSON data files that will be imported by the custom hooks.

## Required Interfaces

### Company Information
```typescript
export interface Company {
  name: string;
  establishedYear: number;
  yearsInBusiness: number;
  owners: string[];
  businessType: string;
  description: string;
  location: {
    facility: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    airport: string;
  };
  certifications?: string[];
  specialties: string[];
}
```

### Contact Information
```typescript
export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Contact {
  phone: string;
  email: string;
  address: {
    street: string;
    gate?: string;
    facility: string;
    city: string;
    state: string;
    zipCode: string;
  };
  hours: BusinessHours;
  googleMaps: {
    embedUrl: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}
```

### Navigation Structure
```typescript
export interface NavigationItem {
  label: string;
  path: string;
  isActive?: boolean;
}

export interface Navigation {
  primary: NavigationItem[];
  mobile: {
    enabled: boolean;
    breakpoint: string;
  };
}
```

### Home Page Content
```typescript
export interface HeroContent {
  primaryHeading: string;
  secondaryHeading: string;
  description: string;
  callToAction?: {
    text: string;
    link: string;
  };
  backgroundImage?: string;
}

export interface AboutContent {
  heading: string;
  description: string[];
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface ServiceOverview {
  heading: string;
  description: string;
  services: string[];
  image: string;
  imageAlt: string;
}

export interface Testimonial {
  name: string;
  credentials?: string;
  yearsAsCustomer?: number;
  quote: string;
  highlights?: string[];
}

export interface TestimonialsSection {
  heading: string;
  testimonials: Testimonial[];
}

export interface HomeData {
  hero: HeroContent;
  about: AboutContent;
  services: ServiceOverview;
  testimonials: TestimonialsSection;
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}
```

### Media Assets
```typescript
export interface MediaAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export interface MediaGallery {
  images: MediaAsset[];
  featured?: MediaAsset;
}
```

## Implementation Steps

1. **Create the file** at `src/data/types.ts`
2. **Import and use** in all custom hooks
3. **Ensure consistency** with JSON data structure
4. **Add JSDoc comments** for better developer experience

## Usage Example

```typescript
// In custom hooks
import type { Company, Contact, HomeData, Navigation } from '@/data/types';

// In components
interface Props {
  company: Company;
  contact: Contact;
}
```

## Validation Notes

- All interfaces should be **strict** with required fields
- Use **optional properties** (`?`) only where data might be missing
- Include **union types** for controlled values (e.g., loading states)
- Add **JSDoc comments** for complex or business-specific fields

## Testing Strategy

- Validate interfaces match actual JSON data structure
- Use TypeScript strict mode to catch type mismatches
- Test with realistic data to ensure practical usability