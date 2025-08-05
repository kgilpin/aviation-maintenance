# Asset Extraction Plan for INTEGRAL Page

## Asset Inventory from Crawled Content

Based on analysis of `/crawl/aura-aero.com/` directory, the following assets need to be extracted and organized for the INTEGRAL page:

## Video Assets

### Hero Video
- **Source**: `/crawl/aura-aero.com/wp-content/themes/template/assets/videos/INTEGRAL-WEB-1.mp4`
- **Destination**: `src/assets/videos/INTEGRAL-WEB-1.mp4`
- **Requirements**: 
  - Optimize for web delivery
  - Create WebM version for better compression
  - Generate poster image frame
  - Create mobile-optimized version (smaller file size)

## Image Assets

### 360° Aircraft Viewer Images
- **Source Pattern**: `/crawl/aura-aero.com/wp-content/uploads/*/IntegralRX2_{001-070}.png`
- **Destination**: `src/assets/images/integral/360/`
- **Total Files**: 70 images (IntegralRX2_001.png through IntegralRX2_070.png)
- **Requirements**:
  - Optimize file size while maintaining quality
  - Convert to WebP format with PNG fallback
  - Ensure consistent dimensions
  - Implement progressive loading strategy

### Aircraft Model Logos
- **INTEGRAL R Logo**:
  - Source: `/crawl/aura-aero.com/wp-content/uploads/2021/04/integral-r-logo.png`
  - Destination: `src/assets/images/integral/logos/integral-r-logo.png`

- **INTEGRAL S Logo**:
  - Source: `/crawl/aura-aero.com/wp-content/uploads/2021/04/integral-s-logo.png`
  - Destination: `src/assets/images/integral/logos/integral-s-logo.png`

- **INTEGRAL E Logo**:
  - Source: `/crawl/aura-aero.com/wp-content/uploads/2021/05/integral-e-1.png`
  - Destination: `src/assets/images/integral/logos/integral-e-1.png`

### Background Images
- **Hangar Background**:
  - Source: `/crawl/aura-aero.com/wp-content/uploads/*/INTEGRAL-R-HANGAR-DARK_Website.png`
  - Destination: `src/assets/images/integral/backgrounds/hangar-dark.png`
  - Usage: Technical specifications section background

### Feature Icons
- **Seat Icon**:
  - Source: `/crawl/aura-aero.com/wp-content/themes/template/assets/images/seat.svg`
  - Destination: `src/assets/images/icons/seat.svg`

- **Weight Icon**:
  - Source: `/crawl/aura-aero.com/wp-content/themes/template/assets/images/weight.svg`
  - Destination: `src/assets/images/icons/weight.svg`

- **Shield Check Icon**:
  - Source: `/crawl/aura-aero.com/wp-content/themes/template/assets/images/shield-check.svg`
  - Destination: `src/assets/images/icons/shield-check.svg`

- **Certification Icon**:
  - Source: `/crawl/aura-aero.com/wp-content/themes/template/assets/images/certification.svg`
  - Destination: `src/assets/images/icons/certification.svg`

- **Contact Icon**:
  - Source: `/crawl/aura-aero.com/wp-content/themes/template/assets/images/picto-contact.svg`
  - Destination: `src/assets/images/icons/picto-contact.svg`

### Testimonial Logos
- **Midi-Pyrénées Voltige**:
  - Source: `/crawl/aura-aero.com/wp-content/uploads/2021/05/midi-pyrenees-voltige.jpg`
  - Destination: `src/assets/images/testimonials/midi-pyrenees-voltige.jpg`

- **Aero Club Châteauroux**:
  - Source: `/crawl/aura-aero.com/wp-content/uploads/2021/05/aero-club-chateauroux.jpg`
  - Destination: `src/assets/images/testimonials/aero-club-chateauroux.jpg`

### Site Branding Assets
- **Main Logo**:
  - Source: `/crawl/aura-aero.com/wp-content/uploads/2021/04/logo.svg`
  - Destination: `src/assets/images/logo.svg` (if not already present)

- **Black Logo**:
  - Source: `/crawl/aura-aero.com/wp-content/themes/template/assets/images/logo-black.svg`
  - Destination: `src/assets/images/logo-black.svg` (if not already present)

## Asset Extraction Commands

### Step 1: Create Directory Structure
```bash
mkdir -p src/assets/images/integral/{360,logos,backgrounds}
mkdir -p src/assets/images/{icons,testimonials}
mkdir -p src/assets/videos
```

### Step 2: Copy Video Assets
```bash
cp crawl/aura-aero.com/wp-content/themes/template/assets/videos/INTEGRAL-WEB-1.mp4 src/assets/videos/
```

### Step 3: Copy 360° Images
```bash
# Find and copy all IntegralRX2 images
find crawl/aura-aero.com/wp-content/uploads -name "IntegralRX2_*.png" -exec cp {} src/assets/images/integral/360/ \;
```

### Step 4: Copy Model Logos
```bash
cp crawl/aura-aero.com/wp-content/uploads/2021/04/integral-r-logo.png src/assets/images/integral/logos/
cp crawl/aura-aero.com/wp-content/uploads/2021/04/integral-s-logo.png src/assets/images/integral/logos/
cp crawl/aura-aero.com/wp-content/uploads/2021/05/integral-e-1.png src/assets/images/integral/logos/
```

### Step 5: Copy Feature Icons
```bash
cp crawl/aura-aero.com/wp-content/themes/template/assets/images/seat.svg src/assets/images/icons/
cp crawl/aura-aero.com/wp-content/themes/template/assets/images/weight.svg src/assets/images/icons/
cp crawl/aura-aero.com/wp-content/themes/template/assets/images/shield-check.svg src/assets/images/icons/
cp crawl/aura-aero.com/wp-content/themes/template/assets/images/certification.svg src/assets/images/icons/
cp crawl/aura-aero.com/wp-content/themes/template/assets/images/picto-contact.svg src/assets/images/icons/
```

