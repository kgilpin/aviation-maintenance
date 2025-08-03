# Component Refinements

**Components**: HeroSection, Layout, Navigation
**Priority**: Low
**Focus**: Alignment with original design and functionality

## HeroSection Component Updates

**File**: `src/components/sections/HeroSection.tsx`

### Current vs Target Design

**Current**: Simple hero with image background and amenities focus
**Target**: Video background with FBO messaging and company branding

### Required Changes

1. **Background Media Support**
   ```typescript
   interface HeroBackground {
     type: 'image' | 'video';
     image?: string;
     video?: string;
     poster?: string;
     autoplay?: boolean;
     muted?: boolean;
     loop?: boolean;
   }
   ```

2. **Video Background Implementation**
   ```jsx
   const renderBackground = () => {
     if (background.type === 'video' && background.video) {
       return (
         <video
           className="absolute inset-0 w-full h-full object-cover"
           autoPlay={background.autoplay}
           muted={background.muted}
           loop={background.loop}
           poster={background.poster}
           playsInline
         >
           <source src={background.video} type="video/mp4" />
           {background.poster && (
             <img 
               src={background.poster} 
               alt="Video fallback"
               className="w-full h-full object-cover" 
             />
           )}
         </video>
       );
     }
     
     return (
       <img 
         src={background.image} 
         alt="Hero background"
         className="absolute inset-0 w-full h-full object-cover"
       />
     );
   };
   ```

3. **Content Layout Updates**
   - **Company name prominence**: Larger, script font styling
   - **Tagline integration**: "A Leading Fixed Base Operator"
   - **Description text**: Multi-paragraph professional copy
   - **CTA button**: "LEARN MORE" linking to maintenance

4. **Mobile Responsiveness**
   - Video disabled on mobile (use poster image)
   - Text scaling for smaller screens
   - Touch-friendly CTA button

## Layout Component Updates

**File**: `src/components/layout/Layout.tsx`

### Header Integration
1. **Company Branding Area**
   - Falcon Air Inc. in script font
   - Lawrence Municipal Airport subtitle
   - North Andover, Massachusetts location

2. **Navigation Integration**
   - Horizontal menu with proper spacing
   - Phone number as clickable element
   - Mobile hamburger menu

### Typography Loading
Add custom font loading for company branding:
```css
@import url('path-to-belinda-font');

.company-name {
  font-family: 'belinda-w00-regular', script, cursive;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
}

.location-subtitle {
  font-family: 'open sans condensed', sans-serif;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
```

## Navigation Component Updates

**File**: `src/components/layout/Navigation.tsx`

### Menu Structure
```jsx
const navigationItems = [
  { label: 'FBO/PRICES', href: '/services/', id: 'services' },
  { label: 'MAINTENANCE', href: '/maintenance/', id: 'maintenance' },
  { label: 'AMMENITIES', href: '/ammenities/', id: 'ammenities' },
  { label: 'CONTACT', href: '/map/', id: 'contact' },
  { label: 'AIRCRAFT FOR SALE', href: '/for-sale/', id: 'aircraft-for-sale' },
  { label: 'REVIEWS', href: '/reviews/', id: 'reviews' },
  { 
    label: '978-689-4492', 
    href: 'tel:978-689-4492', 
    id: 'phone',
    type: 'phone',
    external: true 
  }
];
```

### Phone Number Styling
```jsx
const renderNavItem = (item) => {
  const isPhone = item.type === 'phone';
  
  return (
    <a
      href={item.href}
      className={cn(
        'nav-item',
        isPhone && 'phone-link font-bold text-primary'
      )}
      {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {isPhone && <PhoneIcon className="w-4 h-4 inline mr-1" />}
      {item.label}
    </a>
  );
};
```

### Mobile Menu Enhancements
- Collapsible navigation for mobile
- Company branding remains visible
- Phone number prominently displayed
- Smooth animations

## Additional Component Considerations

### PhoneContact Component
**File**: `src/components/ui/PhoneContact.tsx`

Ensure phone component handles:
- Formatted display: (978) 689-4492
- Clickable tel: links
- Icon integration
- Mobile optimization

### CompanyBrand Component  
**File**: `src/components/ui/CompanyBrand.tsx`

Create/update for consistent branding:
- Company name with script font
- Location subtitle
- Responsive sizing
- Reusable across components

## Styling Updates

### Tailwind Config Extensions
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'company': ['belinda-w00-regular', 'script', 'cursive'],
        'aviation': ['open sans condensed', 'sans-serif'],
        'body': ['brandon-grot-w01-light', 'sans-serif']
      },
      colors: {
        'aviation-primary': '#292929',
        'aviation-text': '#212121'
      }
    }
  }
}
```

### CSS Custom Properties
```css
:root {
  --company-font: 'belinda-w00-regular', script, cursive;
  --aviation-font: 'open sans condensed', sans-serif;
  --body-font: 'brandon-grot-w01-light', sans-serif;
  --aviation-primary: #292929;
  --aviation-text: #212121;
}
```

## Implementation Priority

1. **High Priority**:
   - Video background support in HeroSection
   - Navigation structure updates
   - Company branding integration

2. **Medium Priority**:
   - Typography/font loading
   - Mobile responsiveness enhancements
   - Phone contact improvements

3. **Low Priority**:
   - Animation enhancements
   - Advanced mobile menu features
   - Performance optimizations

## Testing Requirements

- [ ] Video background plays correctly
- [ ] Mobile fallback to poster image works
- [ ] Navigation menu functions properly
- [ ] Phone number links work on mobile
- [ ] Company branding displays correctly
- [ ] Font loading doesn't cause layout shift
- [ ] Mobile menu operates smoothly
- [ ] Accessibility maintained (keyboard navigation, screen readers)

## Dependencies

- Custom font files (belinda-w00-regular)
- Video processing/optimization
- Icon library for phone/mobile icons
- Animation library (if enhanced transitions needed)