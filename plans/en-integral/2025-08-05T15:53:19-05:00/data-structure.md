# Data Structure Design for INTEGRAL Page

## TypeScript Interfaces (src/data/types.ts)

```typescript
// INTEGRAL page specific interfaces
export interface AircraftModel {
  id: string;
  name: string;
  logo: string;
  description: string;
  status: 'certified' | 'in-progress' | 'development';
  certification: {
    easa: boolean;
    faa: boolean;
    details: string;
  };
  images: {
    hero: string;
    viewer360: string[];
    thumbnail: string;
  };
}

export interface TechnicalSpecification {
  category: string;
  items: Array<{
    label: string;
    value: string;
    unit?: string;
  }>;
}

export interface FeatureCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  company: string;
  logo: string;
  quote: string;
  author: {
    name: string;
    title: string;
  };
}

export interface IntegralPageData {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    video: string;
    videoPoster: string;
    headline: string;
    subheadline: string;
    certification: string;
  };
  aircraftModels: AircraftModel[];
  features: FeatureCard[];
  specifications: TechnicalSpecification[];
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Testimonial[];
  contact: {
    icon: string;
    message: string;
    link: string;
  };
  navigation: Array<{
    id: string;
    label: string;
    target: string;
  }>;
}
```

## JSON Data Files

### 1. src/data/integral.json
Main page content and configuration:

```json
{
  "meta": {
    "title": "INTEGRAL - Aura Aero",
    "description": "The latest generation of side by side two-seater aircraft, for training with an aerobatic capacity",
    "keywords": ["INTEGRAL", "aircraft", "training", "aerobatic", "EASA", "FAA", "aviation"]
  },
  "hero": {
    "video": "/videos/INTEGRAL-WEB-1.mp4",
    "videoPoster": "/images/integral/integral-hero-poster.jpg",
    "headline": "The latest generation of side by side two-seater aircraft, for training with an aerobatic capacity",
    "subheadline": "",
    "certification": "INTEGRAL R certified EASA CS23, FAA certification currently in progress"
  },
  "contact": {
    "icon": "/images/icons/picto-contact.svg",
    "message": "Do you have questions about our products?",
    "link": "/en/contact-us"
  },
  "navigation": [
    { "id": "video", "label": "Integral", "target": "#video" },
    { "id": "integral", "label": "INTEGRAL R", "target": "#integral" },
    { "id": "characteristics", "label": "Technical specifications", "target": "#characteristics" },
    { "id": "testimonials", "label": "Testimonies", "target": "#testimonials" }
  ]
}
```

### 2. src/data/aircraftModels.json
Aircraft variant data:

```json
{
  "models": [
    {
      "id": "integral-r",
      "name": "INTEGRAL R",
      "logo": "/images/integral/integral-r-logo.png",
      "description": "Certified aerobatic training aircraft",
      "status": "certified",
      "certification": {
        "easa": true,
        "faa": false,
        "details": "EASA CS23 certified, FAA certification in progress"
      },
      "images": {
        "hero": "/images/integral/integral-r-hero.jpg",
        "viewer360": [
          "/images/integral/360/IntegralRX2_001.png",
          "/images/integral/360/IntegralRX2_002.png"
        ],
        "thumbnail": "/images/integral/integral-r-thumb.jpg"
      }
    },
    {
      "id": "integral-s",
      "name": "INTEGRAL S",
      "logo": "/images/integral/integral-s-logo.png",
      "description": "Sport aircraft variant",
      "status": "in-progress",
      "certification": {
        "easa": false,
        "faa": false,
        "details": "Development in progress"
      },
      "images": {
        "hero": "/images/integral/integral-s-hero.jpg",
        "viewer360": [],
        "thumbnail": "/images/integral/integral-s-thumb.jpg"
      }
    },
    {
      "id": "integral-e",
      "name": "INTEGRAL E",
      "logo": "/images/integral/integral-e-1.png",
      "description": "Electric variant",
      "status": "development",
      "certification": {
        "easa": false,
        "faa": false,
        "details": "Concept development phase"
      },
      "images": {
        "hero": "/images/integral/integral-e-hero.jpg",
        "viewer360": [],
        "thumbnail": "/images/integral/integral-e-thumb.jpg"
      }
    }
  ]
}
```

### 3. src/data/integralFeatures.json
Feature cards data:

```json
{
  "features": [
    {
      "id": "seating",
      "title": "Side by side two-seater",
      "icon": "/images/icons/seat.svg",
      "description": "Side by side two-seater",
      "details": ["Taildragger Landing Gear"]
    },
    {
      "id": "load-factor",
      "title": "Load factor",
      "icon": "/images/icons/weight.svg",
      "description": "Multiple G-force ratings",
      "details": [
        "Normal category: +3,8G / -1,52G",
        "Aerobatic category: +6G / -3G",
        "Competition category: +9G / -6G"
      ]
    },
    {
      "id": "safety",
      "title": "High safety level",
      "icon": "/images/icons/shield-check.svg",
      "description": "Advanced safety features",
      "details": [
        "Whole rescue parachute",
        "Anti-deflagration fuel tanks"
      ]
    },
    {
      "id": "certification",
      "title": "Certification",
      "icon": "/images/icons/certification.svg",
      "description": "International certifications",
      "details": ["EASA CS23", "FAA (in progress)"]
    }
  ]
}
```

