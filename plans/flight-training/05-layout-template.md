# Flight Training Layout Template Plan

## Overview
Create the dedicated layout template for the flight training page that combines all sections into a cohesive page structure.

## Template Structure

### File Location
`src/_includes/layouts/flight-training.html`

### Template Sections
1. **Extends base layout** - Inherits site header, footer, and basic structure
2. **Hero Section** - Full-width aircraft pre-flight image with title
3. **Discovery Flight** - Side-by-side content and image section
4. **Flight Training Rates** - Green background three-column pricing
5. **Meet Our Instructors** - Alternating instructor profiles

### Data Dependencies
- `instructors.json` - For instructor profiles loop
- `aircraft.json` - For discovery flight and aircraft rates
- Site-wide data (company, navigation) from base layout

## Technical Implementation

### Layout Inheritance
```nunjucks
{% extends "layouts/base.html" %}

{% block content %}
  <!-- Flight training specific content -->
{% endblock %}
```

### Section Organization
- Each major section as separate template block or include
- Consistent spacing and container classes
- Proper semantic HTML structure
- Accessibility considerations

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Image optimization and lazy loading
- Touch-friendly interactive elements

## CSS Integration

### Styling Approach
- Extend existing site styles from `style.css`
- Add flight-training specific classes
- Green brand color for rates section
- Alternating layout classes for instructors

### Key Style Classes
- `.hero-flight-training` - Hero section styling
- `.discovery-flight` - Two-column layout
- `.flight-rates` - Green background section
- `.instructor-profile` - Base instructor layout
- `.instructor-reverse` - Alternating layout class

## Performance Considerations
- Image optimization and responsive images
- Lazy loading for instructor photos
- Minimal JavaScript requirements
- SEO-friendly semantic markup