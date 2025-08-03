# Data File: Navigation Structure

**Phase**: 1 - Foundation  
**File**: `src/_data/navigation.json`  
**Purpose**: Define site navigation, social links, and partnership information  
**Dependencies**: None

## Overview

Create a comprehensive navigation data file that includes main menu items, social media links, and partnership information. This centralizes all navigation-related data for consistent use across components.

## Content Analysis

From the crawled site, extract:

### Main Navigation Menu
1. **FBO/PRICES** → `/services/` 
2. **MAINTENANCE** → `/maintenance/`
3. **AMMENITIES** → `/amenities/` (Note: Fix spelling from original "AMMENITIES")
4. **CONTACT** → `/contact/` (original links to `/map/`)
5. **AIRCRAFT FOR SALE** → `/for-sale/`
6. **REVIEWS** → `/reviews/`

### Social Media
- **Facebook**: https://www.facebook.com/pages/Falcon-Air-Inc/392520287552409

### Partnerships
- **Corporate Aviation Association**: https://www.corpaa.us/

## Implementation

### File Location
```
src/_data/navigation.json
```

### File Contents
```json
{
  "main": [
    {
      "text": "FBO/PRICES",
      "url": "/services/",
      "description": "Fixed Base Operator services and pricing information"
    },
    {
      "text": "MAINTENANCE", 
      "url": "/maintenance/",
      "description": "Aircraft maintenance services and expertise"
    },
    {
      "text": "AMENITIES",
      "url": "/amenities/", 
      "description": "Airport and facility amenities for customers"
    },
    {
      "text": "CONTACT",
      "url": "/contact/",
      "description": "Contact information and location details"
    },
    {
      "text": "AIRCRAFT FOR SALE",
      "url": "/for-sale/",
      "description": "Aircraft available for purchase"
    },
    {
      "text": "REVIEWS",
      "url": "/reviews/",
      "description": "Customer reviews and testimonials"
    }
  ],
  "contact": {
    "phone": {
      "display": "(978) 689-4492", 
      "tel": "978-689-4492"
    }
  },
  "social": {
    "facebook": {
      "name": "Facebook",
      "url": "https://www.facebook.com/pages/Falcon-Air-Inc/392520287552409",
      "icon": "/images/4f857b2e8a316c4e1ed16717a3d4ec8c.png"
    }
  },
  "partnerships": {
    "corpaa": {
      "name": "Corporate Aviation Association",
      "url": "https://www.corpaa.us/", 
      "logo": "/images/ca1a47_ee7af9014ccf424da88bcdf9e0ee72e8_mv2.jpg"
    }
  }
}
```

## Data Structure Explanation

### Main Navigation Array
Each menu item includes:
- **text**: Display text for the menu item
- **url**: Internal link destination 
- **description**: For accessibility and tooltips

### Contact Object
- Embedded phone contact for navigation display
- Mirrors contact.json but allows navigation-specific formatting

### Social Object
- Platform-specific data with icons
- External links with proper targeting

### Partnerships Object  
- External organization relationships
- Logo images for visual display

## Usage in Components

### Main Navigation Component
```html
<nav>
  <ul>
  {% for item in navigation.main %}
    <li>
      <a href="{{ item.url }}" 
         title="{{ item.description }}"
         class="{% if page.url == item.url %}active{% endif %}">
        {{ item.text }}
      </a>
    </li>
  {% endfor %}
  </ul>
</nav>
```

### Social Media Footer Component
```html
<div class="social-links">
  {% for platform_key, platform in navigation.social %}
    <a href="{{ platform.url }}" target="_blank">
      <img src="{{ platform.icon }}" alt="{{ platform.name }}">
    </a>
  {% endfor %}
</div>
```

### Partnership Logo Component
```html
<a href="{{ navigation.partnerships.corpaa.url }}" target="_blank">
  <img src="{{ navigation.partnerships.corpaa.logo }}" 
       alt="{{ navigation.partnerships.corpaa.name }}">
</a>
```

## URL Mapping Notes

### Original vs. Target URLs
- Original `/map/` for contact → Target `/contact/` (more semantic)
- Original "AMMENITIES" → Target "AMENITIES" (correct spelling)
- All other URLs remain consistent

### Active State Detection
Components can detect active pages using:
```html
{% if page.url == item.url %} class="active"{% endif %}
```

## Validation

After creating the file:
- [ ] JSON syntax is valid
- [ ] All URLs are correctly formatted 
- [ ] External links include proper protocols (https://)
- [ ] Image paths reference existing media files
- [ ] Menu order matches original site

## Accessibility Considerations

- All menu items include descriptive text
- External links will be marked appropriately
- Icons include alt text for screen readers
- Navigation includes proper ARIA labels

## Next Steps

After completing this file:
1. Proceed to `04-data-home.md` for home page specific content
2. This data will be used by main navigation and footer components
3. Components will access data via `{{ navigation.section_name }}`