### Step 6: Copy Testimonial Logos
```bash
cp crawl/aura-aero.com/wp-content/uploads/2021/05/midi-pyrenees-voltige.jpg src/assets/images/testimonials/
cp crawl/aura-aero.com/wp-content/uploads/2021/05/aero-club-chateauroux.jpg src/assets/images/testimonials/
```

### Step 7: Copy Background Images
```bash
# Find the hangar background image
find crawl/aura-aero.com/wp-content/uploads -name "*HANGAR-DARK*" -exec cp {} src/assets/images/integral/backgrounds/hangar-dark.png \;
```

## Asset Optimization Tasks

### Image Optimization
1. **Convert to WebP Format**:
   ```bash
   # Install imagemagick or use online tools
   for file in src/assets/images/integral/360/*.png; do
     convert "$file" "${file%.png}.webp"
   done
   ```

2. **Resize for Responsive Design**:
   - Create multiple sizes for 360° images (small: 400px, medium: 800px, large: 1200px)
   - Optimize testimonial logos for consistent sizing
   - Ensure icons are scalable SVGs

3. **Compress File Sizes**:
   - Use tools like `imagemin` or online services
   - Target 70-80% quality for JPEG/WebP
   - Optimize PNG files with `pngquant`

### Video Optimization
1. **Create Multiple Formats**:
   ```bash
   # Create WebM version
   ffmpeg -i src/assets/videos/INTEGRAL-WEB-1.mp4 -c:v libvpx-vp9 -c:a libvorbis src/assets/videos/INTEGRAL-WEB-1.webm
   
   # Create mobile version (smaller size)
   ffmpeg -i src/assets/videos/INTEGRAL-WEB-1.mp4 -vf scale=854:480 -c:v libx264 -crf 28 src/assets/videos/INTEGRAL-WEB-1-mobile.mp4
   ```

2. **Generate Poster Image**:
   ```bash
   ffmpeg -i src/assets/videos/INTEGRAL-WEB-1.mp4 -ss 00:00:01 -vframes 1 src/assets/images/integral/hero-poster.jpg
   ```

## Asset Integration with imageMap.ts

Update `src/utils/imageMap.ts` to include new assets:

```typescript
// Add INTEGRAL-specific mappings
'/images/integral/logos/integral-r-logo.png': () => import('@/assets/images/integral/logos/integral-r-logo.png'),
'/images/integral/logos/integral-s-logo.png': () => import('@/assets/images/integral/logos/integral-s-logo.png'),
'/images/integral/logos/integral-e-1.png': () => import('@/assets/images/integral/logos/integral-e-1.png'),
'/images/icons/seat.svg': () => import('@/assets/images/icons/seat.svg'),
'/images/icons/weight.svg': () => import('@/assets/images/icons/weight.svg'),
'/images/icons/shield-check.svg': () => import('@/assets/images/icons/shield-check.svg'),
'/images/icons/certification.svg': () => import('@/assets/images/icons/certification.svg'),
'/images/icons/picto-contact.svg': () => import('@/assets/images/icons/picto-contact.svg'),
'/images/testimonials/midi-pyrenees-voltige.jpg': () => import('@/assets/images/testimonials/midi-pyrenees-voltige.jpg'),
'/images/testimonials/aero-club-chateauroux.jpg': () => import('@/assets/images/testimonials/aero-club-chateauroux.jpg'),
'/images/integral/backgrounds/hangar-dark.png': () => import('@/assets/images/integral/backgrounds/hangar-dark.png'),

// 360° images (dynamic import pattern)
...Array.from({length: 70}, (_, i) => {
  const num = String(i + 1).padStart(3, '0');
  return {
    [`/images/integral/360/IntegralRX2_${num}.png`]: () => import(`@/assets/images/integral/360/IntegralRX2_${num}.png`)
  };
}).reduce((acc, curr) => ({...acc, ...curr}), {}),
```

## File Size Considerations

### Expected File Sizes (After Optimization)
- **Hero Video**: ~5-10MB (original), ~2-3MB (mobile)
- **360° Images**: ~50-100KB each (70 images = ~3.5-7MB total)
- **Model Logos**: ~10-20KB each
- **Icons**: ~2-5KB each (SVG)
- **Testimonial Logos**: ~20-50KB each
- **Background Images**: ~200-500KB

### Loading Strategy
1. **Critical Path**: Hero video poster, model logos, feature icons
2. **Above Fold**: First few 360° images for initial viewer display
3. **Lazy Load**: Remaining 360° images, testimonial logos, background images
4. **Progressive**: Load 360° images in sequence as user interacts

## Quality Assurance Checklist

### Asset Validation
- [ ] All referenced assets exist in expected locations
- [ ] Image dimensions are consistent where required
- [ ] SVG icons are properly formatted and scalable
- [ ] Video plays correctly in all target browsers
- [ ] WebP images have PNG fallbacks
- [ ] Optimized images maintain acceptable quality

### Performance Validation
- [ ] Total asset size is reasonable for target audience
- [ ] Critical assets load quickly
- [ ] Lazy loading works correctly
- [ ] Progressive enhancement gracefully handles missing assets

### Legal Compliance
- [ ] All assets are properly licensed for use
- [ ] Copyright notices preserved where required
- [ ] Third-party logos used with permission

This asset extraction plan ensures all required media is properly organized, optimized, and integrated into the React application while maintaining performance and quality standards.