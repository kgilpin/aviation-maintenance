# Media Assets Processing for Services Page

## Overview

Process and optimize media assets for the services page, ensuring proper organization, optimization, and accessibility while maintaining visual quality and performance.

## Required Media Assets

### Services-Related Images

Based on the crawled content analysis, the following images need to be processed:

1. **Main Content Image**: `20200531_191924_resized-scaled.jpg`
   - Source: `/crawl/yankeeaviation.com/wp-content/uploads/2020/11/`
   - Target: `/public/images/20200531_191924_resized-scaled.jpg`
   - Usage: Main services content section illustration
   - Dimensions: Optimize to appropriate size for content display (recommend 800x600px)
   - Alt Text: "Aircraft maintenance work being performed at Yankee Aviation facility"

2. **Services Background Image**: `services.jpg`
   - Source: `/crawl/yankeeaviation.com/wp-content/uploads/2020/10/`
   - Target: `/public/images/services.jpg`
   - Usage: Hero section background and SEO og:image
   - Dimensions: Optimize for hero background (recommend 1920x1080px)
   - Alt Text: "Professional aviation services background"

3. **Hero Background Image**: Can reuse `services.jpg` or create variant
   - Target: `/public/images/services-hero-bg.jpg`
   - Usage: Services hero section background
   - Dimensions: 1920x1080px for full-width hero display
   - Optimization: Web-optimized for fast loading with overlay capability

4. **Call-to-Action Background**: Optional dedicated CTA background
   - Target: `/public/images/services-cta-bg.jpg`
   - Usage: "Why Choose Us" section background
   - Dimensions: 1920x600px for section background
   - Could reuse existing aviation maintenance imagery

## Image Processing Tasks

### 1. Copy and Organize Images

```bash
# Copy services-related images from crawl
cp "crawl/yankeeaviation.com/wp-content/uploads/2020/11/20200531_191924_resized-scaled.jpg" "public/images/20200531_191924_resized-scaled.jpg"
cp "crawl/yankeeaviation.com/wp-content/uploads/2020/10/services.jpg" "public/images/services.jpg"

# Create additional variants if needed
cp "public/images/services.jpg" "public/images/services-hero-bg.jpg"
```

### 2. Image Optimization Strategy

#### Manual Optimization (if tools available)
- **Format Conversion**: Convert to WebP where supported, maintain JPEG fallbacks
- **Compression**: Optimize for web delivery (80-85% quality for photos)
- **Sizing**: Create responsive variants for different viewport sizes
- **Progressive Loading**: Enable progressive JPEG loading for better perceived performance

#### Responsive Image Variants

Create multiple image sizes for responsive loading:

- **Hero Background Images**:
  - Mobile: 768x432px (16:9 aspect ratio)
  - Tablet: 1024x576px 
  - Desktop: 1920x1080px
  - Ultra-wide: 2560x1440px

- **Content Images**:
  - Small: 400x300px (mobile/tablet portrait)
  - Medium: 800x600px (desktop content)
  - Large: 1200x900px (high-resolution displays)

### 3. Modern Image Format Support

#### WebP Implementation
```typescript
// Example component for modern image formats with fallbacks
export const ResponsiveServicesImage: React.FC<{
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  sizes?: string;
}> = ({ src, webpSrc, alt, className, sizes }) => {
  return (
    <picture>
      {webpSrc && (
        <source 
          srcSet={webpSrc} 
          type="image/webp" 
          sizes={sizes}
        />
      )}
      <img 
        src={src} 
        alt={alt} 
        className={className}
        loading="lazy"
        decoding="async"
        sizes={sizes}
      />
    </picture>
  );
};
```

## Updated Data Files with New Image Paths

### Update services.json with optimized paths

```json
{
  "hero": {
    "title": "Services",
    "backgroundImage": "/images/services-hero-bg.jpg"
  },
  "servicesContent": {
    "heading": "A Wide Range of Cost-Effective Aircraft Maintenance Services",
    "subheading": "Since 1977, we have been providing assistance with aviation maintenance for our clients. Our specialty services include:",
    "image": "/images/20200531_191924_resized-scaled.jpg",
    "imageAlt": "Aircraft maintenance work being performed at Yankee Aviation facility"
  },
  "callToAction": {
    "heading": "Why Choose Us",
    "description": "We take pride in having a team of dedicated professionals who are experts in aviation maintenance. You can trust that we're here to offer efficient assistance and unparalleled customer service.",
    "backgroundImage": "/images/services-cta-bg.jpg",
    "imageAlt": "Professional aviation maintenance team at work"
  },
  "seoMeta": {
    "ogImage": "/images/services.jpg"
  }
}
```

## Image Performance Optimization

### Lazy Loading Implementation

