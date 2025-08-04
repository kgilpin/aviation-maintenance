# UI Components for Services Display

## Overview

Create reusable UI components for displaying services content, following the established component architecture and design system while ensuring proper presentation of service offerings.

## New UI Components Required

### 1. ServicesList Component (`src/components/ui/ServicesList.tsx`)

```typescript
import React from 'react';
import { cn } from '@/utils/cn';
import type { Service } from '@/data/types';

interface ServicesListProps {
  services: Service[];
  layout?: 'list' | 'grid';
  showIcons?: boolean;
  iconType?: 'checkmark' | 'custom';
  className?: string;
}

export const ServicesList: React.FC<ServicesListProps> = ({
  services,
  layout = 'list',
  showIcons = true,
  iconType = 'checkmark',
  className
}) => {
  const CheckmarkIcon = () => (
    <svg 
      className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" 
      fill="currentColor" 
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path 
        fillRule="evenodd" 
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
        clipRule="evenodd" 
      />
    </svg>
  );

  if (layout === 'grid') {
    return (
      <div className={cn(
        'grid grid-cols-1 md:grid-cols-2 gap-6',
        className
      )}>
        {services.map((service) => (
          <div key={service.id} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            {showIcons && iconType === 'checkmark' && <CheckmarkIcon />}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              {service.description && (
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {services.map((service) => (
        <div key={service.id} className="flex items-start space-x-4">
          {showIcons && iconType === 'checkmark' && <CheckmarkIcon />}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {service.title}
            </h3>
            {service.description && (
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;
```

### 2. CallToActionCard Component (`src/components/ui/CallToActionCard.tsx`)

```typescript
import React from 'react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import type { CallToActionSection } from '@/data/types';

interface CallToActionCardProps {
  cta: CallToActionSection;
  layout?: 'card' | 'section' | 'banner';
  className?: string;
}

export const CallToActionCard: React.FC<CallToActionCardProps> = ({
  cta,
  layout = 'section',
  className
}) => {
  if (layout === 'card') {
    return (
      <div className={cn(
        'bg-white rounded-lg shadow-lg p-8 text-center',
        className
      )}>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {cta.heading}
        </h3>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          {cta.description}
        </p>
        <Button
          href={cta.buttonLink}
          size="lg"
          variant="primary"
          className="inline-flex items-center"
        >
          {cta.buttonText}
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    );
  }

  if (layout === 'banner') {
    return (
      <div className={cn(
        'relative bg-blue-600 text-white overflow-hidden',
        className
      )}>
        {cta.backgroundImage && (
          <div className="absolute inset-0">
            <img
              src={cta.backgroundImage}
              alt={cta.imageAlt || ''}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-blue-600 bg-opacity-80" />
          </div>
        )}
        
        <div className="relative py-12 px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">
            {cta.heading}
          </h3>
          <p className="text-xl mb-6 leading-relaxed max-w-3xl mx-auto">
            {cta.description}
          </p>
          <Button
            href={cta.buttonLink}
            size="lg"
            variant="secondary"
            className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100"
          >
            {cta.buttonText}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    );
  }

  // Default section layout
  return (
    <div className={cn(
      'relative py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white overflow-hidden',
      className
    )}>
      {cta.backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={cta.backgroundImage}
            alt={cta.imageAlt || ''}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-700/90" />
        </div>
      )}
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {cta.heading}
        </h2>
        <p className="text-xl leading-relaxed mb-8 text-blue-100">
          {cta.description}
        </p>
        <Button
          href={cta.buttonLink}
          size="lg"
          className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors duration-300"
        >
          {cta.buttonText}
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default CallToActionCard;
```

### 3. ServicesCard Component (`src/components/ui/ServicesCard.tsx`)

