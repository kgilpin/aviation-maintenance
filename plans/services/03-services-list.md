# Services List Section

## Purpose
Present the specific services offered by Yankee Aviation in a clear, scannable format with visual emphasis.

## Requirements

### Content
- **Service Categories**: 
  - Inspections: Annual inspections for various aircraft types
  - Maintenance: Engine overhauls and repairs
  - Logistics: Aircraft ferrying services
  - Certification: Experimental aircraft certification
- **Visual Indicators**: Checkmark icons for each service
- **Specific Services**:
  1. Annual inspection of single-engine and multi-engine aircraft, including experimental aircraft
  2. Engine overhaul
  3. Aircraft ferrying service for out-of-town and out-of-state customers
  4. Certification of "experimental" amateur-built aircrafts

### Design
- Vertical list layout with consistent spacing
- Checkmark icons (✓) for each service item
- Clean typography for easy scanning
- Fade-left animation for list reveal
- Professional color scheme matching site branding
- Proper visual hierarchy

### Technical Implementation
- Semantic HTML list structure (`<ul>` with `<li>` elements)
- Font Awesome or similar icons for checkmarks
- CSS animation for fade-left effect
- Responsive design for mobile optimization
- Accessible markup with proper roles

### Data Structure
```json
{
  "services_list": {
    "services": [
      {
        "id": "annual-inspections",
        "title": "Annual inspection of single-engine and multi-engine aircraft, including experimental aircraft",
        "category": "inspections",
        "icon": "check"
      },
      {
        "id": "engine-overhaul",
        "title": "Engine overhaul",
        "category": "maintenance", 
        "icon": "check"
      },
      {
        "id": "aircraft-ferrying",
        "title": "Aircraft ferrying service for out-of-town and out-of-state customers",
        "category": "logistics",
        "icon": "check"
      },
      {
        "id": "experimental-certification",
        "title": "Certification of \"experimental\" amateur-built aircrafts",
        "category": "certification",
        "icon": "check"
      }
    ]
  }
}
```

### User Experience
- Easy scanning of available services
- Visual consistency with checkmark indicators
- Clear, descriptive service titles
- Logical grouping by service type
- Mobile-friendly list format

### Accessibility Requirements
- Semantic list markup
- Screen reader friendly service descriptions
- Proper ARIA labels for icons
- Keyboard navigation support
- High contrast for visual elements
- Alternative text for decorative icons

### Performance Considerations
- Efficient CSS for list styling
- Optimized icon fonts or SVGs
- Minimal JavaScript for animations
- Fast loading list content
- Progressive enhancement for effects

### Integration Notes
- Flows naturally from services overview section
- Consistent with site design patterns
- Mobile-responsive layout coordination
- Animation timing with other page elements
- Extensible structure for additional services
- SEO-friendly service descriptions