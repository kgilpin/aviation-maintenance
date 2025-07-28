# Hero Slideshow Plan

## Overview
Create a full-width hero slideshow banner featuring rotating images from the original Eagle East Aviation site.

## Components Needed

### Slideshow Structure
- Full-width banner section
- Image carousel with 5 slides
- Auto-rotation functionality (5-second intervals)
- Navigation dots/indicators
- Optional play/pause controls

### Slide Images (in order)
1. **Hanger_v=1741616783&width=3840.jpg** - Main hangar exterior
2. **IMG_1081_v=1740498634&width=3840.heic** - Aircraft interior/cockpit view
3. **FullSizeRender_v=1740498890&width=3840.heic** - Aircraft on tarmac
4. **IMG_4716_v=1740495727&width=3840.heic** - Aircraft close-up
5. **unnamed3214213_v=1740699016&width=3840.jpg** - Aviation scene

## Technical Implementation

### Template Structure
- Create hero slideshow section in home layout
- Responsive image handling with proper srcset
- CSS-only slideshow or lightweight JavaScript implementation

### Data Requirements
- `src/_data/hero-slides.json` containing:
  - Image paths and alt text
  - Slide timing configuration
  - Any overlay text (currently none in original)

### Styling Requirements
- Full viewport width banner
- Medium height (not full viewport height)
- Smooth transitions between slides
- Responsive image scaling
- Proper aspect ratio maintenance

## Assets Required
All hero images already copied to src/images:
- `Hanger_v=1741616783&width=3840.jpg`
- `IMG_1081_v=1740498634&width=3840.heic`
- `FullSizeRender_v=1740498890&width=3840.heic`
- `IMG_4716_v=1740495727&width=3840.heic`
- `unnamed3214213_v=1740699016&width=3840.jpg`

## Performance Considerations
- Lazy loading for non-first slides
- Optimize image sizes for web
- Preload first slide for faster initial render
- Consider WebP format conversion for better compression

## Accessibility
- Proper alt text for all images
- Pause on hover/focus
- Skip navigation for screen readers
- Reduced motion support