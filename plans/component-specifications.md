# Falcon Air Component Specifications

**Created**: 2025-08-03T08:53:28,497047000-05:00  
**Purpose**: Technical specifications for reusable components across the Falcon Air website

## Component Interface Standards

### Data Props Convention
All components receive data through standardized props:
- **Required props**: Must be provided or component fails gracefully
- **Optional props**: Have sensible defaults
- **Variant props**: Control styling/behavior variations

### File Naming Convention
- **Templates**: `kebab-case.html` (e.g., `company-brand-header.html`)
- **CSS**: `kebab-case.css` (e.g., `company-brand-header.css`)  
- **JavaScript**: `kebab-case.js` (e.g., `hero-slideshow.js`)

## Core Component Specifications

### 1. Company Brand Header
**File**: `src/_includes/components/company-brand-header.html`

**Purpose**: Display company name and location consistently across all pages

**Data Requirements**:
```json
{
  "company": {
    "name": "string (required)",
    "location": "string (required)"
  }
}
```

**Template Interface**:
```html
{% comment %}
Props:
- company.name: Company name to display
- company.location: Location subtitle
{% endcomment %}

<div class="company-brand-header">
  <h1 class="company-name">{{ company.name }}</h1>
  <p class="company-location">{{ company.location }}</p>
</div>
```

**CSS Classes**:
- `.company-brand-header`: Container
- `.company-name`: Main company name (H1)
- `.company-location`: Location subtitle

---

### 2. Main Navigation
**File**: `src/_includes/components/main-navigation.html`

**Purpose**: Primary site navigation with active state management

**Data Requirements**:
```json
{
  "navigation": {
    "main": [
      {
        "text": "string (required)",
        "url": "string (required)", 
        "description": "string (optional)"
      }
    ]
  }
}
```

**Template Interface**:
```html
{% comment %}
Props:
- navigation.main: Array of navigation items
- page.url: Current page URL for active state
{% endcomment %}

<nav class="main-navigation" role="navigation" aria-label="Main navigation">
  <ul class="nav-menu">
  {% for item in navigation.main %}
    <li class="nav-item">
      <a href="{{ item.url }}" 
         class="nav-link{% if page.url == item.url %} nav-link--active{% endif %}"
         {% if item.description %}title="{{ item.description }}"{% endif %}>
        {{ item.text }}
      </a>
    </li>
  {% endfor %}
  </ul>
</nav>
```

**CSS Classes**:
- `.main-navigation`: Navigation container
- `.nav-menu`: Unordered list
- `.nav-item`: List item
- `.nav-link`: Navigation link
- `.nav-link--active`: Active state modifier

---

### 3. Phone Contact
**File**: `src/_includes/components/phone-contact.html`

**Purpose**: Display clickable phone number with style variations

**Data Requirements**:
```json
{
  "contact": {
    "phone": {
      "display": "string (required) - formatted for display",
      "tel": "string (required) - tel: link format"
    }
  }
}
```

**Template Interface**:
```html
{% comment %}
Props:
- contact.phone.display: Phone number as displayed to user
- contact.phone.tel: Phone number for tel: link
- style: "navigation" | "contact" | "large" (optional, default: "default")
{% endcomment %}

<div class="phone-contact phone-contact--{{ style | default('default') }}">
  <a href="tel:{{ contact.phone.tel }}" 
     class="phone-link"
     aria-label="Call {{ contact.phone.display }}">
    {{ contact.phone.display }}
  </a>
</div>
```

**CSS Classes**:
- `.phone-contact`: Container
- `.phone-contact--navigation`: Navigation style variant
- `.phone-contact--contact`: Contact page style variant  
- `.phone-contact--large`: Large display variant
- `.phone-link`: Clickable phone link

---

### 4. CTA Button
**File**: `src/_includes/components/cta-button.html`

**Purpose**: Standardized call-to-action buttons with style variants

**Data Requirements**:
```json
{
  "text": "string (required)",
  "url": "string (required)",
  "style": "string (optional): primary | secondary",
  "external": "boolean (optional)"
}
```

