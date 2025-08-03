# Page Implementation: Home Page

**Phase**: 4 - Layout and Templates  
**File**: `src/index.md`  
**Purpose**: Home page Markdown file and final content integration  
**Dependencies**: `home.json`, `home.html` layout, all components

## Overview

Create the final home page implementation by updating the Markdown file to use the complete component system and data structure. This brings together all the components and data files into a functional home page.

## Current State Analysis

### Existing File
The current `src/index.md` file contains:
```markdown
---
layout: layouts/home.html
title: "{{ home.seo.title }}"
description: "{{ home.seo.description }}"
permalink: "/"
eleventyNavigation:
  key: Home
  order: 1
---

# {{ home.hero.heading }}

{{ home.hero.description }}

[{{ home.hero.cta.text }}]({{ home.hero.cta.url }})
```

## Updated Implementation

### File Location
```
src/index.md
```

### Updated Content
```markdown
---
layout: layouts/home.html
title: "{{ home.seo.title }}"
description: "{{ home.seo.description }}"
permalink: "/"
eleventyNavigation:
  key: Home
  order: 1
tags: pages
---

<!-- 
Home Page Content

This page uses the home layout which includes:
- Hero section with video background
- Company introduction sections
- Service previews
- Experience highlights

Content is driven by data files:
- home.json - Page-specific content
- company.json - Company information
- navigation.json - Navigation structure
- contact.json - Contact information
-->
```

## Home Layout Implementation

### File Location
```
src/_includes/layouts/home.html
```

### Layout Content
```html
{% comment %}
Home Page Layout

Extends base layout with home-specific sections and components.

Data dependencies:
- home: Home page content and configuration
- company: Company information
- navigation: Navigation structure

Components used:
- hero-section
- service-preview-card
- cta-button
{% endcomment %}

{% extends "layouts/base.html" %}

{% block bodyClass %}home-page{% endblock %}

{% block content %}
  <!-- Hero Section -->
  {% include "components/hero-section.html" with home.hero %}
  
  <!-- Main Content Sections -->
  <div class="home-content">
    
    <!-- Company Introduction Section -->
    <section class="company-intro section-padding">
      <div class="container">
        <div class="intro-content">
          <h2 class="section-heading">{{ home.sections.experience.heading }}</h2>
          <div class="experience-highlights">
            <ul class="highlights-list">
              {% for highlight in home.sections.experience.highlights %}
                <li class="highlight-item">
                  <span class="highlight-icon" aria-hidden="true">✓</span>
                  <span class="highlight-text">{{ highlight }}</span>
                </li>
              {% endfor %}
            </ul>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Services Preview Section -->
    <section class="services-preview section-padding bg-light">
      <div class="container">
        <div class="services-content">
          <h2 class="section-heading text-center">Our Services</h2>
          <div class="services-grid">
            <!-- Maintenance Service Preview -->
            <div class="service-item">
              {% include "components/service-preview-card.html" with home.sections.maintenance_preview %}
            </div>
            
            <!-- Additional service previews can be added here -->
          </div>
        </div>
      </div>
    </section>
    
    <!-- Welcome Section -->
    <section class="welcome-section section-padding">
      <div class="container">
        <div class="welcome-content text-center">
          <h2 class="section-heading">{{ home.sections.welcome.heading }}</h2>
          <p class="welcome-text">{{ home.sections.welcome.text }}</p>
          
          <!-- Contact CTA -->
          <div class="welcome-cta">
            {% include "components/cta-button.html" with {
              text: "Contact Us Today",
              url: "/contact/",
              style: "primary",
              size: "large"
            } %}
          </div>
        </div>
      </div>
    </section>
    
    <!-- Company Values Section -->
    <section class="company-values section-padding bg-primary text-white">
      <div class="container">
        <div class="values-content">
          <h2 class="section-heading text-center text-white">Why Choose {{ company.name }}?</h2>
          <div class="values-grid">
            {% for value in company.values %}
              <div class="value-item">
                <h3 class="value-heading">{{ value }}</h3>
              </div>
            {% endfor %}
          </div>
        </div>
      </div>
    </section>
    
  </div>
{% endblock %}

{% block scripts %}
<!-- Home page specific JavaScript -->
<script>
  // Initialize hero slideshow if present
  document.addEventListener('DOMContentLoaded', function() {
    // Hero slideshow is auto-initialized by component
    
    // Add any home-specific interactions here
    console.log('Home page loaded');
  });
</script>
{% endblock %}
```

## CSS Requirements

