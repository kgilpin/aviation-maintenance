# TypeScript Interfaces Enhancement

## Overview

Enhance the existing TypeScript interfaces in `src/data/types.ts` to support the about page and team member data structures.

## Required Interface Additions

### Team Member Interfaces

```typescript
// Team member profile interface
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  shortBio: string;
  fullBio?: string;
  credentials?: string[];
  achievements?: string[];
  specialties?: string[];
  yearsWithCompany?: number;
  personalInterests?: string[];
  currentAircraft?: string;
  education?: string[];
}

// Team section interface
export interface TeamSection {
  heading: string;
  subheading?: string;
  description?: string;
  members: TeamMember[];
}
```

### About Page Content Interfaces

```typescript
// About page hero section
export interface AboutHeroContent {
  primaryHeading: string;
  secondaryHeading?: string;
  description: string;
  backgroundImage?: string;
  callToAction?: {
    text: string;
    link: string;
  };
}

// Company history section
export interface CompanyHistoryContent {
  heading: string;
  description: string[];
  highlights: string[];
  timeline?: {
    year: number;
    event: string;
  }[];
  image?: string;
  imageAlt?: string;
}

// Complete about page data structure
export interface AboutPageData {
  hero: AboutHeroContent;
  companyHistory: CompanyHistoryContent;
  team: TeamSection;
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}
```

### Enhanced Company Interface

```typescript
// Extend existing Company interface
export interface Company {
  // ... existing properties
  awards?: Award[];
  certifications?: Certification[];
  keyPersonnel?: string[]; // IDs of key team members
}

export interface Award {
  title: string;
  year: number;
  organization: string;
  recipient: string;
  description?: string;
}

export interface Certification {
  name: string;
  organization: string;
  holder: string;
  year?: number;
  description?: string;
}
```

## Implementation Notes

- Add these interfaces to the existing `src/data/types.ts` file
- Ensure all interfaces are exported for use across components
- Maintain consistency with existing naming conventions
- Include optional properties for flexibility in data structure
- Support both short and extended biographical content for team members
- Enable future expansion with timeline and certification tracking

## Files to Modify

- `src/data/types.ts` - Add new interfaces and enhance existing ones

## Validation Requirements

- All new interfaces should be properly typed
- Optional properties should use `?` notation
- Array types should be explicitly defined
- Ensure compatibility with existing data structures
- Test with TypeScript compiler for type safety