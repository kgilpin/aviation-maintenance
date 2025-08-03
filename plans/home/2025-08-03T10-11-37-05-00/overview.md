# Home Page Clone Plan

**Plan Date**: 2025-08-03T10:11:37-05:00
**Target Page**: Home page (index.html)

## Current Status Analysis

The React + Vite site already has a complete home page implementation with:
- **HomePage component** (`src/pages/HomePage.tsx`)
- **Home data file** (`src/data/home.json`)
- **Supporting components**: HeroSection, AmenitiesSection, GallerySection, PartnersSection
- **Layout components**: Header, Footer, Navigation

## Source Analysis (Crawled Content)

From the crawled `www.falconairinc.com/index.html`, the key elements identified:

### Site Identity
- **Company Name**: Falcon Air Inc.
- **Location**: Lawrence Municipal Airport, North Andover, Massachusetts  
- **Phone**: 978-689-4492
- **Tagline**: "A Leading Fixed Base Operator"

### Navigation Structure
- FBO/PRICES (services/)
- MAINTENANCE (maintenance/)
- AMMENITIES (ammenities/) 
- CONTACT (map/)
- AIRCRAFT FOR SALE (for-sale/)
- REVIEWS (reviews/)
- Phone number: 978-689-4492

### Main Content Sections
1. **Hero Video Section**: Background video with overlay text
2. **Company Description**: FBO description with 40+ years experience
3. **Image Gallery/Slideshow**: Multiple aviation-related images
4. **Partner Logos**: Various aviation industry partners

## Implementation Gap Analysis

**✅ Already Implemented:**
- React component structure
- TypeScript interfaces
- Data management with custom hooks
- Responsive design with Tailwind CSS
- SEO metadata management

**🔄 Needs Refinement:**
- Hero section content and messaging
- Gallery images (current vs. crawled content)
- Partner logos alignment
- Navigation structure alignment
- Contact information consistency

## Recommended Actions

Since the home page structure is already well-implemented, this plan focuses on **content refinement** rather than structural changes:

### Phase 1: Content Alignment
1. **Update home.json** with content from crawled site
2. **Verify navigation links** match crawled structure
3. **Update company branding** and messaging
4. **Review image assets** for consistency

### Phase 2: Component Refinement  
1. **HeroSection**: Ensure messaging matches "Leading Fixed Base Operator"
2. **AmenitiesSection**: Verify amenities list matches crawled content
3. **GallerySection**: Update images to match crawled gallery
4. **PartnersSection**: Add/update partner logos as needed

### Phase 3: Data Consistency
1. **Company data**: Update company.json with correct details
2. **Contact data**: Ensure phone number and location match
3. **Navigation data**: Align menu structure with crawled site

## Files to Modify

1. `src/data/home.json` - Update hero, sections, and content
2. `src/data/company.json` - Verify company information  
3. `src/data/contact.json` - Update contact details
4. `src/data/navigation.json` - Align navigation structure
5. `public/images/` - Add/update images as needed

## Success Criteria

- [ ] Home page content matches crawled site messaging
- [ ] Navigation structure aligns with original site
- [ ] Contact information is consistent
- [ ] Images and branding are updated
- [ ] Mobile responsiveness maintained
- [ ] Type safety preserved
- [ ] Performance optimized

This plan leverages the existing React architecture while ensuring content fidelity to the original Falcon Air Inc. website.