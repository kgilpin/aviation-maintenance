# Extract and Update Media Assets

**Directory**: `public/images/`
**Component**: Image and video assets for home page
**Priority**: Medium

## Media Assets Identified from Crawled Content

### Hero Background Video
**Source**: `ca1a47_06e2bbf23113459f91f0e62d1b63a1cc`
- **Format**: MP4 video with multiple quality options
- **Poster Image**: `ca1a47_06e2bbf23113459f91f0e62d1b63a1ccf000.jpg`
- **Usage**: Hero section background
- **Properties**: Auto-play, muted, loop

### Gallery Images
From the crawled slideshow content:

1. **Calendar Image**: `ca1a47_16711deae98342edb7dc1cec4d866ca6~mv2.jpg`
   - **Alt**: "Calendar 3.jpg" 
   - **Usage**: Header decoration, aviation scheduling context

2. **Corporate Aircraft Association Logo**: `ca1a47_ee7af9014ccf424da88bcdf9e0ee72e8~mv2.jpg`
   - **Alt**: "00001.jpg"
   - **Link**: https://www.corpaa.us/
   - **Usage**: Partner logo section

### Additional Images from Existing Data
Current `home.json` references these images that may need updating:

- `ca1a47_111c812a88e04b5d8429a307aae04e76_mv2.jpg` - Aircraft maintenance facility
- `ca1a47_902062e0beeb4cefac47bbf887098114_mv2.jpg` - Airport runway view  
- `ca1a47_16711deae98342edb7dc1cec4d866ca6_mv2.jpg` - Aircraft on tarmac
- `ca1a47_740b76e3e9214f008de55c55306a51e7_mv2.jpg` - Corporate aircraft
- `ca1a47_0562f7c87f6f440b9370316590db2ba3_mv2.jpg` - Office interior

### Partner Logos Referenced
- `ca1a47_605b8d8be58f45f285ce21996ef01571_mv2.png` - FAA logo
- `ca1a47_df67783738c146feabd392ca5f07e639_mv2.png` - NBAA logo  
- `ca1a47_bdd518e626cd47019736b846ee506b39_mv2.png` - American Bonanza Society logo

## Media Extraction Tasks

### 1. Hero Video/Poster Extraction
```bash
# Extract video from crawled content
# Source: https://static.wixstatic.com/video/ca1a47_06e2bbf23113459f91f0e62d1b63a1cc/[quality]/mp4/file.mp4

# Extract poster image
# Source: https://static.wixstatic.com/media/ca1a47_06e2bbf23113459f91f0e62d1b63a1ccf000.jpg
```

**Target Files**:
- `public/videos/hero-background.mp4` (or multiple qualities)
- `public/images/hero-poster.jpg`

### 2. Partner Logo Extraction
```bash
# Extract partner/certification logos
# FAA, NBAA, Corporate Aircraft Association, American Bonanza Society
```

**Target Files**:
- `public/images/partners/faa-logo.png`
- `public/images/partners/nbaa-logo.png` 
- `public/images/partners/corpaa-logo.jpg`
- `public/images/partners/american-bonanza-society-logo.png`

### 3. Gallery Image Updates
```bash
# Extract high-quality gallery images showing:
# - Aircraft maintenance facilities
# - Airport/runway views
# - Corporate aircraft
# - FBO customer areas
```

**Target Files**:
- `public/images/gallery/maintenance-facility.jpg`
- `public/images/gallery/runway-view.jpg`
- `public/images/gallery/aircraft-tarmac.jpg`
- `public/images/gallery/corporate-aircraft.jpg`
- `public/images/gallery/office-interior.jpg`

### 4. Calendar/Decoration Image
```bash
# Extract calendar/schedule image for header decoration
```

**Target Files**:
- `public/images/calendar-aviation.jpg`

## Media Data File Updates  

Update `src/data/media.json` to document extracted assets:

```json
{
  "hero": {
    "video": {
      "src": "/videos/hero-background.mp4",
      "poster": "/images/hero-poster.jpg", 
      "description": "Aviation background video showing aircraft operations",
      "autoplay": true,
      "muted": true,
      "loop": true
    }
  },
  "gallery": {
    "maintenance": {
      "src": "/images/gallery/maintenance-facility.jpg",
      "alt": "Professional aircraft maintenance facility",
      "description": "State-of-the-art maintenance hangar"
    },
    "runway": {
      "src": "/images/gallery/runway-view.jpg", 
      "alt": "Lawrence Municipal Airport runway view",
      "description": "Airport operations and runway facilities"
    },
    "aircraft": {
      "src": "/images/gallery/aircraft-tarmac.jpg",
      "alt": "Aircraft on airport tarmac", 
      "description": "Various aircraft serviced at the facility"
    },
    "corporate": {
      "src": "/images/gallery/corporate-aircraft.jpg",
      "alt": "Corporate aircraft services",
      "description": "Business aviation and corporate flight services"
    },
    "office": {
      "src": "/images/gallery/office-interior.jpg",
      "alt": "FBO customer service area",
      "description": "Professional customer service facilities"
    }
  },
  "partners": {
    "faa": {
      "src": "/images/partners/faa-logo.png",
      "alt": "FAA - Federal Aviation Administration",
      "link": "https://www.faa.gov/"
    },
    "nbaa": {
      "src": "/images/partners/nbaa-logo.png", 
      "alt": "NBAA - National Business Aviation Association",
      "link": "https://nbaa.org/"
    },
    "corpaa": {
      "src": "/images/partners/corpaa-logo.jpg",
      "alt": "Corporate Aircraft Association", 
      "link": "https://www.corpaa.us/"
    },
    "americanBonanza": {
      "src": "/images/partners/american-bonanza-society-logo.png",
      "alt": "American Bonanza Society",
      "link": "https://www.americanbonanza.org/"
    }
  },
  "decorative": {
    "calendar": {
      "src": "/images/calendar-aviation.jpg",
      "alt": "Aviation industry calendar and scheduling",
      "usage": "Header decoration"
    }
  }
}
```

## Extraction Commands

Use the extract-images command to extract media from crawled content:

```bash
# Extract all images from home page
/extract-images home

# This will:
# 1. Parse crawled HTML for image references
# 2. Download images to public/images/home/
# 3. Update media.json with metadata
```

## Implementation Notes

### Video Considerations
- **Multiple Qualities**: Original has 480p, 720p, 1080p versions
- **Mobile Fallback**: Use poster image for mobile devices
- **Performance**: Consider lazy loading for large video files

### Image Optimization
- **WebP Conversion**: Convert images to WebP for better performance
- **Responsive Images**: Generate multiple sizes for different breakpoints
- **Alt Text**: Ensure all images have meaningful alt text

### Legal Considerations
- **Logo Usage**: Verify rights to use partner/certification logos
- **Image Rights**: Ensure proper licensing for extracted images

## Dependencies

- Image extraction script/tool
- Video processing capabilities
- WebP conversion tools
- Media optimization pipeline

## Testing

- [ ] All images load correctly
- [ ] Video plays properly with poster fallback
- [ ] Partner logos link to correct destinations
- [ ] Images are optimized for web delivery
- [ ] Alt text is meaningful and accessible
- [ ] Mobile performance is acceptable