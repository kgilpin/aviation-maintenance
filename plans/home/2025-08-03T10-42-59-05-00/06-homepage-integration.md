# HomePage Integration

**File:** `src/pages/HomePage.tsx`  
**Purpose:** Compose all sections into the complete home page  
**Priority:** High (Final Assembly)  
**Dependencies:** 01-05 (All previous components)

## Overview

The HomePage component serves as the main entry point that composes all section components into a cohesive user experience. It manages data flow, SEO optimization, and the overall page structure while maintaining performance and accessibility standards.

## HomePage Component Implementation

**File:** `src/pages/HomePage.tsx`

```typescript
import React from 'react';
import { Helmet } from 'react-helmet-async';

// Layout Components
import { Layout } from '@/components/layout/Layout';

// Section Components
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';

// Custom Hooks for Data
import { useHomeData } from '@/hooks/useHomeData';
import { useCompanyData } from '@/hooks/useCompanyData';
import { useContactData } from '@/hooks/useContactData';

export const HomePage: React.FC = () => {
  // Data Loading
  const homeData = useHomeData();
  const companyData = useCompanyData();
  const contactData = useContactData();

  return (
    <Layout>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{homeData.seoMeta.title}</title>
        <meta name="description" content={homeData.seoMeta.description} />
        <meta name="keywords" content={homeData.seoMeta.keywords.join(', ')} />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={homeData.seoMeta.title} />
        <meta property="og:description" content={homeData.seoMeta.description} />
        <meta property="og:url" content="https://yankeeaviation.com/" />
        <meta property="og:site_name" content={companyData.name} />
        {homeData.seoMeta.ogImage && (
          <meta property="og:image" content={homeData.seoMeta.ogImage} />
        )}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={homeData.seoMeta.title} />
        <meta name="twitter:description" content={homeData.seoMeta.description} />
        
        {/* Structured Data - Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://yankeeaviation.com/#organization",
            "name": companyData.name,
            "description": companyData.description,
            "foundingDate": companyData.establishedYear.toString(),
            "url": "https://yankeeaviation.com/",
            "telephone": contactData.phone,
            "email": contactData.email,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": contactData.address.street,
              "addressLocality": contactData.address.city,
              "addressRegion": contactData.address.state,
              "postalCode": contactData.address.zipCode,
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": contactData.googleMaps.coordinates.lat,
              "longitude": contactData.googleMaps.coordinates.lng
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "08:00",
                "closes": "16:30"
              }
            ],
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": contactData.googleMaps.coordinates.lat,
                "longitude": contactData.googleMaps.coordinates.lng
              },
              "geoRadius": "100000"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Aircraft Maintenance Services",
              "itemListElement": homeData.services.services.map((service, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service
                }
              }))
            }
          })}
        </script>
      </Helmet>

      {/* Page Content */}
      <HeroSection hero={homeData.hero} />
      
      <AboutSection 
        about={homeData.about} 
        company={companyData} 
      />
      
      <ServicesSection services={homeData.services} />
      
      <TestimonialsSection testimonials={homeData.testimonials} />
      
      <ContactSection contact={contactData} />
    </Layout>
  );
};

export default HomePage;
```

## App.tsx Integration

**File:** `src/App.tsx` - Update to use HomePage

```typescript
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from '@/pages/HomePage';

// Global Styles
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Future routes will be added here */}
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
```

## Performance Optimizations

### 1. Image Loading Strategy

```typescript
// Add to HomePage component
import { useEffect } from 'react';

export const HomePage: React.FC = () => {
  // ... existing code

  // Preload critical images
  useEffect(() => {
    const criticalImages = [
      homeData.hero.backgroundImage,
      homeData.about.image
    ].filter(Boolean);

    criticalImages.forEach(src => {
      if (src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      }
    });
  }, [homeData]);

  // ... rest of component
};
```

### 2. Lazy Loading for Non-Critical Sections

```typescript
import { lazy, Suspense } from 'react';

// Lazy load testimonials and contact sections
const TestimonialsSection = lazy(() => 
  import('@/components/sections/TestimonialsSection')
);
const ContactSection = lazy(() => 
  import('@/components/sections/ContactSection')
);

// Loading component
const SectionSkeleton = () => (
  <div className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-64 bg-gray-300 rounded"></div>
          <div className="h-64 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

// In HomePage component
<Suspense fallback={<SectionSkeleton />}>
  <TestimonialsSection testimonials={homeData.testimonials} />
</Suspense>

<Suspense fallback={<SectionSkeleton />}>
  <ContactSection contact={contactData} />
</Suspense>
```

## Error Boundary Implementation

**File:** `src/components/ErrorBoundary.tsx`

```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('HomePage Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry, but there was an error loading the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in App.tsx
<Routes>
  <Route path="/" element={
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  } />
</Routes>
```

## Data Loading States

### Loading Component

```typescript
const LoadingHomePage: React.FC = () => (
  <Layout>
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-[60vh] bg-gradient-to-r from-gray-300 to-gray-400"></div>
      
      {/* Content Skeletons */}
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-64 bg-gray-300 rounded"></div>
                <div className="h-64 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Layout>
);
```

## Accessibility Enhancements

### Skip Navigation Link

```typescript
// Add to top of HomePage
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
>
  Skip to main content
</a>

<main id="main-content">
  {/* Section components */}
</main>
```

### Page Landmarks

```typescript
<Layout>
  <main role="main" aria-label="Home page content">
    <HeroSection hero={homeData.hero} />
    
    <section aria-label="About Yankee Aviation">
      <AboutSection about={homeData.about} company={companyData} />
    </section>
    
    <section aria-label="Our services">
      <ServicesSection services={homeData.services} />
    </section>
    
    <section aria-label="Customer testimonials">
      <TestimonialsSection testimonials={homeData.testimonials} />
    </section>
    
    <section aria-label="Contact information">
      <ContactSection contact={contactData} />
    </section>
  </main>
</Layout>
```

## Implementation Steps

1. **Create HomePage component**: Implement basic structure
2. **Add data hooks**: Integrate all custom data hooks
3. **Compose sections**: Add all section components in order
4. **Implement SEO**: Add comprehensive meta tags and structured data
5. **Add performance optimizations**: Implement lazy loading and preloading
6. **Error handling**: Add error boundary and loading states
7. **Accessibility audit**: Ensure WCAG 2.1 AA compliance
8. **Testing**: Verify all functionality works correctly

## Testing Strategy

### Unit Testing
- Test data loading with mock data
- Verify SEO meta tags are rendered correctly
- Test error boundary functionality

### Integration Testing
- Test section component composition
- Verify data flow between components
- Test responsive behavior across breakpoints

### Performance Testing
- Measure initial page load time
- Test lazy loading behavior
- Verify image optimization

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast compliance

## Final Checklist

- [ ] All section components render correctly
- [ ] Data flows properly from hooks to components
- [ ] SEO meta tags and structured data are complete
- [ ] Error boundaries handle failures gracefully
- [ ] Loading states provide good user experience
- [ ] Accessibility features work properly
- [ ] Performance optimizations are implemented
- [ ] Mobile responsiveness works across all sections
- [ ] All interactive elements function correctly
- [ ] Page matches design from crawled content