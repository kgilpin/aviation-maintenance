# Peter Conner Profile Section

## Purpose
Introduce company founder Peter Conner with his extensive background, credentials, and leadership role.

## Requirements

### Content
- **Profile Image**: Pete at his desk (professional workspace photo)
- **Name/Title**: Peter Conner - Owner/Founder
- **Brief Introduction**: Career progression from aspiring airline pilot to established mechanic
- **Key Credentials**:
  - Navy service and FAA authorization (1968)
  - Designated Airworthiness Representative (DAR) - 1986
  - FAA Examiner designation - 1988
  - "Mechanic of the Year" award for New England Region - 1996
- **Personal Aviation**: 25+ aircraft owned, currently flies Piper Aerostar 700
- **Education**: Various maintenance schools (Cessna, Piper, Eclipse 500)
- **Modal "Read More"**: Expandable detailed biography

### Design
- Split layout: image left, content right (desktop)
- Stacked layout for mobile
- Professional headshot with workspace context
- Clean typography hierarchy
- Modal overlay for extended biography
- Consistent spacing and alignment

### Technical Implementation
- Responsive grid layout
- Modal JavaScript functionality for "Read More"
- Image optimization for web delivery
- Accessible modal with keyboard navigation
- Touch-friendly interactions

### Data Structure
```json
{
  "team_member": {
    "name": "Peter Conner",
    "title": "Owner/Founder",
    "image": {
      "src": "/images/pete-at-desk.jpg",
      "alt": "Pete Conner at his desk in the Yankee Aviation office",
      "width": 608,
      "height": 1080
    },
    "intro": "Career progression from aspiring airline pilot to established aviation mechanic and business owner.",
    "credentials": [
      {
        "year": "1968",
        "achievement": "Navy service and FAA authorization"
      },
      {
        "year": "1986", 
        "achievement": "Designated Airworthiness Representative (DAR) appointment"
      },
      {
        "year": "1988",
        "achievement": "FAA Examiner designation"
      },
      {
        "year": "1996",
        "achievement": "Mechanic of the Year award for New England Region"
      }
    ],
    "personal_aviation": {
      "aircraft_owned": "25+",
      "current_aircraft": "Piper Aerostar 700"
    },
    "education": [
      "Cessna maintenance schools",
      "Piper maintenance schools", 
      "Eclipse 500 maintenance training"
    ],
    "detailed_bio": "Extended biography content for modal display..."
  }
}
```

### User Experience
- Progressive disclosure with "Read More" functionality
- Clear visual hierarchy emphasizing credentials
- Professional presentation matching aviation industry standards
- Easy-to-scan key achievements and dates

### Accessibility Requirements
- Proper heading structure
- Alt text for profile image
- Keyboard accessible modal
- Screen reader friendly credential list
- Focus management for modal interactions

### Performance Considerations
- Optimized profile image
- Lazy loading for modal content
- Minimal JavaScript for modal functionality
- Progressive enhancement approach

### Integration Notes
- First team member profile sets the template
- Consistent styling for all team profiles
- Modal component reusable across profiles
- Mobile-optimized layout switching