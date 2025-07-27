# Location Map Section

## Purpose
Provide visual location context and directions through embedded Google Maps integration.

## Requirements

### Content
- **Google Maps Embed**: Interactive map showing Plymouth Municipal Airport
- **Full-width presentation**: Map spans complete section width
- **Location accuracy**: Precise positioning of Yankee Aviation Services
- **Accessible fallback**: Alternative directions for non-visual users

### Design
- Full-width map integration
- Responsive height scaling
- Professional presentation
- Clean map borders and styling
- Mobile-optimized map interaction

### Technical Implementation
- Google Maps iframe embed
- Responsive width and height
- Lazy loading for performance
- Proper accessibility attributes
- Fallback content for map loading issues

### Data Structure
```json
{
  "location_map": {
    "title": "Our Location",
    "embed_url": "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11877.047118746543!2d-70.7313188!3d41.9087309!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7eb3c68301ff0fe6!2sPYM-Plymouth%20Municipal%20Airport!5e0!3m2!1sen!2sph!4v1601380173054!5m2!1sen!2sph",
    "width": "100%",
    "height": "150",
    "loading": "lazy",
    "title_attribute": "Yankee Aviation Services Location Map"
  }
}
```

### Map Configuration
- **Location**: Plymouth Municipal Airport
- **Coordinates**: Latitude 41.9087309, Longitude -70.7313188
- **Zoom Level**: Appropriate for showing airport context
- **Map Type**: Standard road map view
- **Interactive Features**: Zoom, pan, satellite toggle

### User Experience
- Immediate visual location context
- Interactive map exploration
- Clear airport positioning
- Touch-friendly mobile interaction
- Smooth loading experience

### Accessibility Requirements
- Proper iframe title attribute
- Alternative text for map content
- Keyboard navigation support
- Screen reader friendly fallback content
- High contrast map styling options

### Performance Considerations
- Lazy loading for map iframe
- Optimized embed parameters
- Efficient API usage
- Fast map rendering
- Mobile-optimized loading

### Integration Notes
- Seamless integration with contact information
- Consistent with overall page layout
- Mobile-responsive map sizing
- API key management for Google Maps
- Privacy considerations for embedded maps

### Fallback Content
```html
<noscript>
  <p>Interactive map requires JavaScript. 
     <a href="https://www.google.com/maps/place/Plymouth+Municipal+Airport" 
        target="_blank" rel="noopener">
        View location on Google Maps
     </a>
  </p>
</noscript>
```

### Map Features
- **Zoom Controls**: User can zoom in/out
- **Pan Navigation**: Drag to explore surrounding area
- **Satellite View**: Toggle between map and satellite imagery
- **Street View**: Access street-level imagery when available
- **Directions Link**: Direct integration with Google Maps for navigation