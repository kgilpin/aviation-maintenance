# Component: Main Navigation

**Phase**: 2 - Core Components  
**File**: `src/_includes/components/main-navigation.html`  
**Purpose**: Primary site navigation with active state management  
**Dependencies**: `navigation.json`, `phone-contact.html`

## Overview

Create the main site navigation component that displays menu items with active state detection and includes the phone contact component. Used on all pages with consistent styling and behavior.

## Content Analysis

From the original site navigation:
1. **FBO/PRICES** → `/services/`
2. **MAINTENANCE** → `/maintenance/`  
3. **AMENITIES** → `/amenities/`
4. **CONTACT** → `/contact/`
5. **AIRCRAFT FOR SALE** → `/for-sale/`
6. **REVIEWS** → `/reviews/`
7. **Phone**: 978-689-4492 (integrated in navigation)

## Component Specification

### Template Location
```
src/_includes/components/main-navigation.html
```

### Data Requirements
- `navigation.main[]` (array, required) - Menu items
- `page.url` (string, from Eleventy) - Current page URL for active states

### Template Code
```html
{% comment %}
Main Navigation Component

Primary site navigation with active state detection and phone integration.

Props:
- navigation.main: Array of navigation items
- page.url: Current page URL (from Eleventy context)

Usage:
{% include "components/main-navigation.html" %}
{% endcomment %}

<nav class="main-navigation" role="navigation" aria-label="Main navigation">
  <div class="nav-container">
    <ul class="nav-menu">
      {% for item in navigation.main %}
        <li class="nav-item">
          <a href="{{ item.url }}" 
             class="nav-link{% if page.url == item.url %} nav-link--active{% endif %}"
             {% if item.description %}title="{{ item.description }}"{% endif %}
             {% if item.url.startsWith('http') %}target="_blank" rel="noopener noreferrer"{% endif %}>
            {{ item.text }}
          </a>
        </li>
      {% endfor %}
    </ul>
    
    <div class="nav-contact">
      {% include "components/phone-contact.html" with {style: "navigation"} %}
    </div>
  </div>
  
  <!-- Mobile menu toggle -->
  <button class="nav-toggle" 
          aria-expanded="false" 
          aria-controls="nav-menu"
          aria-label="Toggle navigation menu">
    <span class="nav-toggle-bar"></span>
    <span class="nav-toggle-bar"></span>
    <span class="nav-toggle-bar"></span>
  </button>
</nav>
```

## CSS Requirements

### Base Styles
```css
.main-navigation {
  background-color: var(--color-nav-bg);
  border-bottom: 1px solid var(--color-nav-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-item {
  margin: 0;
}

.nav-link {
  display: block;
  padding: 1rem 1.5rem;
  color: var(--color-nav-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease, background-color 0.3s ease;
  border-radius: 4px;
}

.nav-link:hover {
  color: var(--color-nav-text-hover);
  background-color: var(--color-nav-hover-bg);
}

.nav-link--active {
  color: var(--color-nav-active);
  background-color: var(--color-nav-active-bg);
  font-weight: 600;
}

.nav-contact {
  margin-left: 2rem;
}

/* Mobile menu toggle */
.nav-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-toggle-bar {
  width: 25px;
  height: 3px;
  background-color: var(--color-nav-text);
  margin: 3px 0;
  transition: 0.3s;
}

/* Mobile responsive */
@media (max-width: 1024px) {
  .nav-link {
    padding: 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }
  
  .nav-container {
    flex-wrap: wrap;
  }
  
  .nav-menu {
    display: none;
    width: 100%;
    flex-direction: column;
    background-color: var(--color-nav-mobile-bg);
    border-top: 1px solid var(--color-nav-border);
    margin-top: 1rem;
  }
  
  .nav-menu.active {
    display: flex;
  }
  
  .nav-item {
    width: 100%;
    border-bottom: 1px solid var(--color-nav-border);
  }
  
  .nav-link {
    padding: 1rem;
    text-align: center;
  }
  
  .nav-contact {
    margin: 1rem 0;
    text-align: center;
  }
}
```

## JavaScript Requirements

### Mobile Menu Toggle
```javascript
// Mobile navigation toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      
      // Animate toggle bars
      navToggle.classList.toggle('active');
    });
  }
});
```

## Usage Examples

### Standard Usage
```html
<!-- In base layout -->
<header class="site-header">
  {% include "components/main-navigation.html" %}
</header>
```

### With Additional Context
```html
<!-- In specialized layouts -->
<div class="navigation-wrapper">
  {% include "components/main-navigation.html" %}
</div>
```

## Accessibility Features

### Keyboard Navigation
- All links are keyboard accessible
- Proper tab order maintained
- Focus indicators visible

### Screen Reader Support
- `role="navigation"` for semantic navigation
- `aria-label` for navigation landmark
- `aria-expanded` for mobile menu state
- Descriptive `title` attributes for menu items

### Mobile Accessibility
- Mobile menu toggle has proper ARIA attributes
- Menu state communicated to assistive technologies
- Touch-friendly click targets

## Active State Detection

### URL Matching Logic
```html
{% if page.url == item.url %} nav-link--active{% endif %}
```

### Advanced Matching (Optional)
```html
{% set isActive = page.url == item.url or (item.url != '/' and page.url.startsWith(item.url)) %}
<a class="nav-link{% if isActive %} nav-link--active{% endif %}">
```

## Integration Points

### Base Layout Integration
```html
<body>
  <header class="site-header">
    {% include "components/company-brand-header.html" %}
    {% include "components/main-navigation.html" %}
  </header>
  <main>{{ content | safe }}</main>
</body>
```

### Data Source
```json
// From navigation.json
{
  "main": [
    {
      "text": "FBO/PRICES",
      "url": "/services/",
      "description": "Fixed Base Operator services and pricing information"
    }
    // ... other menu items
  ]
}
```

## Implementation Steps

### Step 1: Create Component Template
1. Create `src/_includes/components/main-navigation.html`
2. Add template code with proper ARIA attributes
3. Include mobile menu toggle structure

### Step 2: Create Component CSS
1. Add styles to `src/css/components/main-navigation.css`
2. Include mobile responsive breakpoints
3. Define CSS custom properties for theming

### Step 3: Add JavaScript Behavior
1. Create `src/js/components/navigation.js`
2. Add mobile menu toggle functionality
3. Include keyboard interaction support

### Step 4: Test Navigation
1. Test all menu links work correctly
2. Verify active states display properly
3. Test mobile menu functionality
4. Validate keyboard navigation

## Validation Checklist

After implementation:
- [ ] All navigation links work correctly
- [ ] Active states display on current page
- [ ] Mobile menu toggles properly
- [ ] Phone contact component integrates correctly
- [ ] Keyboard navigation works
- [ ] Screen readers can navigate menu
- [ ] Responsive design works across devices
- [ ] Hover states function properly

## Performance Considerations

### CSS Optimization
- Use efficient selectors
- Minimize repaints on hover
- Optimize for mobile rendering

### JavaScript Efficiency
- Event delegation for better performance
- Debounce resize events if needed
- Minimal DOM manipulation

## Next Steps

After completing this component:
1. Proceed to `08-component-partnership-logo.md`
2. This component will be integrated into base layout
3. Test thoroughly before moving to next component