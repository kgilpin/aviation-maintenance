# Component: Company Brand Header

**Phase**: 2 - Core Components  
**File**: `src/_includes/components/company-brand-header.html`  
**Purpose**: Display company name and location consistently across all pages  
**Dependencies**: `company.json`

## Overview

Create a reusable component that displays the company name and location. This component appears on all 7 pages of the site and ensures consistent branding.

## Content Analysis

From the original site:
- **Company Name**: "Falcon Air Inc." (displayed in decorative script font)
- **Location**: "Lawrence Municipal Airport, North Andover, Massachusetts"
- **Styling**: Company name is prominent, location is secondary text

## Component Specification

### Template Location
```
src/_includes/components/company-brand-header.html
```

### Data Requirements
- `company.name` (string, required)
- `company.location` (string, required)

### Template Code
```html
{% comment %}
Company Brand Header Component

Displays company name and location consistently across all pages.

Props:
- company.name: Main company name
- company.location: Full location string

Usage:
{% include "components/company-brand-header.html" %}
{% endcomment %}

<div class="company-brand-header">
  <h1 class="company-name">{{ company.name }}</h1>
  <p class="company-location">{{ company.location }}</p>  
</div>
```

## CSS Requirements

### Base Styles
```css
.company-brand-header {
  text-align: center;
  margin-bottom: 1rem;
}

.company-name {
  font-family: var(--font-script, Georgia, serif);
  font-size: 2.5rem;
  font-weight: normal;
  color: var(--color-primary);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.company-location {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin: 0;
  font-weight: 400;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .company-name {
    font-size: 2rem;
  }
  
  .company-location {
    font-size: 0.9rem;
  }
}
```

## Usage Examples

### Basic Usage (Most Common)
```html
<!-- In layout templates -->
{% include "components/company-brand-header.html" %}
```

### With Custom Styling
```html
<!-- With additional CSS class -->
<div class="header-section">
  {% include "components/company-brand-header.html" %}
</div>
```

## Accessibility Features

### Semantic HTML
- Uses `<h1>` for company name (appropriate for page headers)
- Uses `<p>` for location (supporting information)
- Proper heading hierarchy maintained

### Screen Reader Support
- Text content is naturally accessible
- Logical reading order (name first, then location)

## Implementation Steps

### Step 1: Create Component File
1. Create `src/_includes/components/company-brand-header.html`
2. Add the template code above
3. Include proper Nunjucks comments for documentation

### Step 2: Create Component CSS
1. Add styles to `src/css/components/company-brand-header.css`
2. Include responsive breakpoints
3. Use CSS custom properties for theming

### Step 3: Test Component
1. Create a test page including the component
2. Verify data binding works correctly
3. Test responsive behavior
4. Validate HTML semantics

## Integration Points

### Used In Layouts
- **Base Layout**: Header section
- **All Page Templates**: Via base layout inheritance

### Data Source
```json
// From company.json
{
  "name": "Falcon Air Inc.",
  "location": "Lawrence Municipal Airport, North Andover, Massachusetts"
}
```

## Design Notes

### Typography Hierarchy
- Company name should be the most prominent text element
- Location provides context but doesn't compete visually
- Script font emphasizes craftsmanship and tradition

### Brand Consistency
- Maintains visual identity across all pages
- Consistent spacing and proportions
- Professional aviation industry appearance

## Validation Checklist

After implementation:
- [ ] Component renders without errors
- [ ] Company name displays correctly from data file
- [ ] Location text shows properly
- [ ] Responsive styling works on mobile
- [ ] Typography matches design intent
- [ ] Component works in base layout
- [ ] HTML validates semantically

## Future Enhancements

### Potential Extensions
- Add company logo image option
- Include tagline display capability
- Support for multiple location display
- Link integration for contact pages

### Styling Variations
- Alternative color schemes
- Different font treatments
- Compact display options

## Next Steps

After completing this component:
1. Proceed to `06-component-phone-contact.md`
2. This component will be integrated into base layout
3. Test rendering before moving to next component