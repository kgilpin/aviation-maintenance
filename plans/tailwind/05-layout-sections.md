# Phase 4: Layout Sections Migration

## Layout Sections to Migrate

### 1. Hero Slideshow Section

#### Current Styles
```css
/* FROM style.css */
.hero-slideshow {
    position: relative;
    height: 60vh;
    overflow: hidden;
}

.slideshow-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1s ease-in-out;
}

.slide.active {
    opacity: 1;
}

.slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.slide-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    background: rgba(0,0,0,0.5);
    padding: 2rem;
    border-radius: 8px;
}

.slideshow-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background-color: rgba(255,255,255,0.5);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.dot.active,
.dot:hover {
    background-color: white;
}
```

#### Tailwind Migration
```css
@layer components {
  .hero-slideshow {
    @apply relative h-[60vh] overflow-hidden;
  }
  
  .slideshow-container {
    @apply relative w-full h-full;
  }
  
  .slide {
    @apply absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-1000 ease-in-out;
  }
  
  .slide.active {
    @apply opacity-100;
  }
  
  .slide img {
    @apply w-full h-full object-cover;
  }
  
  .slide-content {
    @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white bg-black bg-opacity-50 p-8 rounded-lg;
  }
  
  .slideshow-dots {
    @apply absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5;
  }
  
  .dot {
    @apply w-3 h-3 rounded-full border-0 bg-white bg-opacity-50 cursor-pointer transition-colors duration-300 hover:bg-white;
  }
  
  .dot.active {
    @apply bg-white;
  }
}
```

### 2. Welcome Section

#### Current Styles
```css
/* FROM style.css */
.welcome-section {
    padding: 4rem 0;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    text-align: center;
}

.welcome-heading {
    color: #1e293b;
    margin-bottom: 2rem;
}

.welcome-text {
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.1rem;
    color: #475569;
}

.welcome-text p strong {
    color: #2563eb;
}
```

#### Tailwind Migration
```css
@layer components {
  .welcome-section {
    @apply py-16 bg-gradient-to-br from-slate-50 to-slate-200 text-center;
  }
  
  .welcome-heading {
    @apply text-slate-800 mb-8;
  }
  
  .welcome-text {
    @apply max-w-4xl mx-auto text-lg text-slate-600;
  }
  
  .welcome-text p strong {
    @apply text-blue-600;
  }
}
```

### 3. Services Section

#### Current Styles
```css
/* FROM style.css */
.services-section {
    padding: 4rem 0;
}

.service-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    margin-bottom: 4rem;
    padding: 2rem 0;
}

.service-item.reverse {
    direction: rtl;
}

.service-item.reverse * {
    direction: ltr;
}

.service-content h3 {
    color: #1e293b;
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.service-content p {
    color: #64748b;
    line-height: 1.7;
}

.service-image {
    text-align: center;
}

.service-image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
```

#### Tailwind Migration
```css
@layer components {
  .services-section {
    @apply py-16;
  }
  
  .service-item {
    @apply grid grid-cols-2 gap-12 items-center mb-16 py-8;
  }
  
  .service-item.reverse {
    @apply [direction:rtl];
  }
  
  .service-item.reverse * {
    @apply [direction:ltr];
  }
  
  .service-content h3 {
    @apply text-slate-800 mb-4 text-2xl;
  }
  
  .service-content p {
    @apply text-slate-500 leading-relaxed;
  }
  
  .service-image {
    @apply text-center;
  }
  
  .service-image img {
    @apply max-w-full h-auto rounded-lg shadow-xl;
  }
}
```

### 4. Contact Section

#### Current Styles
```css
/* FROM style.css */
.contact-section {
    padding: 4rem 0;
    background: #f8fafc;
}

.contact-form-wrapper {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.contact-heading {
    text-align: center;
    color: #1e293b;
    margin-bottom: 2rem;
}
```

#### Tailwind Migration
```css
@layer components {
  .contact-section {
    @apply py-16 bg-slate-50;
  }
  
  .contact-form-wrapper {
    @apply max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl;
  }
  
  .contact-heading {
    @apply text-center text-slate-800 mb-8;
  }
}
```

### 5. Footer Section

#### Current Styles
```css
/* FROM style.css */
.footer {
    background: #1e293b;
    color: #94a3b8;
    padding: 2rem 0;
}

.footer-content {
    text-align: center;
}

.footer-copyright {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.footer-copyright a {
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-copyright a:hover {
    color: white;
}
```

#### Tailwind Migration
```css
@layer components {
  .footer {
    @apply bg-slate-800 text-slate-400 py-8;
  }
  
  .footer-content {
    @apply text-center;
  }
  
  .footer-copyright {
    @apply flex justify-center items-center gap-8;
  }
  
  .footer-copyright a {
    @apply text-slate-400 no-underline transition-colors duration-300 hover:text-white;
  }
}
```

## Responsive Design Migration

### Mobile Breakpoints
```css
@layer components {
  /* Mobile: 768px and below */
  @media (max-width: 768px) {
    .hero-slideshow {
      @apply h-[40vh];
    }
    
    .service-item {
      @apply grid-cols-1 gap-8 text-center;
    }
    
    .service-item.reverse {
      @apply [direction:ltr];
    }
    
    .footer-copyright {
      @apply flex-col gap-4;
    }
  }
  
  /* Small mobile: 480px and below */
  @media (max-width: 480px) {
    .welcome-section,
    .services-section,
    .contact-section {
      @apply py-8;
    }
    
    .service-item {
      @apply mb-8;
    }
    
    .slideshow-dots {
      @apply bottom-2.5 gap-2;
    }
    
    .dot {
      @apply w-2.5 h-2.5;
    }
  }
}
```

## Implementation Steps

1. **Migrate hero slideshow components** and test image transitions
2. **Migrate welcome section** with gradient backgrounds
3. **Migrate services section** with grid layouts and reverse direction
4. **Migrate contact section** form wrapper styles
5. **Migrate footer** with proper link hover states
6. **Test responsive design** on all breakpoints
7. **Verify JavaScript functionality** for slideshow and interactions

## JavaScript Integration

### Slideshow Functionality
The slideshow requires JavaScript for:
- Automatic slide transitions
- Dot navigation clicks
- Slide activation (adding/removing 'active' class)

**Note**: JavaScript remains unchanged - only CSS classes are migrated.

## Verification Checklist

- [ ] Hero slideshow transitions work smoothly
- [ ] Welcome section gradient displays correctly
- [ ] Service items alternate layouts properly
- [ ] Contact form wrapper has proper shadow and styling
- [ ] Footer links have hover effects
- [ ] Responsive layouts work on mobile
- [ ] All animations and transitions are preserved
- [ ] JavaScript functionality remains intact