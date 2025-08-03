# UI Components Implementation

**Files:** `src/components/ui/*.tsx`  
**Purpose:** Create reusable UI components for consistent design and functionality  
**Priority:** Medium (Building Blocks)  
**Dependencies:** 01-typescript-interfaces.md, 02-json-data-files.md

## Overview

UI components are the building blocks of the interface. They provide consistent styling, behavior, and accessibility features across the entire application. These components follow the design system principles and can be reused throughout different pages.

## Component 1: Button.tsx

**File:** `src/components/ui/Button.tsx`  
**Purpose:** Flexible button component with variants and external link support

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  children,
  className,
  ...props
}) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    {
      // Variants
      'bg-primary text-white hover:bg-primary-dark': variant === 'primary',
      'bg-gray-600 text-white hover:bg-gray-700': variant === 'secondary',
      'border-2 border-primary text-primary hover:bg-primary hover:text-white': variant === 'outline',
      'text-primary hover:bg-primary/10': variant === 'ghost',
      
      // Sizes
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
    },
    className
  );

  if (href) {
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {children}
        <ExternalLinkIcon className="ml-2 h-4 w-4" />
      </a>
    ) : (
      <Link to={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
};
```

### Key Features
- **Multiple Variants**: Primary, secondary, outline, ghost styles
- **Size Options**: Small, medium, large sizing
- **Link Support**: Can function as internal or external link
- **Accessibility**: Focus states and ARIA compliance
- **External Link Indicator**: Icon for external links

## Component 2: ContactCard.tsx

**File:** `src/components/ui/ContactCard.tsx`  
**Purpose:** Display contact information with click actions

```typescript
interface ContactCardProps {
  type: 'phone' | 'email' | 'address' | 'hours';
  title: string;
  content: string | string[];
  icon?: React.ReactNode;
  href?: string;
  className?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  type,
  title,
  content,
  icon,
  href,
  className
}) => {
  const cardContent = (
    <div className={cn(
      'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200',
      'border border-gray-200',
      href && 'cursor-pointer hover:border-primary',
      className
    )}>
      <div className="flex items-start space-x-4">
        {icon && (
          <div className="flex-shrink-0 text-primary">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          {Array.isArray(content) ? (
            <div className="space-y-1">
              {content.map((line, index) => (
                <p key={index} className="text-gray-600">
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">{content}</p>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return type === 'email' ? (
      <a href={`mailto:${href}`} className="block">
        {cardContent}
      </a>
    ) : type === 'phone' ? (
      <a href={`tel:${href.replace(/[^\d+]/g, '')}`} className="block">
        {cardContent}
      </a>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
};
```

### Key Features
- **Multiple Types**: Phone, email, address, hours display
- **Click Actions**: Automatic tel:, mailto:, and external links
- **Icon Support**: Flexible icon placement
- **Array Content**: Supports multi-line content
- **Hover Effects**: Visual feedback for interactive cards

## Component 3: TestimonialCard.tsx

**File:** `src/components/ui/TestimonialCard.tsx`  
**Purpose:** Display customer testimonials with professional formatting

```typescript
interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  className
}) => {
  return (
    <div className={cn(
      'bg-white rounded-lg shadow-md p-6 border border-gray-200',
      'hover:shadow-lg transition-shadow duration-200',
      className
    )}>
      {/* Quote */}
      <div className="mb-6">
        <QuoteIcon className="h-8 w-8 text-primary mb-3" />
        <blockquote className="text-gray-700 text-lg italic leading-relaxed">
          "{testimonial.quote}"
        </blockquote>
      </div>

      {/* Highlights */}
      {testimonial.highlights && testimonial.highlights.length > 0 && (
        <div className="mb-6">
          <ul className="space-y-2">
            {testimonial.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Author Information */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">{testimonial.name}</p>
            {testimonial.credentials && (
              <p className="text-sm text-gray-500 mt-1">{testimonial.credentials}</p>
            )}
          </div>
          {testimonial.yearsAsCustomer && (
            <div className="text-right">
              <p className="text-sm font-medium text-primary">
                {testimonial.yearsAsCustomer}+ Years
              </p>
              <p className="text-xs text-gray-500">Customer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
```

### Key Features
- **Professional Layout**: Quote, highlights, author information
- **Visual Elements**: Quote icon, check marks for highlights
- **Responsive Design**: Adapts to different container sizes
- **Typography Hierarchy**: Clear information hierarchy
- **Customer Duration**: Years as customer badge

## Component 4: ServiceCard.tsx

**File:** `src/components/ui/ServiceCard.tsx`  
**Purpose:** Display service offerings with images and descriptions

```typescript
interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  services?: string[];
  href?: string;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  imageAlt,
  services,
  href,
  className
}) => {
  const cardContent = (
    <div className={cn(
      'bg-white rounded-lg shadow-md overflow-hidden',
      'hover:shadow-lg transition-shadow duration-200',
      'border border-gray-200',
      href && 'cursor-pointer hover:border-primary',
      className
    )}>
      {/* Image */}
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Services List */}
        {services && services.length > 0 && (
          <ul className="space-y-2">
            {services.map((service, index) => (
              <li key={index} className="flex items-start">
                <ArrowRightIcon className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">{service}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Call to Action */}
        {href && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <span className="text-primary font-medium hover:text-primary-dark transition-colors">
              Learn More →
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
```

### Key Features
- **Image Integration**: Responsive image with lazy loading
- **Service Lists**: Bulleted list of specific services
- **Call to Action**: Optional learn more link
- **Hover Effects**: Interactive feedback
- **Flexible Content**: Works with or without services list

## Component 5: CompanyBrand.tsx

**File:** `src/components/ui/CompanyBrand.tsx`  
**Purpose:** Consistent company branding and logo display

```typescript
interface CompanyBrandProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const CompanyBrand: React.FC<CompanyBrandProps> = ({
  size = 'md',
  showText = true,
  className
}) => {
  const companyData = useCompanyData();

  const logoSizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <img
        src="/images/Transparent-Logo.png"
        alt={companyData.name}
        className={cn('w-auto', logoSizes[size])}
        width={123}
        height={117}
      />
      {showText && (
        <div>
          <h1 className={cn('font-bold text-gray-900', textSizes[size])}>
            {companyData.name}
          </h1>
          <p className="text-sm text-gray-600">
            Since {companyData.establishedYear}
          </p>
        </div>
      )}
    </div>
  );
};
```

### Key Features
- **Size Variants**: Small, medium, large logo sizes
- **Text Toggle**: Option to show/hide company text
- **Dynamic Data**: Uses company data from JSON
- **Consistent Branding**: Standardized logo usage

## Implementation Steps

1. **Create UI components directory**: `src/components/ui/`
2. **Implement Button.tsx**: Multi-variant button component
3. **Build ContactCard.tsx**: Contact information display
4. **Create TestimonialCard.tsx**: Customer testimonial layout
5. **Implement ServiceCard.tsx**: Service offering display
6. **Build CompanyBrand.tsx**: Consistent branding component
7. **Test all variants**: Verify all props and states work correctly
8. **Accessibility audit**: Ensure WCAG 2.1 AA compliance

## Styling Standards

### Color Palette
- **Primary**: `text-primary`, `bg-primary`, `border-primary`
- **Gray Scale**: `text-gray-900`, `text-gray-600`, `bg-gray-50`
- **Success**: `text-green-500` for positive indicators
- **Interactive**: `hover:`, `focus:`, `transition-` classes

### Typography
- **Headings**: `text-lg`, `text-xl`, `font-semibold`, `font-bold`
- **Body**: `text-base`, `text-sm`, `leading-relaxed`
- **Interactive**: `font-medium` for clickable elements

### Spacing & Layout
- **Padding**: `p-6`, `px-4`, `py-2` for consistent spacing
- **Margins**: `mb-4`, `mt-6`, `space-y-2` for vertical rhythm
- **Borders**: `border`, `border-gray-200`, `rounded-lg`

## Testing Checklist

- [ ] All button variants render correctly
- [ ] Contact cards handle different content types
- [ ] Testimonial cards display all information properly
- [ ] Service cards work with and without optional content
- [ ] Company brand component scales appropriately
- [ ] All interactive elements have proper hover/focus states
- [ ] Components are accessible with screen readers
- [ ] Mobile responsiveness works across all components