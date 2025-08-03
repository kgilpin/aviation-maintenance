# Component: Phone Contact

**Phase**: 2 - Core Components  
**File**: `src/_includes/components/phone-contact.html`  
**Purpose**: Display clickable phone number with multiple style variations  
**Dependencies**: `contact.json`

## Overview

Create a flexible phone contact component that can display phone numbers in different styles across the site. Used in navigation, headers, and contact sections with consistent functionality.

## Content Analysis

From the original site:
- **Phone Number**: "978-689-4492" appears prominently in navigation
- **Display Format**: Sometimes shown as "(978) 689-4492" 
- **Functionality**: Clickable tel: links for mobile users
- **Contexts**: Navigation bar, contact sections, headers

## Component Specification

### Template Location
```
src/_includes/components/phone-contact.html
```

### Data Requirements
- `contact.phone.display` (string, required) - Formatted display number
- `contact.phone.tel` (string, required) - Tel link format
- `style` parameter (string, optional) - Style variant

### Template Code
```html
{% comment %}
Phone Contact Component

Displays clickable phone number with multiple style variants.

Props:
- contact.phone.display: Phone number formatted for display
- contact.phone.tel: Phone number for tel: links
- style: Style variant ("navigation", "contact", "large", default: "default")
- class: Additional CSS classes (optional)

Usage:
{% include "components/phone-contact.html" %}
{% include "components/phone-contact.html" with {style: "navigation"} %}
{% include "components/phone-contact.html" with {style: "contact", class: "header-phone"} %}
{% endcomment %}

<div class="phone-contact phone-contact--{{ style | default('default') }}{% if class %} {{ class }}{% endif %}">
  <a href="tel:{{ contact.phone.tel }}" 
     class="phone-link"
     aria-label="Call {{ contact.phone.display }}">
    <span class="phone-number">{{ contact.phone.display }}</span>
  </a>
</div>
```

## CSS Requirements

### Base Styles
```css
.phone-contact {
  display: inline-block;
}

.phone-link {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.phone-link:hover {
  color: var(--color-primary);
}

.phone-number {
  font-weight: 600;
}

/* Navigation variant */
.phone-contact--navigation {
  font-size: 1rem;
}

.phone-contact--navigation .phone-link {
  color: var(--color-nav-text);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: var(--color-nav-phone-bg);
}

.phone-contact--navigation .phone-link:hover {
  background-color: var(--color-nav-phone-hover);
}

/* Contact page variant */
.phone-contact--contact {
  font-size: 1.25rem;
}

.phone-contact--contact .phone-number {
  color: var(--color-text-primary);
}

/* Large display variant */
.phone-contact--large {
  font-size: 1.5rem;
}

.phone-contact--large .phone-number {
  font-weight: 700;
  color: var(--color-primary);
}

/* Default variant */
.phone-contact--default .phone-number {
  color: var(--color-text-primary);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .phone-contact--navigation {
    font-size: 0.9rem;
  }
  
  .phone-contact--large {
    font-size: 1.25rem;
  }
}
```

## Usage Examples

### In Navigation
```html
<!-- Primary navigation phone display -->
{% include "components/phone-contact.html" with {style: "navigation"} %}
```

### In Header
```html
<!-- Header contact information -->
{% include "components/phone-contact.html" with {style: "large", class: "header-contact"} %}
```

### In Contact Sections
```html
<!-- Contact page phone display -->
{% include "components/phone-contact.html" with {style: "contact"} %}
```

### Default Usage
```html
<!-- Standard phone display -->
{% include "components/phone-contact.html" %}
```

## Accessibility Features

### Screen Reader Support
- Proper `aria-label` describes the action ("Call [phone number]")
- Semantic link structure with `tel:` protocol
- Clear indication this is a phone contact

### Mobile Optimization
- `tel:` links automatically open phone app on mobile devices
- Touch-friendly click targets
- Appropriate font sizes for mobile interaction

## Implementation Steps

### Step 1: Create Component File
1. Create `src/_includes/components/phone-contact.html`
2. Add template code with proper documentation
3. Include parameter validation

### Step 2: Create Component CSS
1. Add styles to `src/css/components/phone-contact.css`
2. Define all style variants
3. Include responsive breakpoints
4. Use CSS custom properties

### Step 3: Test Variants
1. Test each style variant individually
2. Verify tel: links work on mobile
3. Check hover states and interactions
4. Validate accessibility with screen readers

## Integration Points

### Navigation Component
```html
<!-- In main navigation -->
<nav class="main-navigation">
  <!-- menu items -->
  {% include "components/phone-contact.html" with {style: "navigation"} %}
</nav>
```

### Header Layout
```html
<!-- In site header -->
<header class="site-header">
  {% include "components/company-brand-header.html" %}
  {% include "components/phone-contact.html" with {style: "large"} %}
</header>
```

## Data Source

### From contact.json
```json
{
  "phone": {
    "display": "(978) 689-4492",
    "tel": "978-689-4492"
  }
}
```

## Design Variations

### Style Variants
- **navigation**: Compact, styled for menu bar
- **contact**: Medium size for contact pages  
- **large**: Prominent display for headers
- **default**: Standard inline display

### Visual Hierarchy
- Navigation variant blends with menu styling
- Large variant draws attention in headers
- Contact variant balances prominence with readability

## Validation Checklist

After implementation:
- [ ] Component renders all style variants correctly
- [ ] Phone number displays from data file
- [ ] Tel: links work on mobile devices
- [ ] Hover states function properly
- [ ] Responsive sizing works across devices
- [ ] Accessibility labels are correct
- [ ] CSS custom properties work with theme

## Error Handling

### Missing Data Graceful Degradation
```html
{% if contact.phone and contact.phone.display %}
  <!-- Phone component -->
{% else %}
  <!-- Fallback or empty state -->
{% endif %}
```

## Next Steps

After completing this component:
1. Proceed to `07-component-main-navigation.md`
2. This component will be integrated into navigation and header layouts
3. Test all variants before proceeding to next component