# Navigation Cards Section

## Purpose
Visual navigation to main site areas, providing an intuitive way for users to explore key sections.

## Requirements

### Content
- **Three main cards**: ABOUT, SERVICES, CONTACT
- Each card should have:
  - Background image relevant to the section
  - Overlay text with section name
  - Click action to navigate to respective page

### Design
- Clean grid layout (3 columns on desktop, stacked on mobile)
- Image cards with text overlay
- Hover effects for interactivity
- Consistent spacing and alignment
- Responsive design

### Technical Implementation
- CSS Grid or Flexbox layout
- Image optimization for web
- Hover animations
- Links to About, Services, and Contact pages
- Touch-friendly for mobile devices

### Data Structure
```json
{
  "navigation_cards": [
    {
      "title": "ABOUT",
      "image": "/images/nav-about.jpg",
      "link": "/about"
    },
    {
      "title": "SERVICES",
      "image": "/images/nav-services.jpg",
      "link": "/services"
    },
    {
      "title": "CONTACT",
      "image": "/images/nav-contact.jpg",
      "link": "/contact"
    }
  ]
}
```