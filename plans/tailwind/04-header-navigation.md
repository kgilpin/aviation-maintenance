# Phase 3: Header and Navigation Migration

## Current Header Styles

### Header Structure
```css
/* FROM style.css */
.header {
    background: #fff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
}

.header-logo .logo-link {
    display: block;
}

.logo-image {
    height: 60px;
    width: auto;
}
```

### Navigation Styles
```css
/* FROM style.css */
.header-nav {
    position: absolute;
    top: 100%;
    right: 0;
    width: 280px;
    background: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border-radius: 8px;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.header-nav.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
}

.nav-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 0;
    margin: 0;
    padding: 0.5rem 0;
}

.nav-link {
    display: block;
    text-decoration: none;
    color: #333;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    transition: all 0.3s ease;
    text-align: left;
}

.nav-link:hover,
.nav-link.active {
    color: #2563eb;
    background-color: #f8fafc;
}

.nav-item:last-child .nav-link {
    border-bottom: none;
}
```

### Hamburger Menu
```css
/* FROM style.css */
.mobile-menu-toggle {
    display: flex;
    background: none;
    border: none;
    flex-direction: column;
    cursor: pointer;
    padding: 0.5rem;
}

.hamburger-line {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 3px 0;
    transition: 0.3s;
}

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

## Tailwind Migration

### Header Components
```css
@layer components {
  .header {
    @apply bg-white shadow-lg sticky top-0 z-50;
  }
  
  .header-wrapper {
    @apply flex items-center justify-between py-4;
  }
  
  .header-logo .logo-link {
    @apply block;
  }
  
  .logo-image {
    @apply h-15 w-auto;
  }
}
```

### Navigation Components
```css
@layer components {
  .header-nav {
    @apply absolute top-full right-0 w-70 bg-white shadow-md rounded-lg -translate-y-full opacity-0 invisible transition-all duration-300 ease-in-out;
  }
  
  .header-nav.active {
    @apply translate-y-0 opacity-100 visible;
  }
  
  .nav-list {
    @apply flex flex-col list-none gap-0 m-0 py-2;
  }
  
  .nav-link {
    @apply block no-underline text-gray-800 font-medium px-6 py-3 border-b border-gray-200 transition-all duration-300 text-left hover:text-blue-600 hover:bg-slate-50;
  }
  
  .nav-link.active {
    @apply text-blue-600 bg-slate-50;
  }
  
  .nav-item:last-child .nav-link {
    @apply border-b-0;
  }
}
```

### Hamburger Menu Components
```css
@layer components {
  .mobile-menu-toggle {
    @apply flex bg-transparent border-0 flex-col cursor-pointer p-2;
  }
  
  .hamburger-line {
    @apply block w-6 h-0.5 bg-gray-800 my-0.5 transition-all duration-300;
  }
  
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

### Responsive Navigation
```css
@layer components {
  /* Mobile adjustments */
  @media (max-width: 480px) {
    .header-nav {
      @apply w-62;
    }
  }
  
  @media (max-width: 360px) {
    .header-nav {
      @apply w-55;
    }
    
    .nav-link {
      @apply px-4 text-sm;
    }
  }
}
```

## Custom Tailwind Configuration

### Required Extensions
```js
// ADD to tailwind.config.js
module.exports = {
  theme: {
    extend: {
      width: {
        '55': '13.75rem',  // 220px
        '62': '15.625rem', // 250px  
        '70': '17.5rem',   // 280px
      },
      height: {
        '15': '3.75rem',   // 60px
      }
    }
  }
}
```

## Implementation Steps

1. **Add custom width/height values** to tailwind.config.js
2. **Migrate header component styles** to input.css
3. **Test header sticky behavior** and shadows
4. **Migrate navigation dropdown styles**
5. **Test hamburger menu animations** 
6. **Verify responsive navigation** on different screen sizes
7. **Test navigation JavaScript functionality**

## JavaScript Dependencies

### Navigation Toggle
The navigation requires JavaScript for:
- Hamburger menu toggle functionality
- Adding/removing 'active' classes
- Handling click outside to close menu

**Note**: JavaScript functionality should remain unchanged - only CSS classes are being migrated.

## Verification Checklist

- [ ] Header sticks to top with proper shadow
- [ ] Logo displays at correct size
- [ ] Hamburger menu toggles navigation dropdown
- [ ] Navigation dropdown appears with proper positioning
- [ ] Navigation links have hover and active states
- [ ] Hamburger animation works when menu opens/closes
- [ ] Responsive widths work on mobile devices
- [ ] Navigation closes when clicking outside
- [ ] Active page is highlighted in navigation