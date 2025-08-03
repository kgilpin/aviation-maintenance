# Media Assets Processing

## Overview

Process and optimize team member images and other media assets for the about page, ensuring proper organization, optimization, and accessibility.

## Required Media Assets

### Team Member Images

Based on the crawled content, the following images need to be processed:

1. **Peter Conner**: `20201021_122112_resized-Pete-at-his-desk-10-21-20.jpg`
   - Source: `/crawl/yankeeaviation.com/wp-content/uploads/2020/11/`
   - Target: `/public/images/team/peter-conner.jpg`
   - Dimensions: Professional headshot, optimized to 400x400px

2. **Gail Conner**: `gail.jpg`
   - Source: `/crawl/yankeeaviation.com/wp-content/uploads/2020/10/`
   - Target: `/public/images/team/gail-conner.jpg`
   - Dimensions: Professional headshot, optimized to 400x400px

3. **Ken Hughes**: `ken.jpg`
   - Source: `/crawl/yankeeaviation.com/wp-content/uploads/2020/10/`
   - Target: `/public/images/team/ken-hughes.jpg`
   - Dimensions: Professional headshot, optimized to 400x400px

4. **Joe Ricci**: `joe.jpg`
   - Source: `/crawl/yankeeaviation.com/wp-content/uploads/2020/10/`
   - Target: `/public/images/team/joe-ricci.jpg`
   - Dimensions: Professional headshot, optimized to 400x400px

5. **Hank Wiltshire**: `20201019_130017_resized-Hank-Wiltshire-for-Bio.jpg`
   - Source: `/crawl/yankeeaviation.com/wp-content/uploads/2020/11/`
   - Target: `/public/images/team/hank-wiltshire.jpg`
   - Dimensions: Professional photo, optimized to 400x400px

### Company/About Page Images

1. **About Hero Background**: `about.jpg`
   - Source: `/crawl/yankeeaviation.com/wp-content/uploads/2020/10/`
   - Target: `/public/images/about-hero-bg.jpg`
   - Dimensions: 1920x1080px for hero background
   - Usage: Background image for AboutHeroSection

2. **Company History Image**: `20200531_191924_resized-scaled.jpg`
   - Source: Already exists in `/public/images/`
   - Usage: Company history section, maintenance work photo
   - Optimization: Ensure proper web optimization

## Image Processing Tasks

### 1. Copy and Organize Images

```bash
# Create team images directory
mkdir -p public/images/team

# Copy and rename team member images
cp crawl/yankeeaviation.com/wp-content/uploads/2020/11/20201021_122112_resized-Pete-at-his-desk-10-21-20.jpg public/images/team/peter-conner.jpg
cp crawl/yankeeaviation.com/wp-content/uploads/2020/10/gail.jpg public/images/team/gail-conner.jpg  
cp crawl/yankeeaviation.com/wp-content/uploads/2020/10/ken.jpg public/images/team/ken-hughes.jpg
cp crawl/yankeeaviation.com/wp-content/uploads/2020/10/joe.jpg public/images/team/joe-ricci.jpg
cp crawl/yankeeaviation.com/wp-content/uploads/2020/11/20201019_130017_resized-Hank-Wiltshire-for-Bio.jpg public/images/team/hank-wiltshire.jpg

# Copy about page background image
cp crawl/yankeeaviation.com/wp-content/uploads/2020/10/about.jpg public/images/about-hero-bg.jpg
```

### 2. Image Optimization

#### Manual Optimization (if tools available)
- **Format**: Convert to WebP where supported, maintain JPEG fallbacks
- **Compression**: Optimize for web delivery (80-85% quality)
- **Sizing**: Standard dimensions for consistency
- **Progressive Loading**: Enable progressive JPEG loading

#### Automated Optimization Script

```typescript
// Add to package.json scripts if image optimization tools are available
{
  "scripts": {
    "optimize-images": "imagemin 'public/images/**/*.{jpg,jpeg,png}' --out-dir=public/images/optimized --plugin=imagemin-mozjpeg --plugin=imagemin-pngquant"
  }
}
```

### 3. Responsive Image Variants

Create multiple image sizes for responsive loading:

- **Team Member Images**:
  - Small: 200x200px (mobile cards)
  - Medium: 400x400px (desktop cards)  
  - Large: 600x600px (modal/detailed view)

- **Hero Background**:
  - Mobile: 768x432px
  - Tablet: 1024x576px
  - Desktop: 1920x1080px

## Updated Data Files with New Image Paths

### Update team.json with optimized paths

