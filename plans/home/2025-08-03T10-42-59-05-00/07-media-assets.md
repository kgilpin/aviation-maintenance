# Media Assets Processing

**Directory:** `public/images/`  
**Purpose:** Optimize and process images from crawled content for web delivery  
**Priority:** Medium (Performance Enhancement)  
**Dependencies:** 02-json-data-files.md

## Overview

This step processes and optimizes the images extracted from the Yankee Aviation website crawl, ensuring they are properly sized, compressed, and formatted for optimal web performance while maintaining visual quality.

## Asset Inventory

### Source Images (from crawl)
Located in: `crawl/yankeeaviation.com/wp-content/uploads/`

```
Primary Images:
- 2020/09/Transparent-Logo.png (Company logo)
- 2020/10/about.jpg (640x500 - About section)
- 2020/10/services.jpg (640x500 - Services section) 
- 2020/09/Contact_Img.jpg (640x500 - Contact section)
- 2020/11/IMG_2289-Warrior-N9284A-scaled.jpg (1446x1080 - Aircraft image)

Staff Images:
- 2020/10/gail.jpg (Staff photo - Gail)
- 2020/10/joe.jpg (Staff photo - Joe)
- 2020/10/ken.jpg (Staff photo - Ken)
- 2020/11/20201021_122112_resized-Pete-at-his-desk-10-21-20.jpg (Pete)

Additional Assets:
- 2020/11/20200531_191924_resized-scaled.jpg (Facility image)
- 2020/11/20200531_191943-scaled.jpg (Facility image)
- 2020/11/pexels-daniel-torobekov-5262805-scaled.jpg (Stock aviation image)
```

## Processing Requirements

### 1. Logo Optimization

**Source:** `Transparent-Logo.png`  
**Target:** `public/images/logo/`

```bash
# Multiple sizes for responsive usage
logo-32.png     (32x32   - Favicon)
logo-180.png    (180x180 - Apple touch icon) 
logo-192.png    (192x192 - Android icon)
logo-512.png    (512x512 - PWA icon)
Transparent-Logo.png (123x117 - Original size)
```

**Processing Steps:**
1. Extract from crawled content
2. Create multiple sizes using image processing
3. Optimize PNG compression
4. Generate WebP versions for modern browsers

### 2. Hero Background Image

**Target:** `public/images/hero-background.jpg`

Requirements:
- **Desktop:** 1920x1080 (Full HD)
- **Mobile:** 768x1024 (Portrait mobile)
- **Quality:** 80% JPEG compression
- **Format:** JPEG + WebP versions
- **Loading:** Critical resource (preload)

**Implementation:**
```typescript
// In HeroSection component
<picture>
  <source media="(min-width: 768px)" srcSet="/images/hero-background-desktop.webp" type="image/webp" />
  <source media="(min-width: 768px)" srcSet="/images/hero-background-desktop.jpg" type="image/jpeg" />
  <source srcSet="/images/hero-background-mobile.webp" type="image/webp" />
  <img src="/images/hero-background-mobile.jpg" alt="Yankee Aviation facility" />
</picture>
```

### 3. Section Images

**About Section Image**
- **Source:** `about.jpg` (640x500)
- **Target:** `public/images/about.jpg`
- **Sizes:** 400w, 640w, 800w, 1200w
- **Aspect Ratio:** 4:3
- **Usage:** `<img>` with `srcset` for responsive loading

**Services Section Image**
- **Source:** `services.jpg` (640x500)  
- **Target:** `public/images/services.jpg`
- **Sizes:** 400w, 640w, 800w, 1200w
- **Aspect Ratio:** 4:3
- **Usage:** ServiceCard component

**Contact Section Image**
- **Source:** `Contact_Img.jpg` (640x500)
- **Target:** `public/images/contact.jpg`
- **Sizes:** 400w, 640w, 800w
- **Aspect Ratio:** 4:3
- **Usage:** ContactSection background

### 4. Aircraft Images

**Featured Aircraft**
- **Source:** `IMG_2289-Warrior-N9284A-scaled.jpg` (1446x1080)
- **Target:** `public/images/aircraft/warrior-n9284a.jpg`
- **Sizes:** 600w, 900w, 1200w, 1800w
- **Aspect Ratio:** 4:3
- **Usage:** Gallery or feature sections

