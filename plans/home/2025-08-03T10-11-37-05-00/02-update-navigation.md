# Update Navigation Structure

**File**: `src/data/navigation.json`
**Component**: Site navigation menu
**Priority**: High

## Current vs Target Navigation

### Crawled Site Navigation
From the original site, the navigation structure is:
1. **FBO/PRICES** → `/services/`
2. **MAINTENANCE** → `/maintenance/`  
3. **AMMENITIES** → `/ammenities/` (note: misspelling in original)
4. **CONTACT** → `/map/`
5. **AIRCRAFT FOR SALE** → `/for-sale/`
6. **REVIEWS** → `/reviews/`
7. **Phone**: 978-689-4492 (clickable tel: link)

### Required Navigation Update

Update `src/data/navigation.json` to match:

```json
{
  "main": [
    {
      "label": "FBO/PRICES",
      "url": "/services/",
      "id": "services"
    },
    {
      "label": "MAINTENANCE", 
      "url": "/maintenance/",
      "id": "maintenance"
    },
    {
      "label": "AMMENITIES",
      "url": "/ammenities/",
      "id": "ammenities",
      "note": "Original spelling preserved for URL consistency"
    },
    {
      "label": "CONTACT",
      "url": "/map/",
      "id": "contact"
    },
    {
      "label": "AIRCRAFT FOR SALE",
      "url": "/for-sale/",
      "id": "aircraft-for-sale"
    },
    {
      "label": "REVIEWS",
      "url": "/reviews/",
      "id": "reviews"
    },
    {
      "label": "978-689-4492",
      "url": "tel:978-689-4492",
      "id": "phone",
      "type": "phone",
      "external": true
    }
  ],
  "branding": {
    "company": "Falcon Air Inc.",
    "location": "Lawrence Municipal Airport",
    "subtitle": "North Andover, Massachusetts"
  },
  "mobile": {
    "showCompanyInfo": true,
    "collapseThreshold": 768
  }
}
```

## Component Updates Required

### Navigation Component
Update `src/components/layout/Navigation.tsx` to:

1. **Handle phone number link** with proper `tel:` protocol
2. **Display company branding** in header area
3. **Show location information** as subtitle
4. **Implement mobile responsiveness** for longer menu items

### Header Component  
Update `src/components/layout/Header.tsx` to:

1. **Include company name** prominently
2. **Show airport location** as subtitle
3. **Maintain responsive design** for mobile devices

## Implementation Notes

### URL Structure Considerations
- **`/ammenities/`**: Keep original misspelling for URL consistency with existing site
- **`/map/`**: Contact page uses map URL rather than `/contact/`
- **Phone number**: Should be clickable tel: link for mobile users

### Styling Requirements
- **Company name**: Use distinctive typography (script font as in original)
- **Location info**: Smaller subtitle text
- **Navigation items**: All caps styling to match original
- **Phone number**: Visually distinct as contact method

### Mobile Responsiveness
- **Hamburger menu**: Required due to longer menu labels
- **Company branding**: Should remain visible on mobile
- **Phone number**: Easily accessible on mobile devices

## Dependencies

- Typography/font updates for company branding
- Mobile menu implementation
- Phone icon for tel: links
- Route structure alignment

## Testing Checklist

- [ ] All navigation links work correctly
- [ ] Phone number opens phone app on mobile
- [ ] Company branding displays properly
- [ ] Mobile menu functions correctly
- [ ] Responsive design maintained
- [ ] Navigation matches original site structure
- [ ] Accessibility maintained (ARIA labels, keyboard navigation)