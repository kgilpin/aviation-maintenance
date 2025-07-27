# Hank Wiltshire Profile Section

## Purpose
Introduce semi-retired team member Hank Wiltshire, emphasizing decades of experience and continued contributions.

## Requirements

### Content
- **Profile Image**: Professional photo of Hank in work environment
- **Name/Title**: Hank Wiltshire - Semi-Retired Mechanic
- **Experience**: 20+ years with Yankee Aviation, A&P mechanic since 1973
- **Background**: Former flight school/charter operator at Plymouth Airport
- **Aviation History**: 50+ years flying experience
- **Current Aircraft**: Cessna 172 (configured for floats)
- **Personal Interests**: Deer hunting in Maine
- **Status**: Semi-retired but still contributing

### Design
- Split layout: image left, content right (matching established pattern)
- Professional workspace/hangar photo context
- Experience timeline emphasis
- Clean typography with decades of service highlighting
- Semi-retired status clearly indicated

### Technical Implementation
- Responsive grid layout consistent with other profiles
- Image optimization for larger workspace photo
- Consistent styling and spacing
- Mobile-responsive content stacking

### Data Structure
```json
{
  "team_member": {
    "name": "Hank Wiltshire", 
    "title": "Semi-Retired Mechanic",
    "image": {
      "src": "/images/hank-wiltshire.jpg",
      "alt": "Hank Wiltshire in the Yankee Aviation maintenance facility",
      "width": 875,
      "height": 654
    },
    "experience": {
      "yankee_aviation": "20+ years",
      "ap_mechanic_since": "1973",
      "flying_experience": "50+ years"
    },
    "background": "Former flight school and charter operator at Plymouth Airport",
    "current_aircraft": "Cessna 172 (configured for floats)",
    "personal_interests": [
      "Deer hunting in Maine"
    ],
    "status": "Semi-retired",
    "value_statement": "Decades of experience and institutional knowledge continue to benefit our operations"
  }
}
```

### User Experience
- Clear presentation of vast experience
- Historical context for company continuity
- Semi-retired status appropriately positioned
- Personal aviation passion highlighted
- Institutional knowledge emphasis

### Accessibility Requirements
- Proper heading structure
- Alt text for profile image
- Screen reader friendly timeline content
- Keyboard navigation support
- Sufficient color contrast

### Performance Considerations
- Optimized larger profile image
- Efficient CSS layout rendering
- Minimal JavaScript requirements
- Fast content loading

### Integration Notes
- Final team profile completing the roster
- Represents company history and continuity
- Consistent with overall team presentation
- Mobile-responsive layout conclusion
- Establishes full team narrative arc