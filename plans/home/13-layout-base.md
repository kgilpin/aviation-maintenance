# Layout: Base Template

**Phase**: 4 - Layout and Templates  
**File**: `src/_includes/layouts/base.html`  
**Purpose**: Foundation HTML layout template for all pages  
**Dependencies**: All core components (company-brand-header, main-navigation, etc.)

## Overview

Create the base HTML layout template that provides the foundation structure for all pages. This template includes the HTML document structure, meta tags, and universal components like header and footer.

## Template Structure Analysis

### Document Structure
- Standard HTML5 document structure
- Responsive viewport meta tag
- SEO-friendly meta tags
- Favicon integration
- CSS and JavaScript includes

### Universal Components
- Site header with company branding
- Main navigation
- Content area (block for page-specific content)
- Site footer with social links

## Implementation

### File Location
```
src/_includes/layouts/base.html
```

### Template Code
```html
{% comment %}
Base Layout Template

Foundation layout for all pages providing document structure and universal components.

Required data:
- title: Page title
- description: Page meta description
- company: Company information
- navigation: Navigation structure
- contact: Contact information

Usage:
{% extends "layouts/base.html" %}
{% block content %}
  <!-- Page-specific content -->
{% endblock %}
{% endcomment %}

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- SEO Meta Tags -->
  <title>{{ title }}{% if title != "HOME | falconairinc" %} | {{ company.name }}{% endif %}</title>
  <meta name="description" content="{{ description }}">
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="{{ title }}">
  <meta property="og:description" content="{{ description }}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ page.url | absoluteUrl(site.url) }}">
  <meta property="og:site_name" content="{{ company.name }}">
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ title }}">
  <meta name="twitter:description" content="{{ description }}">
  
  <!-- Favicon -->
  <link rel="icon" sizes="192x192" href="{{ media.media.branding.favicon.path }}" type="image/png">
  <link rel="shortcut icon" href="{{ media.media.branding.favicon.path }}" type="image/png">
  <link rel="apple-touch-icon" href="{{ media.media.branding.favicon.path }}" type="image/png">
  
  <!-- Preload Critical Resources -->
  <link rel="preload" href="/css/main.css" as="style">
  <link rel="preload" href="/js/main.js" as="script">
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="/css/main.css">
  
  <!-- Font Preloading (if using web fonts) -->
  <!-- <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"> -->
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "{{ company.name }}",
    "description": "{{ company.description }}",
    "url": "{{ site.url }}",
    "telephone": "{{ contact.phone.tel }}",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "{{ contact.location.name }}",
      "addressLocality": "{{ contact.location.address.split(',')[0] }}",
      "addressRegion": "{{ contact.location.address.split(',')[1] | trim }}",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": {{ contact.location.coordinates.latitude }},
      "longitude": {{ contact.location.coordinates.longitude }}
    },
    "openingHours": "Mo-Fr 08:00-17:00",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": {{ contact.location.coordinates.latitude }},
        "longitude": {{ contact.location.coordinates.longitude }}
      },
      "geoRadius": "50"
    }
  }
  </script>
</head>

<body class="{% block bodyClass %}{% endblock %}">
  <!-- Skip to main content link for accessibility -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <!-- Site Header -->
  <header class="site-header" role="banner">
    <div class="header-container">
      <!-- Company Brand -->
      <div class="header-brand">
        {% include "components/company-brand-header.html" %}
      </div>
      
      <!-- Header Images and Partnerships -->
      <div class="header-media">
        {% include "components/header-image.html" with home.featured_images.calendar %}
        {% include "components/partnership-logo.html" with navigation.partnerships.corpaa %}
      </div>
    </div>
    
    <!-- Main Navigation -->
    {% include "components/main-navigation.html" %}
  </header>
  
  <!-- Main Content Area -->
  <main id="main-content" role="main">
    {% block content %}
      <!-- Page-specific content goes here -->
    {% endblock %}
  </main>
  
  <!-- Site Footer -->
  <footer class="site-footer" role="contentinfo">
    <div class="footer-container">
      <div class="footer-content">
        <!-- Company Information -->
        <div class="footer-company">
          <h3 class="footer-company-name">{{ company.name }}</h3>
          <p class="footer-tagline">{{ company.tagline }}</p>
          <address class="footer-address">
            {{ contact.location.name }}<br>
            {{ contact.location.address }}
          </address>
        </div>
        
        <!-- Contact Information -->
        <div class="footer-contact">
          <h3 class="footer-heading">Contact</h3>
          {% include "components/phone-contact.html" with {style: "contact"} %}
          {% if contact.mailing_address.po_box %}
            <address class="footer-mailing">
              {{ contact.mailing_address.po_box }}<br>
              {{ contact.mailing_address.city }}, {{ contact.mailing_address.state }}
            </address>
          {% endif %}
        </div>
        
        <!-- Services -->
        <div class="footer-services">
          <h3 class="footer-heading">Services</h3>
          <ul class="footer-service-list">
            {% for service in contact.services_available %}
              <li>{{ service }}</li>
            {% endfor %}
          </ul>
        </div>
      </div>
      
      <!-- Social Media and Copyright -->
      <div class="footer-bottom">
        {% include "components/social-media-footer.html" %}
        
        <div class="footer-copyright">
          <p>&copy; {{ "now" | date: "%Y" }} {{ company.name }}. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
  
  <!-- JavaScript -->
  <script src="/js/main.js" defer></script>
  
  <!-- Additional page-specific scripts -->
  {% block scripts %}{% endblock %}
</body>
</html>
```

