# Section Components for Services Page

## Overview

Create page-specific section components that compose the services page layout, leveraging existing components where possible and creating new ones that match the live site's structure and design.

## Section Components Required

### 1. ServicesHero Component (`src/components/sections/ServicesHero.tsx`)

**Purpose**: Simple hero section with "Services" title, following the pattern established in SimpleAboutHero

```typescript
import React from 'react';
import { cn } from '@/utils/cn';
import type { ServicesHeroContent } from '@/data/types';

interface ServicesHeroProps {
  hero: ServicesHeroContent;
  className?: string;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({
  hero,
  className
}) => {
  return (
    <section className={cn(
      'relative py-16 bg-gradient-to-r from-blue-400 to-blue-600 text-white',
      className
    )}>
      {hero.backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${hero.backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-blue-600/40" />
        </>
      )}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            {hero.title}
          </h1>
          {hero.subtitle && (
            <p className="mt-4 text-xl text-blue-100">
              {hero.subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
```

### 2. ServicesContentSection Component (`src/components/sections/ServicesContentSection.tsx`)

**Purpose**: Main content section with services description, list, and accompanying imagery

```typescript
import React from 'react';
import { cn } from '@/utils/cn';
import { ServicesList } from '@/components/ui/ServicesList';
import type { ServicesListSection } from '@/data/types';

interface ServicesContentSectionProps {
  content: ServicesListSection;
  className?: string;
}

export const ServicesContentSection: React.FC<ServicesContentSectionProps> = ({
  content,
  className
}) => {
  return (
    <section className={cn('py-16 lg:py-20 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Content Column */}
          <div className="space-y-8">
            {/* Heading and Description */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {content.heading}
              </h2>
              
              {content.subheading && (
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {content.subheading}
                </p>
              )}
              
              {content.description && (
                <p className="text-gray-700 mb-8 leading-relaxed">
                  {content.description}
                </p>
              )}
            </div>

            {/* Services List */}
            <div>
              <ServicesList 
                services={content.services}
                layout="list"
                showIcons={true}
                iconType="checkmark"
                className="space-y-6"
              />
            </div>
          </div>

          {/* Image Column */}
          {content.image && (
            <div className="order-first lg:order-last">
              <div className="relative">
                <img
                  src={content.image}
                  alt={content.imageAlt || 'Aircraft maintenance services'}
                  className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
                {/* Optional overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesContentSection;
```

### 3. WhyChooseUsSection Component (`src/components/sections/WhyChooseUsSection.tsx`)

**Purpose**: Call-to-action section highlighting company strengths and encouraging contact

```typescript
import React from 'react';
import { cn } from '@/utils/cn';
import { CallToActionCard } from '@/components/ui/CallToActionCard';
import type { CallToActionSection } from '@/data/types';

interface WhyChooseUsSectionProps {
  callToAction: CallToActionSection;
  className?: string;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  callToAction,
  className
}) => {
  return (
    <section className={cn('', className)}>
      <CallToActionCard 
        cta={callToAction} 
        layout="section"
      />
    </section>
  );
};

export default WhyChooseUsSection;
```

### 4. Enhanced ServicesSection Component (Update Existing)

**Purpose**: Update existing ServicesSection to work with new data structure and be more flexible

```typescript
// Update to src/components/sections/ServicesSection.tsx
import React from 'react';
import { cn } from '@/utils/cn';
import { ServicesList } from '@/components/ui/ServicesList';
import { ServicesCard } from '@/components/ui/ServicesCard';
import type { Service } from '@/data/types';

interface ServicesSectionProps {
  services: Service[];
  heading?: string;
  subheading?: string;
  description?: string;
  layout?: 'list' | 'grid' | 'cards';
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  heading = "Our Services",
  subheading,
  description,
  layout = 'list',
  variant = 'default',
  className
}) => {
  const renderServices = () => {
    if (layout === 'cards') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServicesCard
              key={service.id}
              service={service}
              variant={variant}
              showDescription={true}
              showIcon={true}
            />
          ))}
        </div>
      );
    }

    return (
      <ServicesList
        services={services}
        layout={layout}
        showIcons={true}
        iconType="checkmark"
      />
    );
  };

  return (
    <section className={cn('py-16 bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {heading}
          </h2>
          
          {subheading && (
            <h3 className="text-xl text-blue-600 font-semibold mb-6">
              {subheading}
            </h3>
          )}
          
          {description && (
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Services Display */}
        {renderServices()}
      </div>
    </section>
  );
};

export default ServicesSection;
```