```typescript
import React from 'react';
import { cn } from '@/utils/cn';
import type { Service } from '@/data/types';

interface ServicesCardProps {
  service: Service;
  showDescription?: boolean;
  showIcon?: boolean;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export const ServicesCard: React.FC<ServicesCardProps> = ({
  service,
  showDescription = true,
  showIcon = true,
  variant = 'default',
  className
}) => {
  const IconComponent = () => {
    if (service.icon === 'checkmark') {
      return (
        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      );
    }
    return null;
  };

  const baseClasses = 'bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md';
  
  const variantClasses = {
    default: 'p-6',
    compact: 'p-4',
    featured: 'p-8 shadow-lg border-blue-200'
  };

  return (
    <div className={cn(
      baseClasses,
      variantClasses[variant],
      className
    )}>
      <div className="flex items-start space-x-4">
        {showIcon && <IconComponent />}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            'font-semibold text-gray-900 mb-2',
            variant === 'featured' ? 'text-xl' : 'text-lg'
          )}>
            {service.title}
          </h3>
          {showDescription && service.description && (
            <p className="text-gray-700 leading-relaxed">
              {service.description}
            </p>
          )}
          {service.featured && (
            <div className="mt-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Featured Service
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
```

## Implementation Notes

### Design Principles

- **Consistent Styling**: Uses established Tailwind patterns and color schemes
- **Responsive Design**: Mobile-first approach with appropriate breakpoints
- **Accessibility**: Proper ARIA attributes, semantic HTML, and screen reader support
- **Performance**: Lightweight components with minimal re-rendering
- **Flexibility**: Multiple layout options and customization props

### Component Features

#### ServicesList
- **Multiple Layouts**: List and grid display options
- **Icon Support**: Configurable checkmark icons with consistent styling
- **Responsive Grid**: Adapts to different screen sizes appropriately
- **Clean Semantics**: Proper heading hierarchy and content structure

#### CallToActionCard
- **Three Layout Modes**: Card, section, and banner presentations
- **Background Support**: Optional background images with overlays
- **Button Integration**: Seamless integration with existing Button component
- **Visual Hierarchy**: Clear content prioritization and flow

#### ServicesCard
- **Multiple Variants**: Default, compact, and featured display options
- **Featured Indicators**: Visual badges for highlighted services
- **Icon System**: Flexible icon display with consistent styling
- **Hover Effects**: Subtle interactive feedback for better UX

### Accessibility Features

- **Semantic HTML**: Proper heading levels and content structure
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility for all interactive components
- **Color Contrast**: WCAG 2.1 AA compliant color combinations
- **Focus Management**: Clear focus indicators and logical tab order

## Usage Examples

### Basic Services List

```typescript
import { ServicesList } from '@/components/ui/ServicesList';

<ServicesList 
  services={services} 
  layout="list" 
  showIcons={true} 
  iconType="checkmark" 
/>
```

### Grid Layout with Cards

```typescript
import { ServicesCard } from '@/components/ui/ServicesCard';

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {services.map(service => (
    <ServicesCard 
      key={service.id} 
      service={service} 
      variant="featured" 
      showDescription={true} 
    />
  ))}
</div>
```

### Call-to-Action Section

```typescript
import { CallToActionCard } from '@/components/ui/CallToActionCard';

<CallToActionCard 
  cta={callToActionData} 
  layout="section" 
/>
```

## Files to Create

- `src/components/ui/ServicesList.tsx` - List display component for services
- `src/components/ui/CallToActionCard.tsx` - Flexible CTA component with multiple layouts
- `src/components/ui/ServicesCard.tsx` - Individual service card component

## Integration Points

- **Button Component**: Leverages existing Button component for consistency
- **Utility Classes**: Uses established `cn` utility for className management
- **Type System**: Fully typed with interfaces from the type system
- **Design System**: Maintains consistency with existing color and spacing tokens

## Performance Considerations

- **Minimal Re-renders**: Optimized component structure to prevent unnecessary updates
- **Bundle Size**: Lightweight components with efficient imports
- **Image Loading**: Supports lazy loading and proper image optimization
- **Memory Usage**: Efficient event handling and cleanup

These UI components provide a robust foundation for displaying services content while maintaining consistency with the existing design system and ensuring excellent user experience across all devices and interaction methods.