## CSS Requirements

### Base Layout Styles
```css
/* Base layout styles */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 0 0 4px 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 0;
}

/* Site Header */
.site-header {
  background-color: var(--color-header-bg);
  border-bottom: 1px solid var(--color-border);
}

.header-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-brand {
  flex: 1;
}

.header-media {
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Main Content */
#main-content {
  min-height: 50vh;
}

/* Site Footer */
.site-footer {
  background-color: var(--color-footer-bg);
  color: var(--color-footer-text);
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

.footer-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-footer-border);
}

.footer-heading {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-footer-heading);
}

.footer-company-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.footer-tagline {
  font-style: italic;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.footer-address,
.footer-mailing {
  font-style: normal;
  line-height: 1.6;
  opacity: 0.8;
}

.footer-service-list {
  list-style: none;
  padding: 0;
}

.footer-service-list li {
  padding: 0.25rem 0;
  opacity: 0.8;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
}

.footer-copyright {
  opacity: 0.7;
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .header-media {
    flex-direction: column;
    gap: 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
```

## Features Included

### SEO Optimization
- Proper title tag structure
- Meta description integration
- Open Graph tags for social sharing
- Twitter Card support
- Structured data for local business

### Accessibility
- Skip to main content link
- Proper landmark roles (banner, main, contentinfo)
- Semantic HTML structure
- Screen reader friendly navigation

### Performance
- CSS and JavaScript preloading
- Deferred JavaScript loading
- Optimized font loading (when needed)

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Responsive navigation
- Touch-friendly interactions

## Usage Examples

### Standard Page Extension
```html
{% extends "layouts/base.html" %}

{% block content %}
<h1>Page Title</h1>
<p>Page content goes here.</p>
{% endblock %}
```

### With Custom Body Class
```html
{% extends "layouts/base.html" %}

{% block bodyClass %}about-page{% endblock %}

{% block content %}
<section class="about-intro">
  <h1>About Us</h1>
</section>
{% endblock %}
```

### With Additional Scripts
```html
{% extends "layouts/base.html" %}

{% block content %}
<!-- Page content -->
{% endblock %}

{% block scripts %}
<script src="/js/contact-form.js" defer></script>
{% endblock %}
```

## Implementation Steps

### Step 1: Create Base Layout File
1. Create `src/_includes/layouts/base.html`
2. Add complete template code
3. Include all meta tag configurations

### Step 2: Create Base Layout CSS
1. Add styles to `src/css/layouts/base.css`
2. Include responsive breakpoints
3. Define CSS custom properties

### Step 3: Test Base Layout
1. Create a simple test page extending base layout
2. Verify all components render correctly
3. Test responsive behavior
4. Validate HTML structure

### Step 4: Validate SEO and Accessibility
1. Test with accessibility tools
2. Validate structured data
3. Check meta tag generation
4. Test skip links and landmarks

## Integration Points

### Data Dependencies
- `company.json` - Company information
- `contact.json` - Contact details
- `navigation.json` - Navigation and social links
- `media.json` - Favicon and image references

### Component Dependencies
- `company-brand-header.html`
- `main-navigation.html`
- `phone-contact.html`
- `social-media-footer.html`
- `partnership-logo.html`

## Validation Checklist

After implementation:
- [ ] HTML validates semantically
- [ ] All meta tags generate correctly
- [ ] Favicon displays properly
- [ ] Navigation components integrate correctly
- [ ] Footer renders with all information
- [ ] Responsive design works on all devices
- [ ] Accessibility features function properly
- [ ] SEO structured data validates
- [ ] Skip links work correctly

## Next Steps

After completing this layout:
1. Proceed to `14-layout-home.md` for home page specific layout
2. This layout will be extended by all page templates
3. Test thoroughly before creating page-specific layouts