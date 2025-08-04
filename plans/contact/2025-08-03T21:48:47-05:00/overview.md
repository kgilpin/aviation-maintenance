# Contact Page Implementation Plan
**Timestamp:** 2025-08-03T21:48:47-05:00

## Overview

This plan details the enhancement of the existing Contact page to match the functionality and content from the crawled Yankee Aviation contact page. The current ContactPage exists but is incomplete - it only has a basic placeholder implementation.

## Crawled Content Analysis

Based on the analysis of `/crawl/yankeeaviation.com/contact/index.html`, the live contact page contains:

### Essential Content Elements:
1. **Hero Section**: "CONTACT" with background image (`Contact_Img.jpg`)
2. **Contact Information Cards**:
   - Phone: (508) 746-5511
   - Email: yankeeaviation1@gmail.com  
   - Address: 246 South Meadow Road, Gate 3, Plymouth Municipal Airport, Plymouth, MA 02360
   - Hours: Mon-Sat 8:00 AM - 4:30 PM, Sun: Closed
3. **Contact Form**: Gravity Forms-based contact form with Name, Phone, Email, Message fields
4. **Google Maps Integration**: Embedded map showing Plymouth Municipal Airport location
5. **SEO Meta Data**: Comprehensive meta tags and structured data

### Visual Design Elements:
- Professional aviation aesthetic consistent with site theme
- Contact cards with icons (phone, email, location, clock)
- Responsive two-column layout (contact info + form)
- Google Maps iframe integration

## Current State Assessment

### Existing Infrastructure ✅
- **ContactPage.tsx**: Basic page exists but needs enhancement
- **ContactSection.tsx**: Reusable section component exists and is well-designed
- **ContactCard.tsx**: UI component for contact information cards
- **contact.json**: Complete data file with all required information
- **useContactData.ts**: Hook for accessing contact data
- **Contact interface**: TypeScript types already defined

### Missing Components ❌
- **ContactHero** component for the hero section
- **ContactForm** component for lead capture
- **GoogleMapsEmbed** component for map integration
- Enhanced ContactPage implementation using existing components

## Implementation Strategy

### Phase 1: Create Missing Components (High Priority)
1. **ContactHero Component** - Hero section with "CONTACT" title and background
2. **ContactForm Component** - Lead capture form matching the crawled structure  
3. **GoogleMapsEmbed Component** - Embedded Google Maps integration

### Phase 2: Update ContactPage (High Priority)
1. Replace placeholder implementation with comprehensive page structure
2. Integrate hero section, contact information, form, and map
3. Add proper SEO meta tags and structured data
4. Ensure responsive design and accessibility

### Phase 3: Asset Management (Medium Priority) 
1. Copy Contact_Img.jpg from crawl to public/images/
2. Optimize image for web usage
3. Update media.json if needed

### Phase 4: Testing & Refinement (Medium Priority)
1. Test form functionality (note: actual form submission will need backend)
2. Verify responsive design across devices
3. Test Google Maps embedding
4. Validate SEO meta tags

## Reusable Components Strategy

### Components to Reuse ✅
- **Layout**: Standard page layout wrapper
- **ContactSection**: Existing component handles contact info display perfectly
- **ContactCard**: UI component for individual contact items  
- **PageHero**: Can be enhanced or used as reference for ContactHero

### New Components to Create 🆕
- **ContactHero**: Specialized hero for contact page
- **ContactForm**: Lead capture form component
- **GoogleMapsEmbed**: Map integration component

## Data Requirements

### Existing Data ✅
All required data already exists in `src/data/contact.json`:
- Phone, email, address information ✅
- Business hours ✅  
- Google Maps coordinates and embed URL ✅

### Data Updates Needed ❌
None - existing data matches crawled content exactly

## SEO and Meta Requirements

### Required Meta Tags:
- Title: "Contact - Yankee Aviation"
- Description: Match crawled meta description about Plymouth, MA facility
- Open Graph tags for social sharing
- Structured data for local business
- Canonical URL

## File Structure

```
plans/contact/2025-08-03T21:48:47-05:00/
├── overview.md (this file)
├── 01-contact-hero-component.md
├── 02-contact-form-component.md  
├── 03-google-maps-embed-component.md
├── 04-contact-page-enhancement.md
└── 05-asset-management.md
```

## Success Criteria

### Functional Requirements:
- ✅ Contact information displays correctly using existing components
- ✅ Contact form captures leads (frontend validation)  
- ✅ Google Maps shows correct location
- ✅ Responsive design works on all devices
- ✅ SEO meta tags are comprehensive

### Content Requirements:
- ✅ All text content matches crawled site exactly
- ✅ Contact information is accurate and complete
- ✅ Business hours are displayed prominently  
- ✅ Professional aviation industry aesthetic maintained

### Technical Requirements:
- ✅ Uses existing TypeScript interfaces and data hooks
- ✅ Follows established component patterns
- ✅ Maintains accessibility standards (WCAG 2.1 AA)
- ✅ Integrates seamlessly with existing navigation

## Implementation Priority

1. **High Priority**: ContactHero, ContactForm, updated ContactPage
2. **Medium Priority**: GoogleMapsEmbed, asset management, SEO optimization
3. **Low Priority**: Advanced form features, analytics integration

This plan leverages existing infrastructure while adding the missing components needed to create a comprehensive, professional contact page that matches the live site's functionality and appearance.