## Image Processing Script

**File:** `scripts/process-images.js`

```javascript
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const CRAWL_DIR = './crawl/yankeeaviation.com/wp-content/uploads';
const OUTPUT_DIR = './public/images';

const imageConfigs = {
  logo: {
    input: '2020/09/Transparent-Logo.png',
    outputs: [
      { width: 32, height: 32, suffix: '-32' },
      { width: 180, height: 180, suffix: '-180' },
      { width: 192, height: 192, suffix: '-192' },
      { width: 512, height: 512, suffix: '-512' },
      { width: 123, height: 117, suffix: '' } // Original size
    ]
  },
  hero: {
    input: '2020/10/about.jpg', // Using about.jpg as hero background
    outputs: [
      { width: 1920, height: 1080, suffix: '-desktop', quality: 80 },
      { width: 768, height: 1024, suffix: '-mobile', quality: 75 }
    ]
  },
  sections: [
    {
      input: '2020/10/about.jpg',
      name: 'about',
      sizes: [400, 640, 800, 1200]
    },
    {
      input: '2020/10/services.jpg', 
      name: 'services',
      sizes: [400, 640, 800, 1200]
    },
    {
      input: '2020/09/Contact_Img.jpg',
      name: 'contact',
      sizes: [400, 640, 800]
    }
  ],
  aircraft: [
    {
      input: '2020/11/IMG_2289-Warrior-N9284A-scaled.jpg',
      name: 'warrior-n9284a',
      sizes: [600, 900, 1200, 1800]
    }
  ]
};

async function processImages() {
  // Ensure output directories exist
  await fs.mkdir(path.join(OUTPUT_DIR, 'logo'), { recursive: true });
  await fs.mkdir(path.join(OUTPUT_DIR, 'aircraft'), { recursive: true });

  // Process logo
  const logoInput = path.join(CRAWL_DIR, imageConfigs.logo.input);
  for (const config of imageConfigs.logo.outputs) {
    const output = path.join(OUTPUT_DIR, 'logo', `logo${config.suffix}.png`);
    await sharp(logoInput)
      .resize(config.width, config.height)
      .png({ quality: 90 })
      .toFile(output);
    
    // Also create WebP version
    const webpOutput = output.replace('.png', '.webp');
    await sharp(logoInput)
      .resize(config.width, config.height)
      .webp({ quality: 85 })
      .toFile(webpOutput);
  }

  // Process hero images
  const heroInput = path.join(CRAWL_DIR, imageConfigs.hero.input);
  for (const config of imageConfigs.hero.outputs) {
    const jpegOutput = path.join(OUTPUT_DIR, `hero-background${config.suffix}.jpg`);
    const webpOutput = path.join(OUTPUT_DIR, `hero-background${config.suffix}.webp`);
    
    await sharp(heroInput)
      .resize(config.width, config.height, { fit: 'cover' })
      .jpeg({ quality: config.quality })
      .toFile(jpegOutput);
      
    await sharp(heroInput)
      .resize(config.width, config.height, { fit: 'cover' })
      .webp({ quality: config.quality - 5 })
      .toFile(webpOutput);
  }

  // Process section images
  for (const section of imageConfigs.sections) {
    const input = path.join(CRAWL_DIR, section.input);
    
    for (const size of section.sizes) {
      const jpegOutput = path.join(OUTPUT_DIR, `${section.name}-${size}w.jpg`);
      const webpOutput = path.join(OUTPUT_DIR, `${section.name}-${size}w.webp`);
      
      await sharp(input)
        .resize(size, null, { withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(jpegOutput);
        
      await sharp(input)
        .resize(size, null, { withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(webpOutput);
    }
    
    // Also create original size
    const originalJpeg = path.join(OUTPUT_DIR, `${section.name}.jpg`);
    const originalWebp = path.join(OUTPUT_DIR, `${section.name}.webp`);
    
    await sharp(input)
      .jpeg({ quality: 85 })
      .toFile(originalJpeg);
      
    await sharp(input)
      .webp({ quality: 80 })
      .toFile(originalWebp);
  }

  // Process aircraft images
  for (const aircraft of imageConfigs.aircraft) {
    const input = path.join(CRAWL_DIR, aircraft.input);
    
    for (const size of aircraft.sizes) {
      const jpegOutput = path.join(OUTPUT_DIR, 'aircraft', `${aircraft.name}-${size}w.jpg`);
      const webpOutput = path.join(OUTPUT_DIR, 'aircraft', `${aircraft.name}-${size}w.webp`);
      
      await sharp(input)
        .resize(size, null, { withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(jpegOutput);
        
      await sharp(input)
        .resize(size, null, { withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(webpOutput);
    }
  }

  console.log('✅ Image processing complete!');
}

processImages().catch(console.error);
```

