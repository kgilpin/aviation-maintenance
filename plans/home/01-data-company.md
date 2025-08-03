# Data File: Company Information

**Phase**: 1 - Foundation  
**File**: `src/_data/company.json`  
**Purpose**: Centralize company information used across all pages  
**Dependencies**: None

## Overview

Create a data file containing core company information that will be referenced by multiple components across the site. This ensures consistency and makes updates easy.

## Content Analysis

From the crawled home page, extract these company details:
- **Company Name**: "Falcon Air Inc." (displayed in script/decorative font)
- **Tagline**: "A Leading Fixed Base Operator"  
- **Location**: "Lawrence Municipal Airport, North Andover, Massachusetts"
- **Phone**: "978-689-4492" (prominently displayed in navigation)
- **Experience**: "Over 40 years of industry related experience"
- **Mission**: Innovation, efficiency, and knowledge focus

## Implementation

### File Location
```
src/_data/company.json
```

### File Contents
```json
{
  "name": "Falcon Air Inc.",
  "tagline": "A Leading Fixed Base Operator", 
  "location": "Lawrence Municipal Airport, North Andover, Massachusetts",
  "phone": "978-689-4492",
  "experience_years": "40+",
  "description": "Falcon Air, Inc. strives to be the most innovative, efficient and knowledgeable FBO possible. Both the president and chief mechanic have over 40 years of industry related experience and continue to educate themselves on new techniques.",
  "services": {
    "primary": [
      "FBO Services",
      "Aircraft Maintenance", 
      "Fuel Services"
    ],
    "specialties": [
      "Annual Inspections",
      "Expert Maintenance Service"
    ]
  },
  "values": [
    "Most innovative FBO possible",
    "Efficient operations",
    "Knowledgeable expertise", 
    "Continuous education and improvement"
  ],
  "location_details": {
    "airport": "Lawrence Municipal Airport",
    "city": "North Andover",
    "state": "Massachusetts",
    "airport_code": "LWM"
  }
}
```

## Usage in Components

This data will be consumed by:
- **Company Brand Header**: `company.name`, `company.location`
- **Hero Section**: `company.tagline`, `company.description`
- **Service Previews**: `company.services`
- **About Sections**: `company.experience_years`, `company.values`

## Validation

After creating the file, verify:
- [ ] JSON is valid (no syntax errors)
- [ ] All company information matches original site content
- [ ] File is accessible at the correct path
- [ ] Data structure supports component requirements

## Next Steps

After completing this file:
1. Proceed to `02-data-contact.md` for contact information
2. This data will be referenced in multiple component files
3. Components will access data via `{{ company.property_name }}`