# Footer Contact Section

## Purpose
Provide comprehensive contact information, location details, and site navigation in a professional footer layout.

## Requirements

### Content
- **Company Information**: Yankee Aviation Services complete details
- **Contact Details**: 
  - Phone number with click-to-call functionality
  - Email address with mailto link
  - Physical address with formatting
- **Location Map**: Embedded Google Maps for Plymouth Municipal Airport
- **Hours of Operation**: Business hours display
- **Footer Navigation**: Duplicate main navigation for accessibility
- **Copyright**: Company copyright notice

### Design
- Multi-column layout with organized information sections
- Google Maps integration for location context
- Professional typography and spacing
- Consistent branding with header
- Mobile-responsive column stacking
- Dark or contrasting background for footer separation

### Technical Implementation
- CSS Grid or Flexbox for multi-column layout
- Google Maps embed with API integration
- Click-to-call and mailto link functionality
- Responsive breakpoints for mobile optimization
- Accessible navigation structure

### Data Structure
```json
{
  "footer": {
    "company": {
      "name": "Yankee Aviation Services",
      "address": {
        "street": "246 South Meadow Road, Gate 3",
        "city": "Plymouth", 
        "state": "MA",
        "zip": "02360",
        "airport": "Plymouth Municipal Airport"
      },
      "phone": "(508) 746-5511",
      "email": "yankeeaviation1@gmail.com",
      "hours": "Mon-Sat 8:00 AM - 4:30 PM, Closed Sunday"
    },
    "location": {
      "airport": "Plymouth Municipal Airport",
      "map_embed": "https://www.google.com/maps/embed...",
      "map_url": "https://www.google.com/maps/place/Plymouth+Municipal+Airport/",
      "coordinates": {
        "lat": "41.9095375",
        "lng": "-70.733003"
      }
    },
    "navigation": {
      "links": [
        {"text": "Home", "url": "/"},
        {"text": "About", "url": "/about"},
        {"text": "Services", "url": "/services", "active": true},
        {"text": "Contact", "url": "/contact"}
      ]
    },
    "copyright": "© 2024 Yankee Aviation Services. All rights reserved."
  }
}
```

### User Experience
- Easy access to contact information
- Visual location context with map
- Redundant navigation for user convenience
- Mobile-friendly contact actions (click-to-call)
- Professional closure to page experience

### Accessibility Requirements
- Proper heading hierarchy for footer sections
- ARIA landmarks for footer navigation
- Accessible map integration with alternative text
- Keyboard navigation support
- Screen reader friendly contact information
- High contrast text for readability

### Performance Considerations
- Optimized Google Maps loading
- Efficient CSS for layout
- Minimal JavaScript for map functionality
- Progressive enhancement for contact features
- Lazy loading for map content

### Integration Notes
- Consistent footer across all pages
- Google Maps API key management
- Contact information centralized in data files
- Mobile-first responsive design
- SEO-optimized contact information markup
- Analytics tracking for contact interactions