**Template Interface**:
```html
{% comment %}
Props:
- text: Button text content
- url: Link destination
- style: "primary" | "secondary" (optional, default: "primary")  
- external: Boolean for external links (optional, default: false)
- class: Additional CSS classes (optional)
{% endcomment %}

<a href="{{ url }}" 
   class="cta-button cta-button--{{ style | default('primary') }}{% if class %} {{ class }}{% endif %}"
   {% if external %}target="_blank" rel="noopener noreferrer"{% endif %}
   {% if external %}aria-label="{{ text }} (opens in new window)"{% else %}aria-label="{{ text }}"{% endif %}>
  {{ text }}
</a>
```

**CSS Classes**:
- `.cta-button`: Base button styles
- `.cta-button--primary`: Primary style (filled)
- `.cta-button--secondary`: Secondary style (outlined)

---

### 5. Hero Section
**File**: `src/_includes/components/hero-section.html`

**Purpose**: Hero section with video background and slideshow capability

**Data Requirements**:
```json
{
  "hero": {
    "heading": "string (required)",
    "description": "string (required)",
    "cta": {
      "text": "string (required)",
      "url": "string (required)"
    },
    "background": {
      "type": "string: video | image",
      "poster": "string (required if video)",
      "video_url": "string (required if video)",
      "fallback_image": "string (required)"
    },
    "slideshow": {
      "enabled": "boolean (optional)",
      "auto_advance": "boolean (optional)",
      "duration": "number (optional)"
    }
  }
}
```

**Template Interface**:
```html
{% comment %}
Props:
- hero: Complete hero section data object
{% endcomment %}

<section class="hero-section" 
         role="banner"
         {% if hero.slideshow.enabled %}data-slideshow="true"{% endif %}>
  
  {% if hero.background.type == "video" %}
    <div class="hero-background hero-background--video">
      <video class="hero-video" 
             autoplay muted loop 
             poster="{{ hero.background.poster }}"
             aria-hidden="true">
        <source src="{{ hero.background.video_url }}" type="video/mp4">
      </video>
    </div>
  {% else %}
    <div class="hero-background hero-background--image" 
         style="background-image: url('{{ hero.background.fallback_image }}')">
    </div>
  {% endif %}
  
  <div class="hero-content">
    <h1 class="hero-heading">{{ hero.heading }}</h1>
    <p class="hero-description">{{ hero.description }}</p>
    
    {% include "components/cta-button.html" with hero.cta %}
  </div>
  
  {% if hero.slideshow.enabled %}
    <div class="hero-controls" aria-label="Slideshow controls">
      <button class="hero-control hero-control--prev" aria-label="Previous slide">‹</button>
      <button class="hero-control hero-control--next" aria-label="Next slide">›</button>
    </div>
  {% endif %}
</section>
```

**CSS Classes**:
- `.hero-section`: Main container
- `.hero-background`: Background container
- `.hero-background--video`: Video background variant
- `.hero-background--image`: Image background variant
- `.hero-video`: Video element
- `.hero-content`: Text content container
- `.hero-heading`: Main heading
- `.hero-description`: Description text
- `.hero-controls`: Slideshow controls container
- `.hero-control`: Control button base
- `.hero-control--prev`: Previous button
- `.hero-control--next`: Next button

---

### 6. Service Preview Card
**File**: `src/_includes/components/service-preview-card.html`

**Purpose**: Display service information with optional image and CTA

**Data Requirements**:
```json
{
  "heading": "string (required)",
  "description": "string (required)",
  "image": "string (optional)", 
  "services": ["string"] (optional),
  "cta": {
    "text": "string (optional)",
    "url": "string (optional)"
  }
}
```

**Template Interface**:
```html
{% comment %}
Props:
- heading: Service section heading
- description: Service description text
- image: Service image URL (optional)
- services: Array of service items (optional)
- cta: Call-to-action object (optional)
{% endcomment %}

<article class="service-preview-card">
  {% if image %}
    <div class="service-image">
      <img src="{{ image }}" 
           alt="{{ heading }} service illustration" 
           loading="lazy">
    </div>
  {% endif %}
  
  <div class="service-content">
    <h3 class="service-heading">{{ heading }}</h3>
    <p class="service-description">{{ description }}</p>
    
    {% if services and services.length > 0 %}
      <ul class="service-list">
      {% for service in services %}
        <li class="service-item">{{ service }}</li>
      {% endfor %}
      </ul>
    {% endif %}
    
    {% if cta and cta.text and cta.url %}
      {% include "components/cta-button.html" with cta %}
    {% endif %}
  </div>
</article>
```