## Implementation Notes

### Component Architecture

- **Consistent Patterns**: Follows established section component patterns from the project
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Reusability**: Components accept props for flexible usage across different contexts
- **Type Safety**: Full TypeScript support with proper interfaces

### Layout Strategy

#### ServicesHero
- **Simple Design**: Matches the SimpleAboutHero pattern for consistency
- **Background Support**: Optional background images with overlay functionality
- **Responsive Typography**: Scales appropriately across device sizes
- **Accessibility**: Semantic HTML with proper heading hierarchy

#### ServicesContentSection
- **Two-Column Layout**: Content left, image right on desktop; stacked on mobile
- **Flexible Content**: Supports optional subheadings and descriptions
- **Image Optimization**: Proper lazy loading and responsive sizing
- **Visual Balance**: Good spacing and proportion between text and imagery

#### WhyChooseUsSection
- **CTA Integration**: Leverages the flexible CallToActionCard component
- **Background Flexibility**: Supports various background options
- **Conversion Focus**: Designed to encourage user action and contact

### Responsive Design Considerations

- **Mobile First**: Base styles target mobile devices with progressive enhancement
- **Breakpoints**: Uses standard Tailwind breakpoints (sm, md, lg, xl)
- **Content Reflow**: Text and images reflow naturally on smaller screens
- **Touch Interactions**: Proper touch targets and interactive elements
- **Performance**: Optimized images and efficient CSS for mobile performance

## Integration with Existing Components

### Leveraging Current Architecture

- **ServicesList & ServicesCard**: Uses new UI components for consistent presentation
- **Button Component**: CTA sections integrate with existing Button component
- **Layout Patterns**: Follows established grid and spacing patterns
- **Color System**: Maintains consistency with existing brand colors

### Data Flow Integration

- **Hook Integration**: Components designed to work seamlessly with useServicesData hook
- **Type Safety**: All props typed with interfaces from the type system
- **Error Handling**: Graceful degradation when data is missing or incomplete

## Files to Create/Modify

### New Files
- `src/components/sections/ServicesHero.tsx` - Simple services page hero
- `src/components/sections/ServicesContentSection.tsx` - Main content with services list
- `src/components/sections/WhyChooseUsSection.tsx` - Call-to-action section

### Modified Files
- `src/components/sections/ServicesSection.tsx` - Enhanced existing component for better flexibility

## Usage in Services Page

```typescript
import { ServicesHero } from '@/components/sections/ServicesHero';
import { ServicesContentSection } from '@/components/sections/ServicesContentSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';

export const ServicesPage: React.FC = () => {
  const { hero, servicesContent, callToAction } = useServicesData();

  return (
    <Layout>
      <ServicesHero hero={hero} />
      <ServicesContentSection content={servicesContent} />
      <WhyChooseUsSection callToAction={callToAction} />
    </Layout>
  );
};
```

## Accessibility Features

- **Semantic HTML**: Proper section, heading, and content structure
- **ARIA Labels**: Screen reader support for complex interactions
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
- **Color Contrast**: WCAG 2.1 AA compliant color combinations
- **Focus Management**: Clear focus indicators and logical tab order
- **Image Alt Text**: Descriptive alt text for all images

## Performance Optimizations

- **Lazy Loading**: Images load only when needed
- **Efficient Layouts**: CSS Grid and Flexbox for optimal rendering performance
- **Minimal JavaScript**: Components use minimal JavaScript for maximum performance
- **Bundle Optimization**: Efficient imports and tree-shaking support

These section components provide a complete foundation for the services page while maintaining consistency with the existing architecture and ensuring excellent user experience across all devices and accessibility requirements.