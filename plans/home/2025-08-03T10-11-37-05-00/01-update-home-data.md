# Update Home Data File

**File**: `src/data/home.json`
**Component**: Homepage content and structure
**Priority**: High

## Current State

The existing home.json contains placeholder content focused on "Amenities" rather than the main FBO services and company messaging.

## Required Changes

### SEO Updates
```json
{
  "seo": {
    "title": "HOME | falconairinc",
    "description": "Falcon Air Inc. - A Leading Fixed Base Operator at Lawrence Municipal Airport, North Andover, Massachusetts with over 40 years of aviation maintenance experience."
  }
}
```

### Hero Section
Update hero to match crawled content:
```json
{
  "hero": {
    "heading": "A Leading Fixed Base Operator",
    "subheading": "Falcon Air, Inc. strives to be the most innovative, efficient and knowledgeable FBO possible. Both the president and chief mechanic have over 40 years of industry related experience and continue to educate themselves on new techniques.",
    "background": {
      "type": "video",
      "video": "/videos/aviation-bg.mp4",
      "poster": "/images/aviation-poster.jpg",
      "blur": false
    },
    "cta": {
      "text": "LEARN MORE",
      "url": "/maintenance/"
    }
  }
}
```

### Company Information Section
Add company branding section:
```json
{
  "sections": {
    "company": {
      "name": "Falcon Air Inc.",
      "location": {
        "airport": "Lawrence Municipal Airport",
        "city": "North Andover",
        "state": "Massachusetts"
      },
      "phone": "978-689-4492",
      "experience": "40+ years"
    }
  }
}
```

### Gallery Section
Update gallery with aviation-focused images:
```json
{
  "gallery": {
    "heading": "Our Facility",
    "images": [
      {
        "src": "/images/aviation-hangar.jpg", 
        "alt": "Aircraft maintenance hangar"
      },
      {
        "src": "/images/runway-view.jpg",
        "alt": "Lawrence Municipal Airport runway"
      },
      {
        "src": "/images/aircraft-maintenance.jpg", 
        "alt": "Professional aircraft maintenance"
      },
      {
        "src": "/images/fbo-facility.jpg",
        "alt": "FBO customer facility"
      }
    ]
  }
}
```

### Partners Section
Update with aviation industry partners:
```json
{
  "partners": {
    "heading": "Industry Partners & Certifications",
    "logos": [
      {
        "src": "/images/faa-logo.png",
        "alt": "FAA - Federal Aviation Administration", 
        "name": "FAA",
        "url": "https://www.faa.gov/"
      },
      {
        "src": "/images/nbaa-logo.png",
        "alt": "NBAA - National Business Aviation Association",
        "name": "NBAA", 
        "url": "https://nbaa.org/"
      },
      {
        "src": "/images/corpaa-logo.jpg",
        "alt": "Corporate Aircraft Association",
        "name": "Corporate Aircraft Association",
        "url": "https://www.corpaa.us/"
      }
    ]
  }
}
```

## Implementation Notes

1. **Video Background**: The crawled site uses a video background - ensure video file is available or use a high-quality image as fallback
2. **Image Assets**: Gallery images need to be sourced/extracted from the original site
3. **Partner Logos**: Corporate Aircraft Association logo was identified in the crawled content
4. **Mobile Optimization**: Ensure video backgrounds work well on mobile or provide image fallbacks

## Dependencies

- Video file for hero background
- High-resolution partner logos 
- Gallery images from original site
- Updated TypeScript interfaces if needed

## Testing

- [ ] Hero section displays correctly with video/image background
- [ ] Company information renders properly
- [ ] Gallery images load and display responsively  
- [ ] Partner logos link correctly
- [ ] Mobile responsiveness maintained
- [ ] SEO metadata updated correctly