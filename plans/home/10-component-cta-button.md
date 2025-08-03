# Component: CTA Button

**Phase**: 3 - Page-Specific Components  
**File**: `src/_includes/components/cta-button.html`  
**Purpose**: Standardized call-to-action buttons with style variants  
**Dependencies**: None (self-contained)

## Overview

Create a flexible call-to-action button component that provides consistent styling and behavior across multiple pages. Supports different visual styles and link types (internal/external).

## Content Analysis

From the original site:
- **Primary CTA**: "LEARN MORE" button in hero section
- **Secondary CTAs**: Service section links
- **Styling**: Professional, aviation-appropriate design
- **Behavior**: Hover effects, clear interaction states

## Component Specification

### Template Location
```
src/_includes/components/cta-button.html
```

### Data Requirements (Props)
- `text` (string, required) - Button text content
- `url` (string, required) - Link destination
- `style` (string, optional) - Style variant ("primary", "secondary")
- `external` (boolean, optional) - External link flag
- `class` (string, optional) - Additional CSS classes

### Template Code
```html
{% comment %}
CTA Button Component

Standardized call-to-action button with multiple style variants.

Props:
- text: Button text content (required)
- url: Link destination (required)
- style: Style variant - "primary" (default) | "secondary"
- external: Boolean for external links (default: false)
- class: Additional CSS classes (optional)
- size: Size variant - "default" | "large" | "small" (optional)

Usage:
{% include "components/cta-button.html" with {
  text: "Learn More",
  url: "/services/",
  style: "primary"
} %}

{% include "components/cta-button.html" with {
  text: "Visit Partner Site",
  url: "https://example.com",
  external: true,
  style: "secondary"
} %}
{% endcomment %}

<a href="{{ url }}" 
   class="cta-button cta-button--{{ style | default('primary') }}{% if size %} cta-button--{{ size }}{% endif %}{% if class %} {{ class }}{% endif %}"
   {% if external %}target="_blank" rel="noopener noreferrer"{% endif %}
   {% if external %}aria-label="{{ text }} (opens in new window)"{% else %}aria-label="{{ text }}"{% endif %}>
  <span class="cta-button-text">{{ text }}</span>
  {% if external %}
    <span class="cta-button-icon" aria-hidden="true">↗</span>
  {% endif %}
</a>
```

## CSS Requirements

### Base Styles
```css
.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  min-height: 44px; /* Touch target size */
  gap: 0.5rem;
}

.cta-button:focus {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Primary style (default) */
.cta-button--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

.cta-button--primary:hover {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cta-button--primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* Secondary style */
.cta-button--secondary {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.cta-button--secondary:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cta-button--secondary:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* Size variants */
.cta-button--large {
  padding: 16px 32px;
  font-size: 1.125rem;
  min-height: 52px;
}

.cta-button--small {
  padding: 8px 16px;
  font-size: 0.875rem;
  min-height: 36px;
}

/* Button text and icon */
.cta-button-text {
  font-weight: inherit;
}

.cta-button-icon {
  font-size: 0.875em;
  opacity: 0.8;
}

/* Disabled state */
.cta-button:disabled,
.cta-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .cta-button {
    padding: 14px 20px;
    font-size: 1rem;
  }
  
  .cta-button--large {
    padding: 16px 24px;
    font-size: 1.125rem;
  }
  
  .cta-button--small {
    padding: 10px 16px;
    font-size: 0.875rem;
  }
}
```

## Usage Examples

### Hero Section CTA
```html
<!-- Primary call-to-action in hero -->
{% include "components/cta-button.html" with {
  text: "LEARN MORE",
  url: "/maintenance/",
  style: "primary",
  size: "large"
} %}
```

### Service Section CTA
```html
<!-- Secondary call-to-action in content -->
{% include "components/cta-button.html" with {
  text: "View Maintenance Services",
  url: "/maintenance/",
  style: "secondary"
} %}
```

### External Link CTA
```html
<!-- External partnership link -->
{% include "components/cta-button.html" with {
  text: "Visit Corporate Aviation Association",
  url: "https://www.corpaa.us/",
  external: true,
  style: "secondary"
} %}
```

### With Custom Styling
```html
<!-- With additional CSS class -->
{% include "components/cta-button.html" with {
  text: "Contact Us",
  url: "/contact/",
  style: "primary",
  class: "hero-cta"
} %}
```

## Accessibility Features

### Keyboard Navigation
- Focusable with keyboard navigation
- Clear focus indicators
- Proper focus management

### Screen Reader Support
- Descriptive `aria-label` attributes
- External link indication for screen readers
- Semantic link structure

### Touch Accessibility
- Minimum 44px touch target size
- Appropriate spacing between buttons
- Clear visual feedback on interaction

## Integration Points

### Hero Section
```html
<section class="hero-section">
  <h1>{{ hero.heading }}</h1>
  <p>{{ hero.description }}</p>
  {% include "components/cta-button.html" with hero.cta %}
</section>
```

### Service Preview Cards
```html
<div class="service-actions">
  {% include "components/cta-button.html" with service.cta %}
</div>
```

## Data Structure Examples

### Simple CTA Data
```json
{
  "cta": {
    "text": "Learn More",
    "url": "/services/",
    "style": "primary"
  }
}
```

### Complex CTA Data
```json
{
  "cta": {
    "text": "Download Brochure",
    "url": "https://example.com/brochure.pdf",
    "style": "secondary",
    "external": true,
    "size": "large"
  }
}
```

## Implementation Steps

### Step 1: Create Component Template
1. Create `src/_includes/components/cta-button.html`
2. Add template code with proper prop handling
3. Include accessibility attributes

### Step 2: Create Component CSS
1. Add styles to `src/css/components/cta-button.css`
2. Define all style and size variants
3. Include responsive breakpoints
4. Add interaction states (hover, focus, active)

### Step 3: Test Button Variants
1. Test primary and secondary styles
2. Verify all size variants
3. Test external link behavior
4. Check accessibility with screen readers

## Design System Integration

### Color Variables
```css
:root {
  --color-primary: #1e40af;
  --color-primary-dark: #1e3a8a;
  --color-white: #ffffff;
  --color-focus: #3b82f6;
}
```

### Typography Variables
```css
:root {
  --font-weight-semibold: 600;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-sm: 0.875rem;
}
```

## Validation Checklist

After implementation:
- [ ] All button styles render correctly
- [ ] Hover and focus states work properly
- [ ] External links open in new window
- [ ] Accessibility attributes are correct
- [ ] Touch targets meet minimum size requirements
- [ ] Responsive sizing works on mobile
- [ ] Integration with data structures works
- [ ] CSS follows design system patterns

## Performance Considerations

### CSS Efficiency
- Use efficient transform and box-shadow animations
- Optimize for 60fps animations
- Minimize layout thrashing

### Accessibility Performance
- Don't animate if user prefers reduced motion
- Ensure animations don't cause vestibular disorders

## Next Steps

After completing this component:
1. Proceed to `11-component-hero-section.md`
2. This component will be used in hero section and service previews
3. Test all variants thoroughly before integration