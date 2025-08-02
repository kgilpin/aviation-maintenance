# FBO Services Layout Template

## Overview
Define the layout template structure for the FBO services page, following the established pattern from the flight training page.

## Template Structure
```
fbo-services.html (extends base.html)
├── Hero Section (full viewport)
├── Main Content Container
│   ├── Fueling & Oil Services
│   ├── Titan Fuel Partnership  
│   ├── Jet Services
│   └── Lounge & Concierge
```

## Section Layout Patterns
1. **Hero Section**: Full-width background image with overlay
2. **Content Sections**: Alternating two-column layouts
   - **Pattern A**: Content left, image right
   - **Pattern B**: Image left, content right
3. **Section Spacing**: Consistent padding and margins
4. **Container**: Responsive max-width containers

## Responsive Behavior  
- **Desktop**: Two-column grid layouts
- **Tablet**: Adjusted column ratios and spacing
- **Mobile**: Single-column stack with proper image sizing

## Template Inheritance
- **Base Template**: `src/_includes/layouts/base.html`
- **Block Structure**: Use content blocks for flexible layout
- **Meta Tags**: FBO-specific title, description, and social media tags
- **Navigation**: Active state for FBO Services menu item

## CSS Classes to Utilize
- `hero-section` - Full viewport hero with background image
- `section-container` - Consistent page containers  
- `green-section` - Optional branded sections
- `service-item` and `service-item.reverse` - Alternating layouts
- Existing Tailwind utility classes for spacing and typography

## Content Injection Method
- Static content in template (following flight training pattern)
- Potential future enhancement: Move to data files
- Consistent with existing page structure approach

## Technical Requirements
- **File Path**: `src/_includes/layouts/fbo-services.html`
- **Page File**: `src/fbo-services.md` with front matter
- **URL Structure**: `/fbo-services/`
- **Navigation Integration**: Already exists in navigation.json