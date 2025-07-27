# Joe Ricci Profile Section

## Purpose
Introduce newest team member Joe Ricci, emphasizing fresh energy and comprehensive aviation background.

## Requirements

### Content
- **Profile Image**: Professional headshot of Joe
- **Name/Title**: Joe Ricci - Aviation Technician
- **Status**: Newest team member
- **Education**: Cape Cod Community College Aviation graduate
- **Credentials**: A&P license holder, Licensed pilot
- **Experience**: 3 years with company, Former Pilgrim Aviation Flight School manager
- **Personal Aviation**: Owns Cessna aircraft
- **Value**: Fresh perspective with solid foundation

### Design
- Split layout: content left, image right (alternating layout)
- Professional headshot presentation
- Educational background emphasis
- Clean typography with credential highlighting
- Youthful energy balanced with professionalism

### Technical Implementation
- Responsive grid layout consistent with team profiles
- Image optimization for web delivery
- Consistent styling and spacing patterns
- Mobile-first responsive design

### Data Structure
```json
{
  "team_member": {
    "name": "Joe Ricci",
    "title": "Aviation Technician",
    "image": {
      "src": "/images/joe.jpg",
      "alt": "Joe Ricci, Aviation Technician at Yankee Aviation", 
      "width": 480,
      "height": 360
    },
    "status": "Newest team member",
    "education": "Cape Cod Community College Aviation graduate",
    "credentials": [
      "A&P license holder",
      "Licensed pilot"
    ],
    "experience": {
      "yankee_aviation": "3 years",
      "previous_role": "Former Pilgrim Aviation Flight School manager"
    },
    "personal_aviation": "Owns Cessna aircraft",
    "value_proposition": "Brings fresh energy and comprehensive aviation background to the team"
  }
}
```

### User Experience
- Clear presentation of educational foundation
- Emphasis on dual pilot/mechanic perspective
- Fresh addition to experienced team narrative
- Personal aviation connection highlighted
- Professional growth trajectory indicated

### Accessibility Requirements
- Proper heading structure
- Alt text for profile image
- Screen reader friendly content
- Keyboard navigation support
- Sufficient color contrast ratios

### Performance Considerations
- Optimized profile image
- Efficient CSS for layout
- Minimal DOM complexity
- Fast loading profile content

### Integration Notes
- Fourth team profile with alternating layout
- Represents next generation of team
- Balances experience with fresh perspective
- Maintains consistent visual presentation
- Mobile-responsive layout coordination