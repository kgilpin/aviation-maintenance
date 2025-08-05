# Asset Integration Guide - Contact Page Implementation

**Plan Enhancement:** This guide provides specific pointers to existing assets in `src/assets/` and their integration into the contact page implementation.

## Existing Asset Inventory

### 1. Primary Logo Assets
**Location:** `src/assets/images/logo.svg` and `src/assets/favicons/logo.svg`

**Current Asset Details:**
- **Format:** SVG (vector graphics)
- **Color:** White (#FFFFFF) - suitable for dark backgrounds
- **Usage:** Primary brand identifier throughout the site
- **Source:** Extracted from original Aura Aero website

**Integration Points:**
- Header component logo display
- Footer component branding
- Email signatures (future enhancement)
- Loading screen branding

### 2. Background Assets
**Location:** `src/assets/images/bg-default.png`

**Current Asset Details:**
- **Format:** PNG
- **Usage:** Background texture/pattern for visual depth
- **Source:** Original site template background

**Integration Points:**
- Contact form section background
- Hero section subtle background
- Loading screen background
- Error page backgrounds

### 3. Favicon and PWA Assets
**Location:** `src/assets/favicons/`

**Current Asset Collection:**
- `apple-touch-icon.png` (180x180) - iOS home screen icon
- `favicon-16x16.png` - Small browser tab icon
- `favicon-32x32.png` - High-DPI browser tab icon
- `safari-pinned-tab.svg` - Safari pinned tab icon

**Integration Points:**
- HTML head meta tags
- PWA manifest file
- Browser tab display
- Mobile home screen icons

### 4. Web App Manifest
**Location:** `src/assets/documents/site.webmanifest`

**Current Configuration:**
- App name: "Aura Aero"
- Theme colors: White (#ffffff)
- Display mode: Standalone
- Missing: Proper icon references need updating

## Enhanced Asset Integration Strategy

### Step 2 Enhancement: Company Data with Asset References

Update `src/data/company.json` to reference existing assets:

```json
{
  "name": "Aura Aero",
  "fullName": "AURA AERO",
  "description": "AURA AERO is committed to serve mankind by designing and manufacturing aircraft that accelerate air transport decarbonization.",
  "tagline": "Designing aircraft that accelerate air transport decarbonization",
  "logo": {
    "main": "/assets/images/logo.svg",
    "favicon": "/assets/favicons/logo.svg",
    "alt": "Aura Aero"
  },
  "branding": {
    "backgroundImage": "/assets/images/bg-default.png",
    "themeColor": "#ffffff",
    "backgroundColor": "#ffffff"
  },
  "pwa": {
    "manifest": "/assets/documents/site.webmanifest",
    "appleTouchIcon": "/assets/favicons/apple-touch-icon.png",
    "favicon16": "/assets/favicons/favicon-16x16.png",
    "favicon32": "/assets/favicons/favicon-32x32.png",
    "safariPinnedTab": "/assets/favicons/safari-pinned-tab.svg"
  }
}
```

### Step 20 Enhancement: Asset Optimization Strategy

#### 20.1 Updated Image Map Utility
Update `src/utils/imageMap.ts`:

```typescript
// Direct imports for Vite optimization
import logoMain from '@/assets/images/logo.svg';
import logoFavicon from '@/assets/favicons/logo.svg';
import bgDefault from '@/assets/images/bg-default.png';
import appleTouchIcon from '@/assets/favicons/apple-touch-icon.png';
import favicon16 from '@/assets/favicons/favicon-16x16.png';
import favicon32 from '@/assets/favicons/favicon-32x32.png';
import safariPinnedTab from '@/assets/favicons/safari-pinned-tab.svg';

export const imageMap: Record<string, string> = {
  '/assets/images/logo.svg': logoMain,
  '/assets/favicons/logo.svg': logoFavicon,
  '/assets/images/bg-default.png': bgDefault,
  '/assets/favicons/apple-touch-icon.png': appleTouchIcon,
  '/assets/favicons/favicon-16x16.png': favicon16,
  '/assets/favicons/favicon-32x32.png': favicon32,
  '/assets/favicons/safari-pinned-tab.svg': safariPinnedTab,
};

export const resolveImagePath = (path: string): string => {
  return imageMap[path] || path;
};

// Asset preloading for critical resources
export const preloadCriticalAssets = () => {
  const criticalAssets = [logoMain, bgDefault];
  
  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = asset;
    document.head.appendChild(link);
  });
};
```

#### 20.2 Enhanced Layout Component with Asset Integration
Update Layout component head section:

```typescript
<Helmet>
  <html lang="en" />
  <body className="bg-white text-black font-sans" />
  
  {/* Favicon Links */}
  <link rel="apple-touch-icon" sizes="180x180" href={company.pwa.appleTouchIcon} />
  <link rel="icon" type="image/png" sizes="32x32" href={company.pwa.favicon32} />
  <link rel="icon" type="image/png" sizes="16x16" href={company.pwa.favicon16} />
  <link rel="manifest" href={company.pwa.manifest} />
  <link rel="mask-icon" href={company.pwa.safariPinnedTab} color="#000000" />
  
  {/* Background Preload */}
  <link rel="preload" as="image" href={company.branding.backgroundImage} />
  
  {/* PWA Meta Tags */}
  <meta name="msapplication-TileColor" content={company.branding.backgroundColor} />
  <meta name="theme-color" content={company.branding.themeColor} />
  
  {/* SEO Meta Tags */}
  <title>{company.seo.defaultTitle}</title>
  <meta name="description" content={company.seo.defaultDescription} />
</Helmet>
```

### Step 6 Enhancement: Header Component with Logo Integration

Update Header component logo section:

```typescript
{/* Logo with proper asset integration */}
<div className="flex-shrink-0">
  <Link to="/" className="flex items-center">
    <img 
      src={resolveImagePath(company.logo.main)} 
      alt={company.logo.alt}
      className="h-8 md:h-10 w-auto"
      loading="eager" // Critical above-fold image
      decoding="async"
    />
  </Link>
</div>
```

### Step 14 Enhancement: Contact Section with Background Integration

Update ContactSection with background styling:

```typescript
<section 
  className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white relative"
  style={{
    backgroundImage: `url(${resolveImagePath(company.branding.backgroundImage)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  {/* Background overlay for better text readability */}
  <div className="absolute inset-0 bg-white bg-opacity-90"></div>
  
  <div className="container mx-auto px-4 max-w-4xl relative z-10">
    {/* Contact form content */}
  </div>
</section>
```

## Media Data Integration

### Enhanced Media Hook
Create `src/hooks/useMediaData.ts` enhancement:

```typescript
import { useState, useEffect } from 'react';
import mediaData from '@/data/media.json';
import { resolveImagePath } from '@/utils/imageMap';

interface MediaAsset {
  path: string;
  description: string;
  usage: string;
  type: string;
  format: string;
  size?: string;
  source: string;
}

interface MediaData {
  media: {
    images: Record<string, MediaAsset>;
    favicons: Record<string, MediaAsset>;
    documents: Record<string, MediaAsset>;
  };
}

export const useMediaData = () => {
  const [media, setMedia] = useState<MediaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Resolve all image paths
      const resolvedMedia = {
        ...mediaData,
        media: {
          ...mediaData.media,
          images: Object.entries(mediaData.media.images).reduce((acc, [key, asset]) => ({
            ...acc,
            [key]: {
              ...asset,
              path: resolveImagePath(asset.path)
            }
          }), {}),
          favicons: Object.entries(mediaData.media.favicons).reduce((acc, [key, asset]) => ({
            ...acc,
            [key]: {
              ...asset,
              path: resolveImagePath(asset.path)
            }
          }), {})
        }
      };

      setMedia(resolvedMedia as MediaData);
    } catch (error) {
      console.error('Error loading media data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { media, loading };
};
```

## Asset Performance Optimizations

### 1. Critical Resource Hints
```html
<!-- In HTML head -->
<link rel="preload" href="/assets/images/logo.svg" as="image" type="image/svg+xml">
<link rel="preload" href="/assets/images/bg-default.png" as="image">
<link rel="prefetch" href="/assets/favicons/apple-touch-icon.png" as="image">
```

### 2. Responsive Image Loading
```typescript
// Future enhancement for responsive images
const ResponsiveImage: React.FC<{
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}> = ({ src, alt, sizes, className }) => {
  return (
    <img
      src={resolveImagePath(src)}
      alt={alt}
      sizes={sizes}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
};
```

### 3. Asset Caching Strategy
```typescript
// Service worker cache strategy (future PWA enhancement)
const ASSET_CACHE_NAME = 'aura-aero-assets-v1';
const CRITICAL_ASSETS = [
  '/assets/images/logo.svg',
  '/assets/images/bg-default.png',
  '/assets/favicons/favicon-32x32.png'
];

// Cache critical assets for offline functionality
```

## Integration Checklist

### Contact Page Specific Assets
- [ ] Logo displays correctly in header
- [ ] Background image loads and displays properly
- [ ] Favicon appears in browser tab
- [ ] Apple touch icon works on iOS devices
- [ ] Web manifest loads without errors

### Asset Performance
- [ ] Logo loads immediately (preloaded)
- [ ] Background image doesn't block rendering
- [ ] All assets are properly compressed
- [ ] Image formats are optimized (SVG for logos, WebP where supported)

### SEO and Accessibility
- [ ] All images have proper alt text
- [ ] Logo has meaningful alt text
- [ ] Background images don't interfere with text readability
- [ ] Icons meet minimum contrast requirements

### Cross-Platform Compatibility
- [ ] SVG logo displays on all browsers
- [ ] PNG fallbacks available where needed
- [ ] Apple touch icon displays on iOS
- [ ] Favicons work across different browsers

## Asset Source Mapping

All assets are sourced from the original Aura Aero website and properly attributed:

- **Logo:** `https://aura-aero.com/wp-content/uploads/2021/04/logo.svg`
- **Background:** `https://aura-aero.com/wp-content/themes/template/assets/images/bg-default.png`
- **Favicons:** `https://aura-aero.com/wp-content/themes/template/assets/favicon/`

This asset integration strategy ensures that the contact page implementation uses the existing, well-organized asset structure while maintaining optimal performance and brand consistency.