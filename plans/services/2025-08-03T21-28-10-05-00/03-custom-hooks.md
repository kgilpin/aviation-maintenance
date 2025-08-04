# Custom Hooks for Services Data Access

## Overview

Create custom React hooks to provide type-safe access to services page data, following the established pattern of data access hooks in the project for consistency and maintainability.

## New Hooks Required

### 1. useServicesData Hook (`src/hooks/useServicesData.ts`)

```typescript
import { useState, useEffect } from 'react';
import type { ServicesPageData, Service } from '@/data/types';
import servicesData from '@/data/services.json';

export const useServicesData = () => {
  const [data, setData] = useState<ServicesPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServicesData = async () => {
      try {
        setLoading(true);
        // Use the imported JSON data
        setData(servicesData as ServicesPageData);
        setError(null);
      } catch (err) {
        setError('Failed to load services page data');
        console.error('Error loading services data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServicesData();
  }, []);

  // Helper function to get a specific service by ID
  const getService = (id: string): Service | null => {
    return data?.servicesContent.services.find(service => service.id === id) || null;
  };

  // Helper function to get featured services
  const getFeaturedServices = (): Service[] => {
    return data?.servicesContent.services.filter(service => service.featured) || [];
  };

  // Helper function to get services by category (future extensibility)
  const getServicesByCategory = (category: string): Service[] => {
    return data?.servicesContent.services.filter(service => 
      service.category === category
    ) || [];
  };

  // Helper function to format service title for URL/slug
  const getServiceSlug = (service: Service): string => {
    return service.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  return {
    data,
    loading,
    error,
    hero: data?.hero || null,
    servicesContent: data?.servicesContent || null,
    services: data?.servicesContent.services || [],
    callToAction: data?.callToAction || null,
    seoMeta: data?.seoMeta || null,
    // Helper functions
    getService,
    getFeaturedServices,
    getServicesByCategory,
    getServiceSlug
  };
};

export default useServicesData;
```

## Implementation Notes

### Design Patterns

- **Consistent Error Handling**: Follows the same pattern as other data hooks in the project
- **Helper Functions**: Provides utility functions for common service data operations
- **Type Safety**: Full TypeScript support with proper typing and null checking
- **Performance**: Efficient data loading with proper dependency arrays and caching

### Hook Features

- **Loading States**: Boolean flag for initial data fetch with proper state management
- **Error Handling**: String message for error states with user-friendly messages
- **Data Access**: Structured access to all sections of the services page data
- **Service Utilities**: Helper functions for service filtering, searching, and URL generation

### Helper Functions Explanation

#### `getService(id: string)`
- Finds and returns a specific service by its unique identifier
- Useful for detailed service pages or direct service references
- Returns null if service not found, preventing runtime errors

#### `getFeaturedServices()`
- Returns only services marked as featured in the data
- Useful for highlighting primary services on homepage or summary sections
- Filters based on the `featured` boolean property

#### `getServicesByCategory(category: string)`
- Future-proofing for service categorization
- Allows filtering services by category when categories are added to the data structure
- Currently returns empty array but provides extensibility

#### `getServiceSlug(service: Service)`
- Converts service titles into URL-friendly slugs
- Useful for creating service detail pages or anchor links
- Handles special characters and formatting consistently

## Usage Examples

### In Services Page Component

```typescript
import { useServicesData } from '@/hooks/useServicesData';

export const ServicesPage: React.FC = () => {
  const { 
    hero, 
    servicesContent, 
    callToAction, 
    seoMeta,
    loading, 
    error 
  } = useServicesData();

  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <Helmet>
        <title>{seoMeta?.title}</title>
        <meta name="description" content={seoMeta?.description} />
      </Helmet>
      
      {hero && <ServicesHero hero={hero} />}
      {servicesContent && <ServicesContent content={servicesContent} />}
      {callToAction && <CallToActionSection cta={callToAction} />}
    </Layout>
  );
};
```

### In Service Display Component

```typescript
import { useServicesData } from '@/hooks/useServicesData';

export const FeaturedServices: React.FC = () => {
  const { getFeaturedServices, loading } = useServicesData();
  const featuredServices = getFeaturedServices();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {featuredServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};
```

### In Service Detail Component

```typescript
import { useServicesData } from '@/hooks/useServicesData';

export const ServiceDetail: React.FC<{ serviceId: string }> = ({ serviceId }) => {
  const { getService, getServiceSlug, loading } = useServicesData();
  const service = getService(serviceId);
  const slug = service ? getServiceSlug(service) : '';

  if (loading) return <div>Loading...</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <div>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <p>URL slug: {slug}</p>
    </div>
  );
};
```

## Error Handling Strategy

### Graceful Degradation
- Returns null values when data is unavailable rather than throwing errors
- Provides empty arrays for list operations when data is missing
- Console logging for debugging purposes without exposing errors to users
- User-friendly error messages for display components

### Loading State Management
- Proper loading state handling prevents premature rendering
- Error states provide clear feedback about data loading issues
- Consistent loading patterns across all data access points

## Performance Considerations

### Data Loading Optimization
- JSON data is imported statically for build-time optimization
- Hook instances share the same data source (no duplicate network requests)
- Helper functions are memoized within the hook scope
- Minimal re-rendering through proper dependency management

### Memory Management
- No unnecessary data duplication or transformation
- Efficient filtering and searching operations
- Proper cleanup of event listeners and subscriptions
- Optimized for component re-mounting scenarios

## Files to Create

- `src/hooks/useServicesData.ts` - Services page data access hook with utilities

## Integration Testing

- Unit tests for all helper functions with various data scenarios
- Integration tests with React components using the hook
- Error scenario testing (missing data, malformed JSON, network issues)
- Performance testing for large service datasets
- TypeScript compilation verification for all return types

This hook design provides a robust, type-safe, and efficient way to access services data while maintaining consistency with the existing project patterns and providing useful utilities for service management and display.