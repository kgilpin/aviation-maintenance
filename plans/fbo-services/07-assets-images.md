# FBO Services Assets & Images

## Overview
Identify and organize the images and assets needed for the FBO services page based on crawled content.

## Required Images

### 1. Hero Section Background
- **File**: `5J6A0650_v=1740494543&width=1500.jpg`
- **Usage**: Hero section background image
- **Description**: Aircraft on ground/tarmac scene
- **Dimensions**: Full viewport background (1500px wide)
- **Treatment**: Dark overlay for text readability

### 2. Fueling & Oil Services
- **File**: `5J6A0650_v=1740494543&width=1500.jpg` 
- **Usage**: Fueling services section illustration
- **Description**: Aircraft fueling operations or ground support
- **Layout**: Right side of two-column layout
- **Dimensions**: Responsive image sizing

### 3. Jet Services
- **File**: `IMG_9298_v=1740500131&width=1500.heic`
- **Usage**: Jet services section
- **Description**: Jet aircraft maintenance or ground operations
- **Layout**: Left side of two-column layout
- **Note**: HEIC format - may need conversion to web-friendly format

### 4. Lounge & Concierge
- **File**: `5793B4A6-66F2-481B-AE28-4E80B130F3E5_1_v=1740495899&width=1500.heic`
- **Usage**: Lounge and concierge services section
- **Description**: Interior lounge area or customer service
- **Layout**: Right side of two-column layout  
- **Note**: HEIC format - may need conversion

## Image Optimization
- **Web Formats**: Convert HEIC files to JPG/WebP for web compatibility
- **Responsive Sizing**: Multiple sizes for different viewport breakpoints
- **Alt Text**: Descriptive alternative text for accessibility
- **Loading**: Consider lazy loading for performance

## Image Processing Needs
1. **Format Conversion**: HEIC → JPG/WebP
2. **Size Optimization**: Compress for web delivery
3. **Responsive Variants**: Generate multiple sizes
4. **Alt Text Creation**: Descriptive accessibility text

## Asset Organization
```
src/images/
├── fbo-services/
│   ├── hero-aircraft-ground.jpg (5J6A0650)
│   ├── fueling-operations.jpg  
│   ├── jet-services.jpg (IMG_9298 converted)
│   └── lounge-interior.jpg (5793B4A6 converted)
```

## Media.json Integration
Update `src/_data/media.json` with FBO services image descriptions:
- Professional descriptions for each image
- Usage context and alt text
- Technical specifications and dimensions
- Source attribution if needed

## Image Accessibility
- **Alt Text**: Descriptive alternative text for screen readers
- **Context**: Images should support and enhance content
- **Fallbacks**: Ensure content is meaningful without images
- **Loading States**: Consider image loading placeholders