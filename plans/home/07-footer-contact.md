# Footer Contact Section

## Purpose
Provide comprehensive contact information and location details with visual map integration.

## Requirements

### Content
- **Google Maps embed**: Plymouth Municipal Airport location
- **Contact Information**:
  - Phone: (508) 746-5511
  - Email: yankeeaviation1@gmail.com
  - Address: 246 South Meadow Road, Gate 3, Plymouth Municipal Airport, Plymouth, MA 02360
- **Footer navigation menu**
- **Copyright notice**

### Design
- Two-column layout (map + contact info)
- Clean typography for contact details
- Proper spacing and alignment
- Footer navigation styling
- Responsive design with mobile stacking

### Technical Implementation
- Google Maps embed with proper API integration
- Clickable phone number and email links
- Structured data markup for address
- Footer navigation with proper links
- Mobile-responsive layout

### Data Structure
```json
{
  "footer_contact": {
    "map": {
      "embed_url": "[Google Maps embed URL]",
      "location": "Plymouth Municipal Airport"
    },
    "contact": {
      "phone": "(508) 746-5511",
      "email": "yankeeaviation1@gmail.com",
      "address": {
        "street": "246 South Meadow Road, Gate 3",
        "facility": "Plymouth Municipal Airport",
        "city": "Plymouth",
        "state": "MA",
        "zip": "02360"
      }
    },
    "footer_nav": [
      {"text": "Home", "link": "/"},
      {"text": "About", "link": "/about"},
      {"text": "Services", "link": "/services"},
      {"text": "Contact", "link": "/contact"}
    ],
    "copyright": "© 2024 Yankee Aviation Services"
  }
}
```

### Accessibility Requirements
- Alt text for map iframe
- Proper heading hierarchy
- ARIA labels for contact links
- Keyboard navigation support