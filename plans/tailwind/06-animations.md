# Phase 5: Animations and Interactive States Migration

## Current Animation Styles

### 1. Animation Classes
```css
/* FROM style.css */
.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

.service-item,
.welcome-content,
.contact-form-wrapper {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.6s ease;
}
```

### 2. Hamburger Menu Animation
```css
/* FROM style.css */
.mobile-menu-toggle.active .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(2) {
    opacity: 0;
}

.mobile-menu-toggle.active .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}
```

### 3. Transition Effects
```css
/* FROM style.css */
.btn {
    transition: all 0.3s ease;
}

.nav-link {
    transition: all 0.3s ease;
}

.header-nav {
    transition: all 0.3s ease;
}

.form-input:focus {
    transition: border-color 0.3s ease;
}

.dot {
    transition: background-color 0.3s ease;
}

.slide {
    transition: opacity 1s ease-in-out;
}
```

## Tailwind Migration Strategy

### 1. Utility Classes for Animations
```css
@layer utilities {
  .animate-fade-in {
    @apply opacity-100 translate-y-0;
  }
  
  .animate-fade-out {
    @apply opacity-0 translate-y-4;
  }
  
  .transition-smooth {
    @apply transition-all duration-600 ease-in-out;
  }
}
```

### 2. Component Animation States
```css
@layer components {
  /* Scroll-triggered animations */
  .service-item,
  .welcome-content,
  .contact-form-wrapper {
    @apply opacity-100 translate-y-0 transition-all duration-600 ease-in-out;
  }
  
  /* Hamburger menu animations - keep as custom transform values */
  .mobile-menu-toggle.active .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .mobile-menu-toggle.active .hamburger-line:nth-child(2) {
    @apply opacity-0;
  }
  
  .mobile-menu-toggle.active .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
}
```

### 3. Tailwind Configuration for Custom Animations
```js
// ADD to tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        '600': '600ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    }
  }
}
```

## Interactive States Migration

### 1. Hover States
```css
@layer components {
  /* Button hover states - already migrated in previous phases */
  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300;
  }
  
  .btn-secondary {
    @apply bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300;
  }
  
  /* Navigation hover states */
  .nav-link {
    @apply block no-underline text-gray-800 font-medium px-6 py-3 border-b border-gray-200 transition-all duration-300 text-left hover:text-blue-600 hover:bg-slate-50;
  }
  
  /* Footer link hover states */
  .footer-copyright a {
    @apply text-slate-400 no-underline transition-colors duration-300 hover:text-white;
  }
  
  /* Slideshow dot hover states */
  .dot {
    @apply w-3 h-3 rounded-full border-0 bg-white bg-opacity-50 cursor-pointer transition-colors duration-300 hover:bg-white;
  }
}
```

### 2. Focus States
```css
@layer components {
  /* Form input focus states */
  .form-input, .form-textarea, .form-select {
    @apply w-full px-3 py-3 border border-gray-300 rounded text-base transition-all duration-300 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600 focus:ring-opacity-10;
  }
  
  /* Button focus states */
  .btn {
    @apply focus:outline-none focus:ring-4 focus:ring-opacity-50;
  }
  
  .btn-primary {
    @apply focus:ring-blue-600;
  }
  
  .btn-secondary {
    @apply focus:ring-blue-600;
  }
}
```

### 3. Active States
```css
@layer components {
  /* Navigation active states */
  .nav-link.active {
    @apply text-blue-600 bg-slate-50;
  }
  
  /* Slideshow active states */
  .slide.active {
    @apply opacity-100;
  }
  
  .dot.active {
    @apply bg-white;
  }
  
  /* Navigation dropdown active state */
  .header-nav.active {
    @apply translate-y-0 opacity-100 visible;
  }
}
```

## Scroll-Triggered Animations

### JavaScript Integration
The current site uses JavaScript for scroll-triggered animations. This functionality should remain unchanged, but the CSS classes will be migrated:

```js
// EXISTING JavaScript (no changes needed)
// Observes elements and adds 'animate-in' class when in viewport
const observeElements = () => {
  const elements = document.querySelectorAll('.service-item, .welcome-content, .contact-form-wrapper');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  });
  
  elements.forEach(el => observer.observe(el));
};
```

### CSS Classes for JavaScript
```css
@layer utilities {
  /* Classes used by JavaScript */
  .animate-in {
    @apply opacity-100 translate-y-0 !important;
  }
  
  /* Default state for animated elements */
  .animate-on-scroll {
    @apply opacity-0 translate-y-4 transition-all duration-600 ease-in-out;
  }
}
```

## Performance Considerations

### 1. Hardware Acceleration
```css
@layer utilities {
  .gpu-accelerated {
    @apply transform-gpu;
  }
}
```

### 2. Reduced Motion Support
```css
@layer base {
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

## Implementation Steps

1. **Add animation configuration** to tailwind.config.js
2. **Migrate button and link transitions**
3. **Migrate form focus states** with ring effects
4. **Migrate scroll-triggered animations**
5. **Test hamburger menu animations**
6. **Test slideshow transitions**
7. **Add accessibility considerations** for reduced motion
8. **Performance test** animations on different devices

## Verification Checklist

- [ ] All button hover states work smoothly
- [ ] Navigation dropdown animates correctly
- [ ] Form inputs have proper focus rings
- [ ] Hamburger menu transforms correctly
- [ ] Slideshow transitions are smooth
- [ ] Scroll-triggered animations work
- [ ] Reduced motion preferences are respected
- [ ] Performance is maintained on mobile devices
- [ ] All transitions feel consistent and polished