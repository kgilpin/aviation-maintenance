# Asset Management for Contact Page

## Purpose
Manage the media assets required for the contact page implementation, specifically the Contact_Img.jpg background image used in the hero section.

## Asset Requirements

### Primary Asset
**Source**: `/crawl/yankeeaviation.com/wp-content/uploads/2020/09/Contact_Img.jpg`
**Properties**: 640x500px, JPEG format
**Usage**: Background image for ContactHero component
**SEO Description**: "Contact Yankee Aviation Services - Professional aircraft maintenance at Plymouth Municipal Airport"

### Asset Processing Tasks

#### 1. Copy Asset to Public Directory
```bash
# Copy from crawl to public images
cp "crawl/yankeeaviation.com/wp-content/uploads/2020/09/Contact_Img.jpg" "public/images/contact-hero-bg.jpg"
```

#### 2. Image Optimization
- **Format**: Keep as JPEG for photograph content
- **Quality**: Optimize for web (85-90% quality)
- **Size**: 640x500px is appropriate for hero backgrounds
- **Compression**: Use modern compression techniques

#### 3. Responsive Image Strategy
Consider creating multiple sizes for responsive delivery:
```
contact-hero-bg.jpg      (640x500 - original)
contact-hero-bg-md.jpg   (960x750 - tablet)  
contact-hero-bg-lg.jpg   (1280x1000 - desktop)
contact-hero-bg-xl.jpg   (1920x1500 - large screens)
```

### Implementation in ContactHero Component

#### Background Image CSS
```tsx
// In ContactHero.tsx
<section className={cn(
  'relative py-16 bg-gradient-to-r from-blue-400 to-blue-600 text-white',
  className
)}>
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: 'url(/images/contact-hero-bg.jpg)' }}
  />
  <div className="absolute inset-0 bg-blue-600/40" />
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

#### Responsive Background Images (Advanced)
```tsx
// Optional: Responsive background implementation
<div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `
      url(/images/contact-hero-bg.jpg) 640w,
      url(/images/contact-hero-bg-md.jpg) 960w,
      url(/images/contact-hero-bg-lg.jpg) 1280w,
      url(/images/contact-hero-bg-xl.jpg) 1920w
    `
  }}
/>
```

### SEO and Accessibility

#### Image Metadata
- **Alt Text**: Not applicable (decorative background image)
- **Title**: Contact page hero background
- **ARIA**: Use `aria-hidden="true"` on decorative background div

#### Open Graph Image
The contact hero image can be used for social media sharing:
```tsx
// In ContactPage.tsx Helmet
<meta property="og:image" content="https://yankeeaviation.com/images/contact-hero-bg.jpg" />
<meta property="twitter:image" content="https://yankeeaviation.com/images/contact-hero-bg.jpg" />
```

### Media.json Integration

#### Update Media Registry
If the project maintains a media registry, add the new asset:

```json
// In src/data/media.json (if it tracks hero images)
{
  "hero_images": {
    "contact": {
      "src": "/images/contact-hero-bg.jpg",
      "alt": "Contact Yankee Aviation Services",
      "width": 640,
      "height": 500,
      "format": "jpg",
      "description": "Professional aircraft maintenance contact background"
    }
  }
}
```

### Performance Considerations

#### Loading Strategy
```tsx
// Preload critical hero image
// In ContactPage.tsx Helmet
<link 
  rel="preload" 
  as="image" 
  href="/images/contact-hero-bg.jpg"
  type="image/jpeg"
/>
```

#### Modern Image Formats
Consider providing WebP versions for better compression:
```
contact-hero-bg.webp     (WebP format, smaller file size)
contact-hero-bg.jpg      (JPEG fallback)
```

#### CSS Implementation with Fallbacks
```css
/* Modern browsers with WebP support */
.hero-bg {
  background-image: url('/images/contact-hero-bg.webp');
}

/* Fallback for browsers without WebP */
.no-webp .hero-bg {
  background-image: url('/images/contact-hero-bg.jpg');
}
```

### Image Optimization Tools

#### Recommended Tools
- **ImageOptim** (Mac): Lossless compression
- **TinyPNG**: Online compression service
- **Sharp** (Node.js): Programmatic image processing
- **Squoosh**: Web-based image optimization

#### Optimization Command Examples
```bash
# Using Sharp CLI (if available)
sharp contact-hero-bg.jpg \
  --jpeg-quality 85 \
  --output contact-hero-bg-optimized.jpg

# Using ImageMagick
convert contact-hero-bg.jpg \
  -quality 85 \
  -strip \
  contact-hero-bg-optimized.jpg
```

### Content Delivery Network (CDN)

#### Future Enhancement
For production deployment, consider serving images from a CDN:
```tsx
// Environment-based image URLs
const imageBaseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://cdn.yankeeaviation.com' 
  : '';

const heroImageUrl = `${imageBaseUrl}/images/contact-hero-bg.jpg`;
```

### File Structure After Implementation

```
public/
├── images/
│   ├── contact-hero-bg.jpg          (new - main hero image)
│   ├── contact-hero-bg.webp         (optional - WebP version)
│   ├── contact-hero-bg-md.jpg       (optional - tablet size)
│   ├── contact-hero-bg-lg.jpg       (optional - desktop size)
│   └── ... (other existing images)
```

### Implementation Checklist

#### Asset Preparation
- ✅ Copy Contact_Img.jpg from crawl directory
- ✅ Rename to contact-hero-bg.jpg for consistency
- ✅ Optimize file size while maintaining quality
- ✅ Create WebP version if desired

#### Component Integration
- ✅ Implement background image in ContactHero component
- ✅ Add proper CSS classes and responsive behavior
- ✅ Test loading and display across devices

#### SEO Integration
- ✅ Add image to Open Graph meta tags
- ✅ Consider preloading for performance
- ✅ Update any image inventories or documentation

#### Performance Testing
- ✅ Verify image loads quickly
- ✅ Test on slow connections
- ✅ Validate responsive behavior
- ✅ Check file size impact on page load

### Maintenance

#### Future Updates
- Monitor image loading performance
- Update image if branding changes
- Consider seasonal or promotional variations
- Maintain consistent quality across all hero images

This asset management plan ensures the contact page hero image is properly integrated, optimized, and maintainable while following best practices for web performance and SEO.