## Responsive Image Component

**File:** `src/components/ui/ResponsiveImage.tsx`

```typescript
interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  className,
  loading = 'lazy',
  priority = false
}) => {
  const baseName = src.replace(/\.[^/.]+$/, '');
  const extension = path.extname(src);
  
  // Generate srcSet for different sizes
  const srcSet = [400, 640, 800, 1200]
    .map(size => `${baseName}-${size}w${extension} ${size}w`)
    .join(', ');
    
  const webpSrcSet = [400, 640, 800, 1200]
    .map(size => `${baseName}-${size}w.webp ${size}w`)
    .join(', ');

  return (
    <picture>
      <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" />
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        className={className}
        {...(priority && { fetchPriority: 'high' })}
      />
    </picture>
  );
};
```

## Image Manifest Generation

**File:** `scripts/generate-image-manifest.js`

```javascript
const fs = require('fs').promises;
const path = require('path');

async function generateManifest() {
  const imageDir = './public/images';
  const manifest = {};
  
  async function scanDirectory(dir, basePath = '') {
    const items = await fs.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      const relativePath = path.join(basePath, item.name);
      
      if (item.isDirectory()) {
        await scanDirectory(fullPath, relativePath);
      } else if (item.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(item.name)) {
        const stats = await fs.stat(fullPath);
        const webPath = '/' + relativePath.replace(/\\/g, '/');
        
        manifest[webPath] = {
          size: stats.size,
          modified: stats.mtime,
          type: path.extname(item.name).slice(1).toLowerCase()
        };
      }
    }
  }
  
  await scanDirectory(imageDir);
  
  await fs.writeFile(
    './public/images/image-manifest.json', 
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('✅ Image manifest generated!');
}

generateManifest().catch(console.error);
```

## Implementation Steps

1. **Install dependencies**: `npm install sharp`
2. **Copy source images**: Extract from crawl directory
3. **Run processing script**: Generate optimized images
4. **Create responsive component**: Build ResponsiveImage component
5. **Update components**: Use responsive images in sections
6. **Generate manifest**: Create image inventory
7. **Test loading**: Verify images load correctly
8. **Performance audit**: Measure loading performance

## NPM Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "process-images": "node scripts/process-images.js",
    "generate-image-manifest": "node scripts/generate-image-manifest.js",
    "optimize-images": "npm run process-images && npm run generate-image-manifest"
  },
  "devDependencies": {
    "sharp": "^0.32.0"
  }
}
```

## Performance Considerations

### Critical Images
- **Hero background**: Preload desktop version
- **Logo**: Inline small version in HTML
- **Above-fold images**: Use `loading="eager"`

### Non-Critical Images
- **Below-fold images**: Use `loading="lazy"`
- **Gallery images**: Implement intersection observer
- **Testimonial images**: Load when section is visible

### Format Strategy
- **WebP**: Modern browsers (Chrome, Firefox, Safari 14+)
- **JPEG**: Fallback for older browsers
- **PNG**: Only for logos and graphics with transparency

## Quality Guidelines

### JPEG Quality Settings
- **Hero images**: 80% (high quality, critical)
- **Section images**: 75-80% (good quality, visible)
- **Thumbnail images**: 70% (smaller size, acceptable quality)

### WebP Quality Settings
- **Hero images**: 75% (WebP is more efficient)
- **Section images**: 70-75%
- **Thumbnail images**: 65%

## Testing Checklist

- [ ] All images load correctly on desktop and mobile
- [ ] WebP images serve to supported browsers
- [ ] JPEG fallbacks work for older browsers
- [ ] Responsive images select appropriate sizes
- [ ] Critical images preload properly
- [ ] Lazy loading works for non-critical images
- [ ] Image quality is acceptable across all formats
- [ ] File sizes are optimized for web delivery