```json
{
  "members": [
    {
      "id": "peter-conner",
      "name": "Peter Conner",
      "image": "/images/team/peter-conner.jpg",
      "imageAlt": "Peter Conner, Owner and Designated Airworthiness Representative at Yankee Aviation"
    },
    {
      "id": "gail-conner", 
      "name": "Gail Conner",
      "image": "/images/team/gail-conner.jpg",
      "imageAlt": "Gail Conner, Office Manager at Yankee Aviation"
    },
    {
      "id": "ken-hughes",
      "name": "Ken Hughes", 
      "image": "/images/team/ken-hughes.jpg",
      "imageAlt": "Ken Hughes, Lead Mechanic and FAA Inspector at Yankee Aviation"
    },
    {
      "id": "joe-ricci",
      "name": "Joe Ricci",
      "image": "/images/team/joe-ricci.jpg", 
      "imageAlt": "Joe Ricci, A&P Mechanic at Yankee Aviation"
    },
    {
      "id": "hank-wiltshire",
      "name": "Hank Wiltshire",
      "image": "/images/team/hank-wiltshire.jpg",
      "imageAlt": "Hank Wiltshire, Part-time A&P Mechanic at Yankee Aviation"
    }
  ]
}
```

### Update about.json with hero background

```json
{
  "hero": {
    "primaryHeading": "An Established Full-Service Aviation Maintenance Facility",
    "backgroundImage": "/images/about-hero-bg.jpg"
  }
}
```

## Image Performance Optimization

### Lazy Loading Implementation

```typescript
// Enhanced image component with lazy loading
export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}> = ({ src, alt, width, height, className, priority = false }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
};
```

### WebP Support with Fallbacks

```typescript
// Component for modern image formats with fallbacks
export const ResponsiveImage: React.FC<{
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
}> = ({ src, webpSrc, alt, className }) => {
  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img 
        src={src} 
        alt={alt} 
        className={className}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};
```

## Accessibility Enhancements

### Alt Text Standards

- **Descriptive**: Include person's name, role, and context
- **Professional**: Maintain professional tone
- **Specific**: Describe relevant visual elements
- **Concise**: Keep under 125 characters when possible

### Example Alt Text:
- Good: "Peter Conner, Owner and Designated Airworthiness Representative at Yankee Aviation"
- Better: "Peter Conner working at his desk in the Yankee Aviation office"

## Directory Structure After Processing

```
public/
├── images/
│   ├── team/
│   │   ├── peter-conner.jpg
│   │   ├── gail-conner.jpg  
│   │   ├── ken-hughes.jpg
│   │   ├── joe-ricci.jpg
│   │   └── hank-wiltshire.jpg
│   ├── about-hero-bg.jpg
│   ├── about.jpg (existing)
│   └── [other existing images]
```

## Quality Assurance Checklist

### Image Quality
- ✅ All images load properly on different devices
- ✅ Images maintain professional quality after optimization
- ✅ File sizes are optimized for web delivery
- ✅ Images display correctly in both light and dark themes

### Performance
- ✅ Images load lazily except for critical hero images
- ✅ Proper caching headers configured
- ✅ WebP format supported where possible
- ✅ Image dimensions specified to prevent layout shift

### Accessibility
- ✅ All images have descriptive alt text
- ✅ Alt text is contextually appropriate
- ✅ Images work properly with screen readers
- ✅ High contrast maintained for text overlays

## Implementation Commands

```bash
# 1. Create directories
mkdir -p public/images/team

# 2. Copy and rename images (adjust paths as needed)
# Note: Actual paths may vary based on crawled content location

# 3. Optimize images (if tools available)
npm run optimize-images

# 4. Verify image accessibility
# Manual testing with screen readers and keyboard navigation

# 5. Test performance
# Use browser dev tools to verify lazy loading and optimization
```

## Files to Create/Modify

### New Directories
- `public/images/team/` - Team member photo directory

### New Files  
- `public/images/team/peter-conner.jpg` - Peter Conner's photo
- `public/images/team/gail-conner.jpg` - Gail Conner's photo
- `public/images/team/ken-hughes.jpg` - Ken Hughes' photo
- `public/images/team/joe-ricci.jpg` - Joe Ricci's photo
- `public/images/team/hank-wiltshire.jpg` - Hank Wiltshire's photo
- `public/images/about-hero-bg.jpg` - About page hero background

### Modified Files
- `src/data/team.json` - Update image paths
- `src/data/about.json` - Update hero background path

## Success Criteria

- All team member images display correctly
- Images are properly optimized for web delivery
- Lazy loading works correctly
- Alt text meets accessibility standards
- Images maintain quality across all viewport sizes
- Hero background loads quickly and displays properly