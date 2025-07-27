# Gail Conner Profile Section

## Purpose
Introduce office manager Gail Conner, emphasizing her essential role in operations and customer relationships.

## Requirements

### Content
- **Profile Image**: Professional headshot of Gail
- **Name/Title**: Gail Conner - Office Manager
- **Tenure**: Office manager since 1980
- **Key Role**: Working partnership with Pete, essential to business operations
- **Expertise**: Knowledge of aircraft and parts, customer relationship management
- **Value Proposition**: Critical operational support and customer service

### Design
- Split layout: content left, image right (alternating from Peter's layout)
- Professional headshot presentation
- Clean typography matching other profiles
- Consistent spacing and visual hierarchy
- Mobile-responsive stacked layout

### Technical Implementation
- CSS Grid or Flexbox for responsive layout
- Image optimization for web delivery
- Consistent styling with other team profiles
- Mobile-first approach with desktop enhancement

### Data Structure
```json
{
  "team_member": {
    "name": "Gail Conner",
    "title": "Office Manager", 
    "image": {
      "src": "/images/gail.jpg",
      "alt": "Gail Conner, Office Manager at Yankee Aviation",
      "width": 480,
      "height": 360
    },
    "tenure": "Since 1980",
    "role_description": "Office manager responsible for customer relationships and operational support.",
    "key_strengths": [
      "Working partnership with Pete Conner",
      "Extensive knowledge of aircraft and parts",
      "Customer relationship management",
      "Essential business operations support"
    ],
    "value_statement": "Gail's knowledge and dedication are essential to our business operations and customer satisfaction."
  }
}
```

### User Experience
- Clear presentation of long-term commitment
- Emphasis on customer-facing role
- Professional but approachable positioning
- Complementary role to Peter's technical focus

### Accessibility Requirements
- Proper heading structure
- Alt text for profile image
- Screen reader friendly content
- Sufficient color contrast
- Keyboard navigation support

### Performance Considerations
- Optimized profile image
- Efficient CSS for layout
- Minimal DOM complexity
- Fast loading profile content

### Integration Notes
- Second team profile with alternating layout
- Establishes pattern for husband/wife team dynamic
- Consistent with overall team presentation
- Responsive layout coordination with other profiles