**CSS Classes**:
- `.service-preview-card`: Card container
- `.service-image`: Image container
- `.service-content`: Text content container
- `.service-heading`: Service heading
- `.service-description`: Service description
- `.service-list`: Services list
- `.service-item`: Individual service item

---

### 7. Partnership Logo
**File**: `src/_includes/components/partnership-logo.html`

**Purpose**: Display external partnership logos with links

**Data Requirements**:
```json
{
  "partnership": {
    "name": "string (required)",
    "url": "string (required)",
    "logo": "string (required)"
  }
}
```

**Template Interface**:
```html
{% comment %}
Props:
- partnership: Partnership data object
{% endcomment %}

<div class="partnership-logo">
  <a href="{{ partnership.url }}" 
     target="_blank" 
     rel="noopener noreferrer"
     class="partnership-link"
     aria-label="Visit {{ partnership.name }} website (opens in new window)">
    <img src="{{ partnership.logo }}" 
         alt="{{ partnership.name }} logo"
         class="partnership-image"
         loading="lazy">
  </a>
</div>
```

**CSS Classes**:
- `.partnership-logo`: Container
- `.partnership-link`: Link wrapper
- `.partnership-image`: Logo image

---

### 8. Social Media Footer
**File**: `src/_includes/components/social-media-footer.html`

**Purpose**: Social media links in footer

**Data Requirements**:
```json
{
  "navigation": {
    "social": {
      "platform_name": {
        "name": "string (required)",
        "url": "string (required)",
        "icon": "string (required)"
      }
    }
  }
}
```

**Template Interface**:
```html
{% comment %}
Props:
- navigation.social: Object containing social media platforms
{% endcomment %}

<div class="social-media-footer">
  {% for platform_key, platform in navigation.social %}
    <a href="{{ platform.url }}" 
       target="_blank" 
       rel="noopener noreferrer"
       class="social-link"
       aria-label="Follow us on {{ platform.name }} (opens in new window)">
      <img src="{{ platform.icon }}" 
           alt="{{ platform.name }} icon"
           class="social-icon">
    </a>
  {% endfor %}
</div>
```

**CSS Classes**:
- `.social-media-footer`: Container
- `.social-link`: Individual social link
- `.social-icon`: Social platform icon

## Component Usage Examples

### Basic Usage
```html
<!-- Simple component inclusion -->
{% include "components/company-brand-header.html" %}

<!-- Component with data -->
{% include "components/phone-contact.html" with {style: "navigation"} %}

<!-- Component with complex data -->
{% include "components/service-preview-card.html" with home.sections.maintenance_preview %}
```

### Advanced Usage
```html
<!-- Component with conditional data -->
{% if hero.slideshow.enabled %}
  {% include "components/hero-section.html" with hero %}
{% endif %}

<!-- Component with dynamic styling -->
{% include "components/cta-button.html" with {
  text: "Learn More",
  url: "/services/",
  style: "primary",
  class: "hero-cta"
} %}
```

## Testing Requirements

### Component Testing Checklist
- [ ] **Data validation**: Component handles missing/invalid props gracefully
- [ ] **Accessibility**: Proper ARIA labels, semantic HTML, keyboard navigation
- [ ] **Responsive**: Component works on mobile, tablet, desktop
- [ ] **Performance**: Lazy loading, optimized images, minimal DOM
- [ ] **Cross-browser**: Works in major browsers (Chrome, Firefox, Safari, Edge)

### Visual Regression Testing
- Component renders consistently across different data inputs
- Styling variations work as expected
- Responsive breakpoints function properly

This specification ensures all components are built consistently and can be reliably reused across the entire Falcon Air website.