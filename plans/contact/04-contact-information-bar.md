# Contact Information Bar Section

## Purpose
Provide comprehensive contact details in an organized, accessible format with multiple contact methods.

## Requirements

### Content
- **Phone**: (508) 746-5511 with click-to-call functionality
- **Email**: yankeeaviation1@gmail.com with mailto link
- **Address**: 246 South Meadow Road, Gate 3, Plymouth Municipal Airport, Plymouth, MA 02360
- **Hours**: Mon - Sat: 8:00 AM - 4:30 PM, Sun: Closed
- **Icons**: Font Awesome icons for each contact method

### Design
- Four-column layout on desktop
- Responsive column stacking on mobile
- Icon-based visual organization
- Professional color scheme
- Consistent spacing and alignment
- Clear typography hierarchy

### Layout Structure
1. **Phone Column**: Phone icon + clickable phone number
2. **Email Column**: Envelope icon + clickable email address
3. **Address Column**: Map marker icon + clickable address (Google Maps link)
4. **Hours Column**: Clock icon + business hours display

### Technical Implementation
- CSS Grid or Flexbox for column layout
- Clickable phone links with tel: protocol
- Clickable email links with mailto: protocol
- Clickable address links to Google Maps
- Font Awesome icons for visual indicators
- Responsive breakpoints for mobile optimization

### Data Structure
```json
{
  "contact_info": {
    "phone": {
      "display": "(508) 746-5511",
      "link": "tel:+15087465511",
      "icon": "fas fa-phone",
      "label": "Phone"
    },
    "email": {
      "display": "yankeeaviation1@gmail.com",
      "link": "mailto:yankeeaviation1@gmail.com",
      "icon": "fas fa-envelope",
      "label": "Email"
    },
    "address": {
      "street": "246 South Meadow Road, Gate 3",
      "facility": "Plymouth Municipal Airport",
      "city": "Plymouth",
      "state": "MA",
      "zip": "02360",
      "full_display": "246 South Meadow Road, Gate 3, Plymouth Municipal Airport, Plymouth, MA 02360",
      "maps_link": "https://www.google.com/maps/place/Plymouth+Municipal+Airport/@41.909538,-70.733003,13z",
      "icon": "fas fa-map-marker-alt",
      "label": "Address"
    },
    "hours": {
      "weekdays": "Mon - Sat: 8:00 AM - 4:30 PM",
      "weekend": "Sun: Closed",
      "display": "Mon - Sat: 8:00 AM - 4:30 PM, Sun: Closed",
      "icon": "fas fa-clock",
      "label": "Hours"
    }
  }
}
```

### User Experience
- Multiple contact method options
- One-click contact actions (call, email, directions)
- Clear business hours visibility
- Professional presentation
- Mobile-friendly interaction
- Scannable information layout

### Accessibility Requirements
- Proper heading structure for each contact method
- Screen reader friendly link descriptions
- ARIA labels for icon-only elements
- High contrast color schemes
- Keyboard navigation support
- Focus indicators for interactive elements

### Performance Considerations
- Efficient icon font loading
- Minimal CSS for layout
- Fast rendering contact information
- Optimized for mobile performance
- Critical CSS for above-the-fold content

### Mobile Responsiveness
- Single column stacking on small screens
- Touch-friendly contact links
- Readable font sizes on mobile
- Proper spacing for finger interaction
- Horizontal scrolling prevention

### Interactive Features
- **Phone Link**: Direct dialing on mobile devices
- **Email Link**: Opens default email client with pre-filled recipient
- **Address Link**: Opens Google Maps with location pre-loaded
- **Hover Effects**: Visual feedback for interactive elements

### Integration Notes
- Consistent with overall site design
- Complements contact form section
- Integrates with map section above
- Mobile-first responsive design
- SEO-optimized contact information markup
- Analytics tracking for contact interactions

### Visual Styling
- **Background**: Professional contrasting background
- **Typography**: Clean, readable fonts
- **Icons**: Consistent size and color scheme
- **Spacing**: Proper padding and margins
- **Borders**: Subtle dividers between sections if needed