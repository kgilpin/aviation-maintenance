# GoogleMapsEmbed Component

## Purpose
Create a reusable Google Maps embed component that displays the Plymouth Municipal Airport location with the exact coordinates and embed URL from the crawled contact page.

## Component Location
`src/components/ui/GoogleMapsEmbed.tsx`

## Component Specification

### Props Interface
```typescript
interface GoogleMapsEmbedProps {
  embedUrl: string;
  width?: string | number;
  height?: string | number;
  title?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}
```

### Crawled Data Reference
From the crawled contact page:
```html
<iframe 
  loading="lazy" 
  width="100%" 
  height="150" 
  frameborder="0" 
  style="border:0" 
  allowfullscreen="" 
  data-src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11877.047118746543!2d-70.7313188!3d41.9087309!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7eb3c68301ff0fe6!2sPYM-Plymouth%20Municipal%20Airport!5e0!3m2!1sen!2sph!4v1601380173054!5m2!1sen!2sph"
>
</iframe>
```

### Implementation Details

#### Default Configuration
```typescript
const defaultProps = {
  width: "100%",
  height: 400,
  title: "Plymouth Municipal Airport - Yankee Aviation Location",
  loading: 'lazy' as const,
  className: ''
};
```

#### Component Structure
```tsx
export const GoogleMapsEmbed: React.FC<GoogleMapsEmbedProps> = ({
  embedUrl,
  width = "100%", 
  height = 400,
  title = "Google Maps",
  className,
  loading = 'lazy'
}) => {
  return (
    <div className={cn("w-full", className)}>
      <iframe
        src={embedUrl}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading={loading}
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="w-full rounded-lg shadow-sm"
      />
    </div>
  );
};
```

### Styling and Layout

#### Container Styling
- **Wrapper**: Full width container with optional className override
- **Border**: Rounded corners (`rounded-lg`) for modern appearance
- **Shadow**: Subtle shadow (`shadow-sm`) for depth
- **Responsive**: Maintains aspect ratio across screen sizes

#### iframe Styling
```css
/* iframe specific styles */
.maps-embed {
  @apply w-full rounded-lg shadow-sm border-0;
  min-height: 300px; /* Ensure minimum usable height */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .maps-embed {
    height: 250px; /* Shorter on mobile for better UX */
  }
}
```

### Accessibility Features

#### ARIA and Screen Reader Support
- **Title attribute**: Descriptive title for screen readers
- **Role**: iframe has implicit role, but ensure proper labeling
- **Focus management**: iframe is focusable and keyboard navigable
- **Alternative content**: Consider providing text-based directions as fallback

#### Implementation
```tsx
<iframe
  src={embedUrl}
  title="Plymouth Municipal Airport - Yankee Aviation Services Location Map"
  aria-label="Interactive map showing Yankee Aviation Services location at Plymouth Municipal Airport"
  // ... other props
/>
```

### Performance Considerations

#### Loading Strategy
- **Lazy loading**: Default to `loading="lazy"` for performance
- **Intersection Observer**: Could implement custom lazy loading for older browsers
- **Preconnect**: Add DNS preconnect to Google Maps domains

#### Optimization
```tsx
// In document head (via Helmet)
<link rel="preconnect" href="https://www.google.com" />
<link rel="preconnect" href="https://maps.google.com" />
```

### Error Handling

#### Fallback Content
```tsx
const [hasError, setHasError] = useState(false);

// Error boundary or error handling
if (hasError) {
  return (
    <div className="bg-gray-100 rounded-lg p-6 text-center">
      <div className="text-gray-600">
        <svg className="mx-auto h-12 w-12 mb-4" /* map icon */>
        <h3 className="font-medium text-gray-900">Map Unavailable</h3>
        <p className="mt-2 text-sm">
          We're located at 246 South Meadow Road, Gate 3<br />
          Plymouth Municipal Airport, Plymouth, MA 02360
        </p>
        <a 
          href="https://goo.gl/maps/77wH5wiK7ibGjvUo8"
          className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Google Maps →
        </a>
      </div>
    </div>
  );
}
```

### Integration with Contact Data

#### Usage with Contact Hook
```tsx
// In ContactPage.tsx
import { useContactData } from '@/hooks/useContactData';
import { GoogleMapsEmbed } from '@/components/ui/GoogleMapsEmbed';

const ContactPage: React.FC = () => {
  const contactData = useContactData();
  
  return (
    <Layout>
      {/* Other content */}
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-heading">
              Find Us
            </h2>
            <p className="mt-2 text-gray-600 font-body">
              Visit us at Plymouth Municipal Airport
            </p>
          </div>
          
          <GoogleMapsEmbed 
            embedUrl={contactData.googleMaps.embedUrl}
            height={400}
            title="Yankee Aviation Services - Plymouth Municipal Airport Location"
          />
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {contactData.address.street}, {contactData.address.gate}<br />
              {contactData.address.facility}<br />
              {contactData.address.city}, {contactData.address.state} {contactData.address.zipCode}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};
```

### Security Considerations

#### Content Security Policy
- Ensure CSP allows Google Maps embeds
- Use HTTPS URLs only
- Validate embed URLs to prevent XSS

#### Privacy Considerations
- Google Maps embeds may track users
- Consider adding privacy notice
- Option to lazy load until user consent

### Testing Requirements

#### Functional Testing
- ✅ Map loads correctly with provided embed URL
- ✅ Interactive controls work (zoom, pan, fullscreen)
- ✅ Responsive behavior across screen sizes
- ✅ Error handling when embed fails to load

#### Accessibility Testing
- ✅ Screen reader compatibility
- ✅ Keyboard navigation within iframe
- ✅ Focus indicators and management
- ✅ Alternative text and descriptions

#### Performance Testing
- ✅ Lazy loading behavior
- ✅ Impact on page load times
- ✅ Memory usage with multiple embeds

### Dependencies
- React
- `@/utils/cn` for className utility
- Tailwind CSS for styling
- Google Maps Embed API (external)

### Reusability
This component is designed to be reusable across the site:
- Location pages
- Contact information sections  
- Store/office locators
- Event venue maps

Can be extended with additional features like:
- Multiple location markers
- Custom styling options
- Click-to-call integration
- Directions API integration