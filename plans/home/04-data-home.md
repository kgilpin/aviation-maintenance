# Data File: Home Page Content

**Phase**: 1 - Foundation  
**File**: `src/_data/home.json`  
**Purpose**: Store home page specific content and configuration  
**Dependencies**: media.json (for image references)

## Overview

Create a data file containing all home page specific content including hero section, SEO information, and page sections. This separates content from templates for easy maintenance.

## Content Analysis

From the crawled home page, extract:

### SEO Information
- **Title**: "HOME | falconairinc"
- **Meta Description**: Needs to be created based on page content

### Hero Section
- **Main Heading**: "A Leading Fixed Base Operator"
- **Description**: Full company description with experience emphasis
- **Call-to-Action**: "LEARN MORE" linking to maintenance page
- **Background**: Video with poster image fallback
- **Slideshow**: 4-slide carousel with auto-advance

### Content Sections
- **Welcome**: Introduction to Lawrence Municipal Airport
- **Maintenance Preview**: Service highlights with imagery
- **Experience**: 40+ years messaging with key points

## Implementation

### File Location
```
src/_data/home.json
```

### File Contents
```json
{
  "seo": {
    "title": "HOME | falconairinc",
    "description": "Falcon Air Inc. - A leading Fixed Base Operator at Lawrence Municipal Airport with over 40 years of aviation maintenance experience."
  },
  "hero": {
    "heading": "A Leading Fixed Base Operator",
    "description": "Falcon Air, Inc. strives to be the most innovative, efficient and knowledgeable FBO possible. Both the president and chief mechanic have over 40 years of industry related experience and continue to educate themselves on new techniques.",
    "cta": {
      "text": "LEARN MORE",
      "url": "/maintenance/",
      "style": "primary"
    },
    "background": {
      "type": "video",
      "poster": "/images/hero-background.jpg",
      "video_url": "",
      "fallback_image": "/images/hero-background.jpg"
    },
    "slideshow": {
      "enabled": true,
      "auto_advance": true,
      "duration": 5000,
      "slides": 4
    }
  },
  "sections": {
    "welcome": {
      "heading": "Welcome to Lawrence Municipal Airport",
      "text": "Falcon Air welcomes you to Lawrence Municipal Airport with comprehensive Fixed Base Operator services."
    },
    "maintenance_preview": {
      "heading": "Maintenance",
      "description": "Over 40 years industry experience, Falcon Air is proud to provide expert maintenance service.",
      "services": [
        "Annual Inspections",
        "Preventive Maintenance",
        "Repair Services", 
        "Expert Diagnostics"
      ],
      "image": "/images/ca1a47_111c812a88e04b5d8429a307aae04e76_mv2.jpg",
      "cta": {
        "text": "View Maintenance Services",
        "url": "/maintenance/",
        "style": "secondary"
      }
    },
    "experience": {
      "heading": "Four Decades of Excellence",
      "highlights": [
        "Over 40 years of industry experience",
        "Continuous education on new techniques", 
        "Expert president and chief mechanic",
        "Innovation-focused approach"
      ]
    }
  },
  "featured_images": {
    "calendar": {
      "src": "/images/ca1a47_16711deae98342edb7dc1cec4d866ca6_mv2.jpg",
      "alt": "Aviation calendar showing industry scheduling",
      "usage": "header_decoration"
    }
  }
}
```

## Data Structure Explanation

### SEO Object
- **title**: Page title for `<title>` tag and navigation
- **description**: Meta description for search engines

### Hero Object
- **heading**: Main H1 heading for the page
- **description**: Supporting paragraph text
- **cta**: Call-to-action button configuration
- **background**: Video/image background settings
- **slideshow**: Carousel behavior configuration

### Sections Object
- **welcome**: Introductory section content
- **maintenance_preview**: Service showcase content
- **experience**: Company experience messaging

### Featured Images
- References to specific images used on the home page
- Alt text and usage context for accessibility

## Usage in Components

### Hero Section Component
```html
<section class="hero-section">
  <h1>{{ home.hero.heading }}</h1>
  <p>{{ home.hero.description }}</p>
  {% include "components/cta-button.html" with home.hero.cta %}
</section>
```

### Service Preview Component
```html
{% include "components/service-preview-card.html" with home.sections.maintenance_preview %}
```

### Experience Section
```html
<section class="experience">
  <h2>{{ home.sections.experience.heading }}</h2>
  <ul>
  {% for highlight in home.sections.experience.highlights %}
    <li>{{ highlight }}</li>
  {% endfor %}
  </ul>
</section>
```

## Media Asset References

### Image Paths
All image paths reference files in `src/images/` that were extracted from the original site:
- **Hero Background**: `hero-background.jpg` 
- **Maintenance Image**: `ca1a47_111c812a88e04b5d8429a307aae04e76_mv2.jpg`
- **Calendar Image**: `ca1a47_16711deae98342edb7dc1cec4d866ca6_mv2.jpg`

### Video Background
- Currently empty `video_url` - will need video hosting solution
- Fallback to `poster` image if video unavailable

## Configuration Options

### Slideshow Settings
- **enabled**: Turn slideshow on/off
- **auto_advance**: Automatic slide progression  
- **duration**: Time between slides (milliseconds)
- **slides**: Number of slides in carousel

### CTA Styling
- **style**: "primary" or "secondary" button styling
- Consistent with design system

## Validation

After creating the file:
- [ ] JSON syntax is valid
- [ ] All image paths reference existing files
- [ ] Text content matches original site
- [ ] CTA URLs are correct
- [ ] Configuration values are reasonable

## Content Guidelines

### Text Content
- Preserve exact wording from original site
- Maintain business messaging hierarchy
- Keep technical aviation terminology

### Call-to-Action
- Clear, action-oriented text
- Links to relevant internal pages
- Consistent styling approach

## Next Steps

After completing this file:
1. Proceed to Phase 2 - Core Components starting with `05-component-company-brand-header.md`
2. This data will drive the home page layout and component content
3. Components will access data via `{{ home.section_name }}`