### Home Page Styles
```css
/* Home page specific styles */
.home-page {
  /* Page-specific styles */
}

/* Section Utilities */
.section-padding {
  padding: 4rem 0;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
}

.section-heading {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.2;
}

.text-center {
  text-align: center;
}

.text-white {
  color: white;
}

/* Background Variants */
.bg-light {
  background-color: var(--color-bg-light);
}

.bg-primary {
  background-color: var(--color-primary);
}

/* Company Introduction */
.company-intro {
  background-color: white;
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.highlights-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--color-bg-light);
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.highlight-item:hover {
  transform: translateY(-2px);
}

.highlight-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background-color: var(--color-success);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: bold;
}

.highlight-text {
  font-weight: 500;
  color: var(--color-text-primary);
}

/* Services Preview */
.services-preview {
  /* Styles handled by service-preview-card component */
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

/* Welcome Section */
.welcome-section {
  background-color: white;
}

.welcome-content {
  max-width: 600px;
  margin: 0 auto;
}

.welcome-text {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.welcome-cta {
  margin-top: 2rem;
}

/* Company Values */
.company-values {
  /* Background handled by utility class */
}

.values-content {
  text-align: center;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.value-item {
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.value-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-padding {
    padding: 2rem 0;
  }
  
  .section-heading {
    font-size: 2rem;
  }
  
  .highlights-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

## Content Verification

### Data File Integration
Ensure these data files are properly configured:

#### company.json
```json
{
  "name": "Falcon Air Inc.",
  "tagline": "A Leading Fixed Base Operator",
  "values": [
    "Most innovative FBO possible",
    "Efficient operations",
    "Knowledgeable expertise",
    "Continuous education and improvement"
  ]
}
```

#### home.json
```json
{
  "seo": {
    "title": "HOME | falconairinc",
    "description": "Falcon Air Inc. - A leading Fixed Base Operator at Lawrence Municipal Airport with over 40 years of aviation maintenance experience."
  },
  "hero": {
    // ... hero configuration
  },
  "sections": {
    "welcome": {
      "heading": "Welcome to Lawrence Municipal Airport",
      "text": "Falcon Air welcomes you to Lawrence Municipal Airport with comprehensive Fixed Base Operator services."
    },
    "maintenance_preview": {
      // ... maintenance preview data
    },
    "experience": {
      // ... experience data
    }
  }
}
```

## URL Structure Verification

### Eleventy Configuration
Ensure `.eleventy.js` is configured for proper URL generation:
```javascript
module.exports = function(eleventyConfig) {
  // Permalink configuration
  eleventyConfig.setDataDeepMerge(true);
  
  // URL transformation
  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    return new URL(url, base).toString();
  });
  
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    }
  };
};
```

## Implementation Steps

### Step 1: Update Home Page Markdown
1. Update `src/index.md` with simplified content
2. Verify front matter configuration
3. Add appropriate tags and navigation

### Step 2: Create Home Layout
1. Create `src/_includes/layouts/home.html`
2. Add complete home page structure
3. Include all necessary components

### Step 3: Add Home Page CSS
1. Create `src/css/pages/home.css`
2. Add home-specific styling
3. Include responsive breakpoints

### Step 4: Test Integration
1. Build site and verify home page renders
2. Test all components function correctly
3. Verify responsive design
4. Check accessibility features

## Testing Checklist

### Functional Testing
- [ ] Home page loads at root URL (`/`)
- [ ] Hero section displays with video/image background
- [ ] All text content displays correctly from data files
- [ ] Navigation works and shows active state for home
- [ ] CTA buttons link to correct pages
- [ ] Footer displays complete information

### Visual Testing
- [ ] Layout matches original design intent
- [ ] Responsive design works on all devices
- [ ] Typography hierarchy is correct
- [ ] Color scheme matches brand guidelines
- [ ] Images display properly

### Performance Testing
- [ ] Page loads in under 3 seconds
- [ ] Hero video doesn't block page rendering
- [ ] Images are optimized and lazy-loaded
- [ ] CSS and JavaScript are minified

### SEO Testing
- [ ] Title tag is correct
- [ ] Meta description is set
- [ ] Heading hierarchy is logical (H1, H2, H3)
- [ ] Alt text is provided for all images
- [ ] Structured data validates

### Accessibility Testing
- [ ] Keyboard navigation works throughout page
- [ ] Screen reader can navigate content
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators are visible
- [ ] Skip links function properly

## Final Integration

### Build Process
```bash
# Build the site
npm run build

# Start development server
npm start

# Test production build
npm run serve
```

### Deployment Checklist
- [ ] All data files are committed
- [ ] All component files are committed
- [ ] Layout files are committed
- [ ] CSS compilation works
- [ ] JavaScript bundling works
- [ ] Images are optimized
- [ ] Build process completes successfully

## Next Steps

After completing the home page implementation:
1. Proceed to `16-css-architecture.md` for styling organization
2. Test the complete home page thoroughly
3. Begin work on additional pages using established components
4. Consider implementing remaining pages (services, maintenance, etc.)