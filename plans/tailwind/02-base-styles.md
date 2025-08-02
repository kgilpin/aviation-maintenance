# Phase 1: Base Styles and Typography Migration

## Current Base Styles to Migrate

### Reset and Global Styles
```css
/* FROM style.css */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
    line-height: 1.6;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    color: #333;
    background-color: #fff;
}
```

### Typography Styles
```css
/* FROM style.css */
h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
p { margin-bottom: 1rem; }
```

## Tailwind Migration Plan

### 1. Base Layer Configuration
```css
/* ADD to tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif']
      },
      fontSize: {
        'display-1': '2.5rem',
        'display-2': '2rem',
      }
    }
  }
}
```

### 2. Base Styles in CSS
```css
/* ADD to input.css @layer base */
@layer base {
  html {
    @apply text-base leading-relaxed;
  }
  
  body {
    @apply font-system text-gray-800 bg-white;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold leading-tight mb-4;
  }
  
  h1 {
    @apply text-display-1;
  }
  
  h2 {
    @apply text-display-2;
  }
  
  p {
    @apply mb-4;
  }
}
```

### 3. Container Migration
```css
/* REPLACE .container with Tailwind component */
.container {
  @apply max-w-6xl mx-auto px-5;
}
```

## Implementation Steps

1. **Update tailwind.config.js** with custom font family and sizes
2. **Add base layer styles** to input.css
3. **Test typography** across all pages
4. **Update container class** usage
5. **Verify responsive typography** on mobile devices

## Verification Checklist

- [ ] All headings use correct font weights and sizes
- [ ] Body text uses system font stack
- [ ] Container widths match existing design
- [ ] Line heights and spacing are preserved
- [ ] Mobile typography is responsive