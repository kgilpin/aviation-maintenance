# Flight Training Assets and Images Plan

## Overview
Identify and organize all required images and assets for the flight training page based on the crawled content and screenshot analysis.

## Required Images

### Hero Section Image
- **Purpose**: Background for main hero section
- **Content**: Aircraft pre-flight inspection scene with instructor and students
- **Source**: Need to identify from crawled images or use existing hangar/aircraft image
- **Specs**: High resolution, wide aspect ratio suitable for hero background

### Discovery Flight Image
- **Filename**: `boston221412_v=1740767313&width=1500.jpg`
- **Purpose**: Side-by-side with discovery flight text
- **Content**: Aerial landscape view (river and terrain)
- **Location**: Already exists in `src/images/`
- **Status**: ✓ Available

### Instructor Photos (6 total)
1. **Tim Campbell**: `Tim_Funny_v=1740511087&width=1500.jpg` ✓
2. **Alex Hoff**: `Alex_Website_Photo_v=1749222019&width=1500.jpg` ✓
3. **Liam Foley**: `233532_v=1740766675&width=1500.jpg` ✓
4. **Nate Fanara**: `Nate_Centerline_v=1740835362&width=1500.jpg` ✓
5. **Sam Gregson**: `img_1_1740767947370_v=1740768122&width=1500.jpg` ✓
6. **Nathan Underwood**: `Nathan_Site_Picture_v=1750350814&width=1500.jpg` ✓

## Image Optimization Requirements

### Responsive Images
- Multiple sizes for different breakpoints
- WebP format support for modern browsers
- Lazy loading implementation
- Proper alt text for accessibility

### File Naming Convention
- Keep original filenames for consistency with crawled content
- Maintain version parameters to avoid caching issues
- Organize in logical src/images/ structure

## Implementation Tasks

### Image Verification
- ✓ Confirm all instructor photos exist in `src/images/`
- ✓ Verify discovery flight landscape image available
- ⚠️ Identify appropriate hero section background image

### Hero Image Options
1. Use existing hangar exterior image: `Hanger_v=1741616783&width=3840.jpg`
2. Use aircraft pre-flight scene from available images
3. Composite/crop from existing aircraft images if needed

### Responsive Implementation
- Configure Eleventy image plugin for automatic resizing
- Generate multiple image sizes (320w, 640w, 1024w, 1500w)
- Implement lazy loading with proper fallbacks

## File Organization

### Current Status
All instructor photos are already available in `src/images/` with correct filenames matching the data files.

### Image Pipeline
- Images ready for immediate use in templates
- No additional copying required from crawl directory
- Focus on responsive implementation and optimization