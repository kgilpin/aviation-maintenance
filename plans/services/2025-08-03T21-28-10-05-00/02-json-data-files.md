# JSON Data Files for Services Page

## Overview

Create structured JSON data files to store services page content, extracting exact content from the crawled live site to ensure accuracy and consistency.

## New Data Files Required

### 1. Services Page Data File (`src/data/services.json`)

```json
{
  "hero": {
    "title": "Services",
    "backgroundImage": "/images/services-hero-bg.jpg"
  },
  "servicesContent": {
    "heading": "A Wide Range of Cost-Effective Aircraft Maintenance Services",
    "subheading": "Since 1977, we have been providing assistance with aviation maintenance for our clients. Our specialty services include:",
    "description": "",
    "services": [
      {
        "id": "annual-inspection",
        "title": "Annual inspection of single-engine and multi-engine aircraft, including experimental aircraft",
        "description": "Comprehensive annual inspections ensuring your aircraft meets all FAA requirements for continued airworthiness.",
        "icon": "checkmark",
        "featured": true
      },
      {
        "id": "engine-overhaul",
        "title": "Engine overhaul",
        "description": "Complete engine overhaul services to restore your aircraft engine to peak performance and reliability.",
        "icon": "checkmark",
        "featured": true
      },
      {
        "id": "aircraft-ferrying",
        "title": "Aircraft ferrying service for out-of-town and out-of-state customers",
        "description": "Professional aircraft ferrying services to transport your aircraft safely to our facility or your desired location.",
        "icon": "checkmark",
        "featured": true
      },
      {
        "id": "experimental-certification",
        "title": "Certification of \"experimental\" amateur-built aircrafts",
        "description": "Specialized certification services for experimental and amateur-built aircraft to meet FAA requirements.",
        "icon": "checkmark",
        "featured": true
      }
    ],
    "image": "/images/20200531_191924_resized-scaled.jpg",
    "imageAlt": "Aircraft maintenance work being performed at Yankee Aviation facility"
  },
  "callToAction": {
    "heading": "Why Choose Us",
    "description": "We take pride in having a team of dedicated professionals who are experts in aviation maintenance. You can trust that we're here to offer efficient assistance and unparalleled customer service.",
    "buttonText": "Contact Us",
    "buttonLink": "/contact",
    "backgroundImage": "/images/services-cta-bg.jpg",
    "imageAlt": "Professional aviation maintenance team at work"
  },
  "seoMeta": {
    "title": "Services - Yankee Aviation",
    "description": "Comprehensive aircraft maintenance services including annual inspections, engine overhauls, aircraft ferrying, and experimental aircraft certification. Serving New England since 1977.",
    "keywords": [
      "aircraft maintenance",
      "annual inspection", 
      "engine overhaul",
      "aircraft ferrying",
      "experimental aircraft certification",
      "Plymouth MA aviation services",
      "FAA certified maintenance",
      "general aviation services"
    ],
    "ogImage": "/images/services.jpg"
  }
}
```

## Implementation Notes

### Content Accuracy

The content has been extracted exactly from the live site crawl, maintaining:

- **Exact Service Titles**: Preserving the specific wording and punctuation from the original
- **Original Descriptions**: Using the live site's exact service descriptions
- **Proper Quotation Marks**: Maintaining the quotation marks around "experimental" as shown on live site
- **Accurate Timeline**: Preserving the "Since 1977" reference and company history

### Data Structure Decisions

- **Service IDs**: Generated from service titles for consistent referencing and future extensibility
- **Featured Services**: All four main services are marked as featured for primary display
- **Icon System**: Using consistent "checkmark" icons matching the live site design
- **Image References**: Using existing images from the crawled content where available

### Content Organization

- **Modular Structure**: Separate sections allow for independent updates and modifications
- **SEO Optimization**: Comprehensive meta data for search engine optimization
- **Accessibility**: Detailed image alt text for screen readers and assistive technology
- **Flexibility**: Structure supports future service additions or modifications

## Media Asset Requirements

### Images Needed from Crawl

1. **Main Content Image**: `/wp-content/uploads/2020/11/20200531_191924_resized-scaled.jpg`
   - **Target Path**: `/public/images/20200531_191924_resized-scaled.jpg`
   - **Usage**: Main services content section illustration
   - **Alt Text**: Aircraft maintenance work being performed at Yankee Aviation facility

2. **Services Background Image**: `/wp-content/uploads/2020/10/services.jpg`
   - **Target Path**: `/public/images/services.jpg`
   - **Usage**: Hero section background and SEO og:image
   - **Alt Text**: Professional aviation services background

3. **Background Images**: May need additional background images for hero and CTA sections
   - **Hero Background**: Can reuse services.jpg or find appropriate aircraft imagery
   - **CTA Background**: Professional aviation maintenance imagery with overlay capability

### Image Processing Requirements

- **Optimization**: Web-optimized formats and sizes for fast loading
- **Responsive Variants**: Multiple sizes for different viewport breakpoints
- **Accessibility**: Proper alt text and descriptive captions
- **Performance**: Lazy loading implementation for non-critical images

## Files to Create

- `src/data/services.json` - Complete services page content and metadata

## Data Validation Requirements

- All service items must have unique IDs within the services array
- Image paths must correspond to files that will exist in `/public/images/`
- Button links should be valid internal routes (e.g., `/contact`)
- SEO metadata should follow best practices:
  - Title under 60 characters
  - Description under 160 characters
  - Keywords relevant and not overstuffed
  - Open Graph image properly sized (1200x630px recommended)

## Integration Considerations

### Compatibility with Existing Data

- Maintains consistency with existing JSON file structure patterns
- Uses similar SEO metadata format as other pages
- Compatible with existing image path conventions
- Follows established naming and organization patterns

### Future Extensibility

- Service array can be easily extended with additional services
- Content sections support additional fields without breaking changes
- Image structure supports multiple formats and sizes
- SEO structure supports rich snippets and structured data

This data structure provides a solid foundation for the services page implementation while ensuring exact content accuracy from the live site and maintaining flexibility for future enhancements.