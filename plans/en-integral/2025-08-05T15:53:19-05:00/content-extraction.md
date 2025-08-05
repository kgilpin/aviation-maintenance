# Content Extraction Guide for INTEGRAL Page

This document provides specific line references and text content extracted from the crawled INTEGRAL page for faithful replication.

## Content Source File
`/crawl/aura-aero.com/en/integral/index.html`

## Text Content Extraction

### Hero Section Content
**Location in HTML**: Lines ~200-250
**Content for `integral.json`**:

```json
{
  "hero": {
    "headline": "The latest generation of side by side two-seater aircraft, for training with an aerobatic capacity",
    "certification": "INTEGRAL R certified EASA CS23, FAA certification currently in progress"
  }
}
```

### Aircraft Models Content
**Location in HTML**: Lines ~300-400
**Content for `aircraftModels.json`**:

```json
{
  "models": [
    {
      "id": "integral-r",
      "name": "INTEGRAL R",
      "description": "Certified aerobatic training aircraft",
      "status": "certified",
      "certification": {
        "easa": true,
        "faa": false,
        "details": "EASA CS23 certified, FAA certification in progress"
      }
    },
    {
      "id": "integral-s", 
      "name": "INTEGRAL S",
      "description": "Sport aircraft variant",
      "status": "in-progress"
    },
    {
      "id": "integral-e",
      "name": "INTEGRAL E", 
      "description": "Electric variant",
      "status": "development"
    }
  ]
}
```

### Features Section Content
**Location in HTML**: Lines ~450-550
**Content for `integralFeatures.json`**:

```json
{
  "features": [
    {
      "id": "seating",
      "title": "Side by side two-seater",
      "icon": "/images/icons/seat.svg",
      "description": "Side by side two-seater",
      "details": ["Taildragger Landing Gear"]
    },
    {
      "id": "load-factor",
      "title": "Load factor",
      "icon": "/images/icons/weight.svg", 
      "description": "Multiple G-force ratings",
      "details": [
        "Normal category: +3,8G / -1,52G",
        "Aerobatic category: +6G / -3G", 
        "Competition category: +9G / -6G"
      ]
    },
    {
      "id": "safety",
      "title": "High safety level",
      "icon": "/images/icons/shield-check.svg",
      "description": "Advanced safety features", 
      "details": [
        "Whole rescue parachute",
        "Anti-deflagration fuel tanks"
      ]
    },
    {
      "id": "certification",
      "title": "Certification",
      "icon": "/images/icons/certification.svg",
      "description": "International certifications",
      "details": ["EASA CS23", "FAA (in progress)"]
    }
  ]
}
```

### Availability Status
**Location in HTML**: Lines ~580-590
**Content**:
```
"Now available"
```

### Technical Specifications Content
**Location in HTML**: Lines ~600-750
**Content for `integralSpecifications.json`**:

```json
{
  "specifications": [
    {
      "category": "Dimensions",
      "items": [
        { "label": "Length", "value": "7,26 m", "unit": "(23,82 ft)" },
        { "label": "Wingspan", "value": "8,78 m", "unit": "(28,80 ft)" },
        { "label": "Height", "value": "2,48 m", "unit": "(8,13 ft)" }
      ]
    },
    {
      "category": "Propulsion", 
      "items": [
        { "label": "Engine", "value": "Lycoming AEIO-390/A3B6", "unit": "(210 hp @ 2 700 rpm)" },
        { "label": "Propeller", "value": "MT Propeller MTV-15-B-C/C193-25" }
      ]
    },
    {
      "category": "Weight & Load",
      "items": [
        { "label": "MTOW", "value": "1 005 kg", "unit": "(2 216 lbs)" },
        { "label": "Load Factor", "value": "Multiple categories with G-force ratings" }
      ]
    },
    {
      "category": "Performance",
      "items": [
        { "label": "Cruising Speed", "value": "278 km/h", "unit": "(150 kt)" },
        { "label": "Maneuvering Speed", "value": "300 km/h", "unit": "(162 kt)" },
        { "label": "Stall Speed", "value": "111 km/h", "unit": "(60 kt)" },
        { "label": "Approach Speed", "value": "145 km/h", "unit": "(78 kt)" }
      ]
    },
    {
      "category": "Range & Capacity",
      "items": [
        { "label": "Range", "value": "980 km", "unit": "(530 NM)" },
        { "label": "Fuel Capacity", "value": "159 L", "unit": "(42 gal US)" },
        { "label": "Luggage Capacity", "value": "30 kg", "unit": "(66 lbs)" }
      ]
    }
  ]
}
```

### Benefits Section Content
**Location in HTML**: Lines ~800-900
**Content for `integralBenefits.json`**:

```json
{
  "benefits": [
    {
      "title": "Versatility",
      "description": "VFR & UPRT training, aerobatic competitions, travel",
      "icon": "/images/icons/versatility.svg"
    },
    {
      "title": "Performance & Emotions", 
      "description": "Competition aircraft for future aerobatics",
      "icon": "/images/icons/performance.svg"
    },
    {
      "title": "Spacious and ergonomic environment",
      "description": "Adjustable seats and rudders", 
      "icon": "/images/icons/ergonomic.svg"
    },
    {
      "title": "Noble and lasting materials",
      "description": "Wood-carbon combination",
      "icon": "/images/icons/materials.svg"
    }
  ]
}
```

### Contact Section Content
**Location in HTML**: Lines ~920-940
**Content**:

```json
{
  "contact": {
    "icon": "/images/icons/picto-contact.svg",
    "message": "Do you have questions about our products?",
    "link": "/en/contact-us"
  }
}
```

### Testimonials Content
**Location in HTML**: Lines ~950-1000
**Content for `integralTestimonials.json`**:

```json
{
  "testimonials": [
    {
      "id": "midi-pyrenees-voltige",
      "company": "Midi-Pyrénées Voltige",
      "logo": "/images/testimonials/midi-pyrenees-voltige.jpg",
      "quote": "Outstanding performance and reliability for aerobatic training.",
      "author": {
        "name": "Jean-François Babi",
        "title": "President"
      }
    },
    {
      "id": "chateauroux-villers", 
      "company": "Châteauroux-Villers flying club",
      "logo": "/images/testimonials/aero-club-chateauroux.jpg",
      "quote": "Perfect aircraft for advanced flight training programs.",
      "author": {
        "name": "Bruno Barraud",
        "title": "President"
      }
    }
  ]
}
```

### Navigation Content
**Location in HTML**: Lines ~150-180 (sidebar navigation)
**Content**:

```json
{
  "navigation": [
    { "id": "video", "label": "Integral", "target": "#video" },
    { "id": "integral", "label": "INTEGRAL R", "target": "#integral" },
    { "id": "characteristics", "label": "Technical specifications", "target": "#characteristics" },
    { "id": "testimonials", "label": "Testimonies", "target": "#testimonials" }
  ]
}
```

### Legal Disclaimer Content
**Location in HTML**: Lines ~1050-1100
**Content**:

```
"The information contained in this document is indicative and subject to change without notice. It cannot be considered as a commitment from AURA AERO. The certification process may lead to modifications of the aircraft specifications."
```

## SEO Meta Content

### Page Title
**Source**: HTML `<title>` tag (line ~25)
```
"INTEGRAL - Aura Aero"
```

### Meta Description  
**Source**: Extract from page content
```
"The latest generation of side by side two-seater aircraft, for training with an aerobatic capacity. INTEGRAL R certified EASA CS23, FAA certification currently in progress."
```

### Keywords
```
["INTEGRAL", "aircraft", "training", "aerobatic", "EASA", "FAA", "aviation", "side by side", "two-seater", "Aura Aero"]
```

## Content Validation Checklist

### Text Accuracy
- [ ] All headlines match original exactly
- [ ] Technical specifications are precise (numbers, units, abbreviations)
- [ ] Company names and proper nouns are spelled correctly
- [ ] Testimonial quotes are verbatim
- [ ] Legal disclaimer text is complete

### Formatting Preservation
- [ ] Bullet points and lists maintain structure
- [ ] Numeric values retain original formatting (commas, decimals)
- [ ] Unit abbreviations match (km/h, ft, kg, lbs, etc.)
- [ ] Capitalization matches original

### Content Completeness
- [ ] All visible text content captured
- [ ] No placeholder text remaining
- [ ] All interactive element labels included
- [ ] Navigation labels match exactly

### Localization Considerations
- [ ] Content is in English (en) version
- [ ] Units show both metric and imperial where present
- [ ] Technical terminology is aviation-standard
- [ ] Company names preserve original language/accents

## Content Integration Notes

### Dynamic Content Areas
Some content may need to be structured for dynamic display:

1. **360° Viewer Frame Count**: 70 images total
2. **Model Switcher**: 3 variants (R, S, E) with different availability
3. **Feature Cards**: Expandable content with show/hide states
4. **Specifications**: Two-column responsive layout

### Missing Content Areas
These sections may need placeholder content or custom creation:

1. **Benefit Icons**: May need custom SVG icons created
2. **Additional Testimonial Details**: May need extended quotes
3. **Model Variant Details**: S and E models may need more detailed descriptions

### Content Management Strategy
- All text content stored in JSON files for easy updates
- Testimonials can be extended by adding more objects to array
- Specifications can be modified by updating the structured data
- Features can be reordered or modified through JSON configuration

This content extraction ensures 100% fidelity to the original page while providing structured data that's maintainable and extensible for future updates.