```typescript
// Enhanced image component with intersection observer
export const OptimizedServicesImage: React.FC<{
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}> = ({ src, alt, width, height, className, priority = false, sizes }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        'transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      sizes={sizes}
      onLoad={() => setIsLoaded(true)}
    />
  );
};
```

### Background Image Optimization

```typescript
// Component for optimized background images
export const OptimizedBackgroundSection: React.FC<{
  backgroundImage?: string;
  children: React.ReactNode;
  className?: string;
  overlay?: boolean;
  overlayColor?: string;
}> = ({ 
  backgroundImage, 
  children, 
  className, 
  overlay = true, 
  overlayColor = 'bg-blue-600/40' 
}) => {
  return (
    <section className={cn('relative', className)}>
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          {overlay && (
            <div className={cn('absolute inset-0', overlayColor)} />
          )}
        </>
      )}
      <div className="relative">
        {children}
      </div>
    </section>
  );
};
```

## Accessibility Enhancements

### Alt Text Standards for Services Images

- **Descriptive**: Include context about aircraft maintenance activities
- **Professional**: Maintain professional tone appropriate for business context
- **Specific**: Describe relevant visual elements and activities shown
- **Concise**: Keep under 125 characters when possible

### Example Alt Text:
- **Hero Background**: "Professional aviation maintenance facility with aircraft"
- **Content Image**: "Aircraft maintenance work being performed at Yankee Aviation facility"
- **CTA Background**: "Professional aviation maintenance team at work"

### Image Loading States

```typescript
// Loading placeholder component
export const ImageLoadingPlaceholder: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width, height, className }) => {
  return (
    <div 
      className={cn(
        'bg-gray-200 animate-pulse flex items-center justify-center',
        className
      )}
      style={{ width, height }}
    >
      <svg 
        className="w-10 h-10 text-gray-400" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
          clipRule="evenodd" 
        />
      </svg>
    </div>
  );
};
```

## Directory Structure After Processing

```
public/
├── images/
│   ├── services.jpg (SEO og:image, general services)
│   ├── services-hero-bg.jpg (Hero section background)
│   ├── services-cta-bg.jpg (CTA section background)
│   ├── 20200531_191924_resized-scaled.jpg (Main content image)
│   └── [other existing images]
```

## Quality Assurance Checklist

### Image Quality
- ✅ All images load properly on different devices and connection speeds
- ✅ Images maintain professional quality after optimization
- ✅ File sizes are optimized for web delivery (typically < 500KB for large images)
- ✅ Images display correctly with various browser zoom levels

### Performance
- ✅ Images load lazily except for critical hero images
- ✅ Proper caching headers configured
- ✅ WebP format supported where possible with fallbacks
- ✅ Image dimensions specified to prevent layout shift (CLS)

### Accessibility
- ✅ All images have descriptive alt text
- ✅ Alt text is contextually appropriate for services content
- ✅ Images work properly with screen readers
- ✅ Loading states provide appropriate feedback
- ✅ High contrast maintained for text overlays

### Responsive Design
- ✅ Images scale appropriately across all viewport sizes
- ✅ Background images work well on mobile devices
- ✅ Text overlays remain readable on all devices
- ✅ Images don't cause horizontal scrolling

## Implementation Commands

```bash
# 1. Copy images from crawl to public directory
cp "crawl/yankeeaviation.com/wp-content/uploads/2020/11/20200531_191924_resized-scaled.jpg" "public/images/"
cp "crawl/yankeeaviation.com/wp-content/uploads/2020/10/services.jpg" "public/images/"

# 2. Create additional variants for different uses
cp "public/images/services.jpg" "public/images/services-hero-bg.jpg"
cp "public/images/services.jpg" "public/images/services-cta-bg.jpg"

# 3. Optimize images (if tools available)
# npm run optimize-images

# 4. Verify image accessibility
# Manual testing with screen readers and keyboard navigation

# 5. Test performance
# Use browser dev tools to verify lazy loading and optimization
```

## Files to Create/Modify

### New Files
- `public/images/services.jpg` - Main services image for SEO
- `public/images/services-hero-bg.jpg` - Hero section background
- `public/images/services-cta-bg.jpg` - Call-to-action background
- `public/images/20200531_191924_resized-scaled.jpg` - Content section image

### Modified Files
- `src/data/services.json` - Update image paths to match processed assets

## Success Criteria

- All services page images display correctly across devices
- Images are properly optimized for web delivery with fast loading times
- Lazy loading works correctly for non-critical images  
- Alt text meets accessibility standards and provides context
- Images maintain quality across all viewport sizes and zoom levels
- Background images provide appropriate contrast for overlaid text
- SEO images are properly sized and optimized for social sharing

The media asset processing ensures that the services page provides excellent visual presentation while maintaining optimal performance and accessibility standards.