# Data File: Contact Information

**Phase**: 1 - Foundation  
**File**: `src/_data/contact.json`  
**Purpose**: Centralize contact details for consistent display across components  
**Dependencies**: None

## Overview

Create a data file for contact information that appears in multiple locations (navigation, headers, contact pages). Centralizing this data ensures consistency and easy maintenance.

## Content Analysis

From the crawled home page, extract:
- **Phone Number**: "978-689-4492" (appears in navigation and contact sections)
- **Location**: "Lawrence Municipal Airport, North Andover, Massachusetts"
- **Business Context**: Fixed Base Operator services at the airport

## Implementation

### File Location
```
src/_data/contact.json
```

### File Contents
```json
{
  "phone": {
    "display": "(978) 689-4492",
    "tel": "978-689-4492",
    "international": "+1-978-689-4492"
  },
  "location": {
    "name": "Lawrence Municipal Airport",
    "address": "North Andover, Massachusetts", 
    "airport_code": "LWM",
    "coordinates": {
      "latitude": 42.717222,
      "longitude": -71.123333
    }
  },
  "business_hours": {
    "general": "Contact for current hours",
    "emergency": "24/7 emergency services available"
  },
  "services_available": [
    "Fixed Base Operator (FBO) Services",
    "Aircraft Maintenance",
    "Fuel Services", 
    "Hangar Services"
  ],
  "mailing_address": {
    "po_box": "P.O. Box 995",
    "city": "North Andover",
    "state": "Massachusetts",
    "zip": ""
  }
}
```

## Data Structure Explanation

### Phone Object
- **display**: Formatted for human reading "(978) 689-4492"
- **tel**: Format for tel: links "978-689-4492"  
- **international**: Full international format

### Location Object
- **name**: Official airport name
- **address**: City and state for display
- **airport_code**: FAA identifier
- **coordinates**: For mapping integration

## Usage in Components

This data will be consumed by:
- **Phone Contact Component**: `contact.phone` (all variants)
- **Company Brand Header**: `contact.location` for address display
- **Contact Pages**: Full contact object
- **Map Integration**: `contact.location.coordinates`

## Component Integration Examples

### Phone Display
```html
<!-- Navigation phone -->
<a href="tel:{{ contact.phone.tel }}">{{ contact.phone.display }}</a>

<!-- Large contact display -->
<div class="contact-phone-large">{{ contact.phone.display }}</div>
```

### Location Display  
```html
<!-- Header location -->
<p class="location">{{ contact.location.name }}, {{ contact.location.address }}</p>

<!-- Full address -->
<address>
  {{ contact.mailing_address.po_box }}<br>
  {{ contact.mailing_address.city }}, {{ contact.mailing_address.state }}
</address>
```

## Validation

After creating the file:
- [ ] JSON syntax is valid
- [ ] Phone number matches original site exactly
- [ ] Location information is accurate
- [ ] Data structure supports all planned component uses

## Future Extensions

This structure allows for easy addition of:
- Email addresses
- Fax numbers  
- Additional office locations
- Detailed business hours
- Emergency contact procedures

## Next Steps

After completing this file:
1. Proceed to `03-data-navigation.md` for site navigation structure
2. This data will be referenced by phone contact and header components
3. Components will access data via `{{ contact.property_name }}`