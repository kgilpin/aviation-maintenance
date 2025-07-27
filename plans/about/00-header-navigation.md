# Header Navigation Section

## Purpose
Provide site branding through logo display and primary navigation to key site sections, positioned above the hero section for optimal user experience.

## Requirements

### Content
- **Logo**: Yankee Aviation Services branded logo image
- **Navigation Menu Items**:
  - Home (/)
  - About (/about) - current page
  - Services (/services) 
  - Contact (/contact)
- **Company Name/Branding**: "YANKEE AVIATION SERVICES" text alongside logo

### Design
- Fixed header positioned above hero section
- Horizontal layout with logo on left, navigation on right
- Professional white/light background with subtle shadow
- Clean typography for navigation links
- Active state indication for current page (About)
- Hover effects for menu items
- Mobile-responsive with hamburger menu for small screens
- Consistent with aviation industry professional standards

### Technical Implementation
- Semantic HTML5 `<header>` and `<nav>` elements
- CSS Flexbox layout for horizontal alignment
- Logo image optimization for web
- Accessible navigation with proper ARIA labels
- Mobile-first responsive design
- Smooth hover transitions
- Active page highlighting for About

### User Experience
- Clear visual hierarchy with logo prominence
- Intuitive navigation placement (top-right)
- Touch-friendly menu items for mobile
- Fast loading optimized logo image
- Consistent navigation across all pages

### Data Structure
```json
{
  "site": {
    "name": "Yankee Aviation Services",
    "logo": {
      "src": "/images/logo.png",
      "alt": "Yankee Aviation Services Logo",
      "width": 120,
      "height": 60
    }
  },
  "navigation": {
    "primary": [
      {
        "text": "Home",
        "url": "/",
        "active": false
      },
      {
        "text": "About", 
        "url": "/about",
        "active": true
      },
      {
        "text": "Services",
        "url": "/services", 
        "active": false
      },
      {
        "text": "Contact",
        "url": "/contact",
        "active": false
      }
    ]
  }
}
```

### Accessibility Requirements
- Proper heading hierarchy (h1 for site name/logo)
- ARIA navigation landmark
- Keyboard navigation support
- Screen reader friendly link text
- Sufficient color contrast ratios
- Focus indicators for keyboard users

### Performance Considerations
- Optimized logo image (WebP format with PNG fallback)
- Minimal CSS and no JavaScript for basic functionality
- Critical CSS inlined for fast first paint
- Lazy loading for non-critical assets

### Integration Notes
- Header should be included in base layout template
- Navigation state management for active page highlighting
- Consistent across all site templates (home, about, services, contact)
- Logo should link to homepage
- Mobile breakpoint at 768px for hamburger menu transition