### 4. src/data/integralSpecifications.json
Technical specifications:

```json
{
  "specifications": [
    {
      "category": "Dimensions",
      "items": [
        { "label": "Length", "value": "7,26 m", "unit": "(23,82 ft)" },
        { "label": "Wingspan", "value": "8,78 m", "unit": "(28,80 ft)" },
        { "label": "Height", "value": "2,48 m", "unit": "(8,13 ft)" }
      ]
    },
    {
      "category": "Propulsion",
      "items": [
        { "label": "Engine", "value": "Lycoming AEIO-390/A3B6", "unit": "(210 hp @ 2 700 rpm)" },
        { "label": "Propeller", "value": "MT Propeller MTV-15-B-C/C193-25" }
      ]
    },
    {
      "category": "Weight & Load",
      "items": [
        { "label": "MTOW", "value": "1 005 kg", "unit": "(2 216 lbs)" },
        { "label": "Load Factor", "value": "Multiple categories with G-force ratings" }
      ]
    },
    {
      "category": "Performance",
      "items": [
        { "label": "Cruising Speed", "value": "278 km/h", "unit": "(150 kt)" },
        { "label": "Maneuvering Speed", "value": "300 km/h", "unit": "(162 kt)" },
        { "label": "Stall Speed", "value": "111 km/h", "unit": "(60 kt)" },
        { "label": "Approach Speed", "value": "145 km/h", "unit": "(78 kt)" }
      ]
    },
    {
      "category": "Range & Capacity",
      "items": [
        { "label": "Range", "value": "980 km", "unit": "(530 NM)" },
        { "label": "Fuel Capacity", "value": "159 L", "unit": "(42 gal US)" },
        { "label": "Luggage Capacity", "value": "30 kg", "unit": "(66 lbs)" }
      ]
    }
  ]
}
```

### 5. src/data/integralTestimonials.json
Customer testimonials:

```json
{
  "testimonials": [
    {
      "id": "midi-pyrenees-voltige",
      "company": "Midi-Pyrénées Voltige",
      "logo": "/images/testimonials/midi-pyrenees-voltige.jpg",
      "quote": "Outstanding performance and reliability for aerobatic training.",
      "author": {
        "name": "Jean-François Babi",
        "title": "President"
      }
    },
    {
      "id": "chateauroux-villers",
      "company": "Châteauroux-Villers flying club",
      "logo": "/images/testimonials/aero-club-chateauroux.jpg",
      "quote": "Perfect aircraft for advanced flight training programs.",
      "author": {
        "name": "Bruno Barraud",
        "title": "President"
      }
    }
  ]
}
```

### 6. src/data/integralBenefits.json
Product benefits section:

```json
{
  "benefits": [
    {
      "title": "Versatility",
      "description": "VFR & UPRT training, aerobatic competitions, travel",
      "icon": "/images/icons/versatility.svg"
    },
    {
      "title": "Performance & Emotions",
      "description": "Competition aircraft for future aerobatics",
      "icon": "/images/icons/performance.svg"
    },
    {
      "title": "Spacious and ergonomic environment",
      "description": "Adjustable seats and rudders",
      "icon": "/images/icons/ergonomic.svg"
    },
    {
      "title": "Noble and lasting materials",
      "description": "Wood-carbon combination",
      "icon": "/images/icons/materials.svg"
    }
  ]
}
```

## Custom Hooks (src/hooks/)

### useIntegralData.ts
```typescript
import type { IntegralPageData } from '@/data/types';

export function useIntegralData(): IntegralPageData {
  // Implementation to combine all integral data files
}
```

### useAircraftModels.ts
```typescript
import type { AircraftModel } from '@/data/types';

export function useAircraftModels(): AircraftModel[] {
  // Implementation to load aircraft models data
}
```

## Asset Organization

```
src/assets/
├── images/
│   ├── integral/
│   │   ├── 360/
│   │   │   ├── IntegralRX2_001.png
│   │   │   ├── IntegralRX2_002.png
│   │   │   └── ... (70 frames total)
│   │   ├── backgrounds/
│   │   │   └── INTEGRAL-R-HANGAR-DARK_Website.png
│   │   ├── logos/
│   │   │   ├── integral-r-logo.png
│   │   │   ├── integral-s-logo.png
│   │   │   └── integral-e-1.png
│   │   └── hero/
│   │       └── integral-hero-poster.jpg
│   ├── icons/
│   │   ├── seat.svg
│   │   ├── weight.svg
│   │   ├── shield-check.svg
│   │   ├── certification.svg
│   │   └── picto-contact.svg
│   └── testimonials/
│       ├── midi-pyrenees-voltige.jpg
│       └── aero-club-chateauroux.jpg
└── videos/
    └── INTEGRAL-WEB-1.mp4
```

This data structure provides:
- **Type Safety**: Full TypeScript coverage for all data
- **Modularity**: Separate files for different content types
- **Maintainability**: Easy to update content without touching code
- **Reusability**: Components can consume data through custom hooks
- **Performance**: Structured for efficient loading and caching