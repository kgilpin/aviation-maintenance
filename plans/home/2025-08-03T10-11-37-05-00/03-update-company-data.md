# Update Company Data

**File**: `src/data/company.json`
**Component**: Company information and branding
**Priority**: Medium

## Current vs Required Company Data

### Company Information Updates

Update `src/data/company.json` with accurate Falcon Air Inc. details:

```json
{
  "name": "Falcon Air Inc.",
  "legalName": "Falcon Air, Inc.", 
  "tagline": "A Leading Fixed Base Operator",
  "description": "Falcon Air, Inc. strives to be the most innovative, efficient and knowledgeable FBO possible. Both the president and chief mechanic have over 40 years of industry related experience and continue to educate themselves on new techniques.",
  "established": "1980s",
  "experience": "40+ years",
  
  "location": {
    "airport": "Lawrence Municipal Airport",
    "city": "North Andover", 
    "state": "Massachusetts",
    "region": "New England",
    "airportCode": "LWM"
  },
  
  "contact": {
    "phone": "978-689-4492",
    "phoneFormatted": "(978) 689-4492",
    "email": "info@falconairinc.com",
    "website": "https://www.falconairinc.com"
  },
  
  "services": {
    "primary": "Fixed Base Operator (FBO)",
    "categories": [
      "Aircraft Maintenance",
      "FBO Services", 
      "Aircraft Sales",
      "Fuel Services",
      "Hangar Services"
    ]
  },
  
  "certifications": [
    "FAA Certified Repair Station",
    "NBAA Member",
    "Corporate Aircraft Association Member"
  ],
  
  "leadership": {
    "president": {
      "experience": "40+ years",
      "focus": "Aviation operations"
    },
    "chiefMechanic": {
      "experience": "40+ years", 
      "focus": "Aircraft maintenance and repair"
    }
  },
  
  "branding": {
    "fonts": {
      "company": "belinda-w00-regular, script",
      "headers": "open sans condensed, sans-serif",
      "body": "brandon-grot-w01-light, sans-serif"
    },
    "colors": {
      "primary": "#292929",
      "text": "#212121",
      "accent": "aviation-blue"
    }
  },
  
  "social": {
    "platforms": []
  }
}
```

## Key Data Points from Crawled Content

### Company Identity
- **Official Name**: "Falcon Air Inc." (with period)
- **Stylized Name**: Script font presentation
- **Location Hierarchy**: Airport → City → State format

### Experience & Expertise  
- **40+ years** industry experience (both president and chief mechanic)
- **Continuous education** on new techniques
- **Innovation focus** - "most innovative, efficient and knowledgeable FBO"

### Location Details
- **Lawrence Municipal Airport** (primary identifier)
- **North Andover, Massachusetts** (city/state)
- **New England region** (geographic context)

## TypeScript Interface Updates

Ensure `src/data/types.ts` includes comprehensive company data interface:

```typescript
export interface CompanyData {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  established?: string;
  experience: string;
  
  location: {
    airport: string;
    city: string;
    state: string;
    region: string;
    airportCode?: string;
  };
  
  contact: {
    phone: string;
    phoneFormatted: string;
    email?: string;
    website: string;
  };
  
  services: {
    primary: string;
    categories: string[];
  };
  
  certifications: string[];
  
  leadership: {
    president: {
      experience: string;
      focus: string;
    };
    chiefMechanic: {
      experience: string;
      focus: string;
    };
  };
  
  branding: {
    fonts: {
      company: string;
      headers: string;
      body: string;
    };
    colors: {
      primary: string;
      text: string;
      accent: string;
    };
  };
  
  social: {
    platforms: any[];
  };
}
```

## Usage in Components

### Header/Navigation Components
- Company name with script font styling
- Location subtitle display
- Phone number prominence

### Hero Section
- Tagline integration
- Description text
- Experience highlighting

### About/Company Sections  
- Leadership experience
- Service categories
- Certifications display

## Implementation Notes

1. **Font Integration**: Ensure script font (belinda-w00-regular) is loaded for company name
2. **Phone Formatting**: Provide both raw and formatted phone numbers
3. **Experience Emphasis**: 40+ years is a key differentiator
4. **Location Hierarchy**: Airport-first identification matches aviation industry norms

## Dependencies

- Custom font loading for company name
- Updated component templates to use new data structure
- Phone number formatting utilities

## Testing

- [ ] Company name displays with correct styling
- [ ] Location information shows properly
- [ ] Phone number formats correctly
- [ ] Experience claims are accurate
- [ ] All text content matches crawled source
- [ ] TypeScript compilation succeeds