# ContactHero Component

## Purpose
Create a specialized hero section component for the contact page that displays "CONTACT" title with the Contact_Img.jpg background image from the crawl.

## Component Location
`src/components/sections/ContactHero.tsx`

## Component Specification

### Props Interface
```typescript
interface ContactHeroProps {
  className?: string;
}
```

### Visual Design
- **Background**: Contact_Img.jpg image (640x500px from crawl)
- **Overlay**: Semi-transparent blue overlay for text readability  
- **Typography**: Large "CONTACT" heading using Rajdhani font (font-heading)
- **Layout**: Centered text over background image
- **Responsive**: Adjusts text size on mobile/desktop

### Implementation Details

#### Background Image
- Source: `/crawl/yankeeaviation.com/wp-content/uploads/2020/09/Contact_Img.jpg`
- Destination: `/public/images/contact-hero-bg.jpg`
- CSS: `background-size: cover`, `background-position: center`

#### Typography
- Main heading: "CONTACT"
- Font: `font-heading` (Rajdhani)  
- Size: `text-4xl md:text-5xl`
- Weight: `font-bold`
- Color: White text with text shadow for readability
- Letter spacing: `tracking-wide`

#### Layout Structure
```
<section className="hero-container">
  <div className="background-image-layer">
  <div className="overlay-layer">
  <div className="content-container">
    <div className="text-center">
      <h1>CONTACT</h1>
    </div>
  </div>
</section>
```

### Styling Requirements
- **Responsive height**: `py-16` for adequate spacing
- **Background overlay**: Blue overlay at 40% opacity matching site theme
- **Text contrast**: Ensure WCAG AA compliance for white text on blue overlay
- **Mobile optimization**: Smaller text and padding on mobile devices

### Accessibility Features
- Proper heading hierarchy (h1 for page title)
- Alt text for background image (decorative, so aria-hidden)
- Sufficient color contrast for text readability
- Focus management for keyboard navigation

### Reusability
This component is specific to the contact page but follows the same pattern as other hero components in the project (PageHero, SimpleAboutHero) for consistency.

### Dependencies
- `@/utils/cn` for className utility
- Tailwind CSS classes
- Background image asset in public/images/

### Usage Example
```tsx
import { ContactHero } from '@/components/sections/ContactHero';

// In ContactPage.tsx
<ContactHero />
```

### Testing Considerations
- Verify background image loads correctly
- Test text readability across different screen sizes
- Ensure responsive behavior on mobile/tablet/desktop
- Validate accessibility with screen readers