# Font Analysis and Implementation Plan

## Current Font Analysis

### Original Site Fonts (from crawl)
Based on the crawl analysis of yankeeaviation.com, the original site uses:

**Primary Fonts:**
- **Roboto** (300, 400, 700 weights) - Used for body text
- **Rajdhani** (400, 600, 700 weights) - Used for headings

**Font Loading:**
```html
<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto%3A300%2C400%2C700%7CRajdhani%3A400%2C700%2C600&ver=6.8.1" media="all">
```

**Typography Hierarchy:**
- Body text: Roboto (primary font for paragraphs, general content)
- Headings: Rajdhani (strong, display font for titles and headers)
- H1: 54px, weight 600, line-height 1.2
- H2: 40px, line-height 1.2
- H3: 24px, line-height 1.2
- Body: 18px, weight 100, line-height 1.6

### Current Site Fonts
The current implementation uses:
- **Segoe UI, Tahoma, Geneva, Verdana, sans-serif** - Generic system fonts
- No web fonts loaded
- Basic fallback font stack

## Font Comparison

| Element | Original Site | Current Site | Match Status |
|---------|---------------|--------------|--------------|
| Body Text | Roboto | Segoe UI | ❌ No match |
| Headings | Rajdhani | Segoe UI | ❌ No match |
| Font Loading | Google Fonts | None | ❌ No web fonts |
| Typography Scale | Professional scale | Basic | ❌ Needs improvement |

## Implementation Plan

### 1. Add Google Fonts Integration
- Add Google Fonts preconnect for performance
- Load Roboto (300, 400, 700) and Rajdhani (400, 600, 700)
- Update base layout template

### 2. Update CSS Typography
- Replace generic font stack with Roboto for body text
- Apply Rajdhani to all heading elements (h1-h6)
- Implement proper font weights and sizes matching original

### 3. Typography Scale Implementation
```css
/* Body text - Roboto */
body {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
}

/* Headings - Rajdhani */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  line-height: 1.4;
}

h1 { font-size: 54px; line-height: 1.2; }
h2 { font-size: 40px; line-height: 1.2; }
h3 { font-size: 24px; line-height: 1.2; }
h4 { font-size: 18px; line-height: 1.2; }
h5 { font-size: 14px; line-height: 1.4; }
h6 { font-size: 12px; line-height: 1.4; }
```

### 4. Performance Considerations
- Use font-display: swap for better loading experience
- Preload critical font files
- Implement proper fallback fonts

### 5. Responsive Typography
- Adjust font sizes for mobile devices
- Ensure proper scaling across viewport sizes
- Maintain readability on all screen sizes

## Files to Update

1. **src/_includes/layouts/base.html**
   - Add Google Fonts link in head section
   - Add preconnect for performance

2. **src/css/style.css**
   - Update body font-family to Roboto
   - Update heading font-family to Rajdhani
   - Implement proper typography scale
   - Add responsive font sizing

## Benefits of Implementation

1. **Brand Consistency** - Matches original site typography exactly
2. **Professional Appearance** - Rajdhani provides strong, modern headlines
3. **Readability** - Roboto is highly readable for body content
4. **Performance** - Google Fonts CDN provides optimized delivery
5. **Scalability** - Proper typography hierarchy supports content growth

## Testing Checklist

- [ ] Verify Google Fonts load correctly
- [ ] Test typography hierarchy on all pages
- [ ] Check mobile responsiveness
- [ ] Validate font weights display properly
- [ ] Ensure fallback fonts work if web fonts fail
- [ ] Performance test with web fonts loaded

## Success Metrics

- Typography matches original site exactly
- Page load performance remains acceptable
- All font weights and styles render correctly
- Responsive design maintains readability
- Brand consistency achieved across all pages