# Layout Components Implementation

**Files:** `src/components/layout/*.tsx`  
**Purpose:** Create reusable layout components for site-wide consistency  
**Priority:** High (Foundation)  
**Dependencies:** 01-typescript-interfaces.md, 02-json-data-files.md

## Overview

Layout components provide the structural foundation for all pages. They handle site-wide navigation, branding, and consistent page structure while ensuring responsive design and accessibility.

## Component 1: Layout.tsx

**File:** `src/components/layout/Layout.tsx`  
**Purpose:** Main page wrapper with SEO and structure

```typescript
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Yankee Aviation - Aircraft Maintenance, Plymouth, MA",
  description = "Professional aircraft maintenance services in Plymouth, Massachusetts. 44+ years of experience.",
  className
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <div className={cn("min-h-screen flex flex-col", className)}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
```

### Key Features
- **SEO Management**: React Helmet for meta tags
- **Responsive Structure**: Flex layout with proper spacing
- **Accessibility**: Semantic HTML with proper landmark roles
- **Type Safety**: Strict TypeScript interface

## Component 2: Header.tsx

**File:** `src/components/layout/Header.tsx`  
**Purpose:** Site header with logo and navigation

```typescript
export const Header: React.FC = () => {
  const navigationData = useNavigationData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/Transparent-Logo.png" 
                alt="Yankee Aviation"
                className="h-10 w-auto"
                width={123}
                height={117}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <Navigation 
            items={navigationData.primary}
            className="hidden md:flex"
          />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <Navigation 
              items={navigationData.primary}
              className="flex flex-col space-y-2"
              mobile={true}
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
};
```

### Key Features
- **Responsive Logo**: Optimized sizing for all devices
- **Mobile Menu**: Hamburger menu with smooth transitions
- **Accessibility**: ARIA labels and keyboard navigation
- **State Management**: Mobile menu toggle state

## Component 3: Navigation.tsx

**File:** `src/components/layout/Navigation.tsx`  
**Purpose:** Flexible navigation component for desktop and mobile

```typescript
interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  mobile?: boolean;
  onItemClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  className,
  mobile = false,
  onItemClick
}) => {
  return (
    <nav className={cn("navigation", className)} role="navigation">
      <ul className={cn(
        mobile ? "flex flex-col space-y-2" : "flex space-x-8"
      )}>
        {items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={onItemClick}
              className={cn(
                "text-gray-700 hover:text-primary transition-colors duration-200",
                "font-medium text-sm uppercase tracking-wide",
                mobile ? "block py-2 px-4 rounded-md hover:bg-gray-50" : "",
                item.isActive && "text-primary border-b-2 border-primary"
              )}
              aria-current={item.isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

### Key Features
- **Dual Mode**: Works for both desktop and mobile layouts
- **Active State**: Visual indication of current page
- **Hover Effects**: Smooth transitions and feedback
- **Accessibility**: Proper ARIA attributes

## Component 4: Footer.tsx

**File:** `src/components/layout/Footer.tsx`  
**Purpose:** Site footer with contact information and business hours

```typescript
export const Footer: React.FC = () => {
  const contactData = useContactData();
  const companyData = useCompanyData();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2" />
                <a href={`tel:${contactData.phone}`} className="hover:text-primary">
                  {contactData.phone}
                </a>
              </p>
              <p className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                <a href={`mailto:${contactData.email}`} className="hover:text-primary">
                  {contactData.email}
                </a>
              </p>
              <p className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-2 mt-1" />
                <span>
                  {contactData.address.street}<br />
                  {contactData.address.gate && `${contactData.address.gate}, `}
                  {contactData.address.facility}<br />
                  {contactData.address.city}, {contactData.address.state} {contactData.address.zipCode}
                </span>
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <div className="space-y-1 text-sm">
              <p>Monday - Saturday: {contactData.hours.monday}</p>
              <p>Sunday: {contactData.hours.sunday}</p>
            </div>
          </div>

          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About {companyData.name}</h3>
            <p className="text-sm text-gray-300 mb-4">
              {companyData.businessType} serving the aviation community since {companyData.establishedYear}.
            </p>
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} {companyData.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
```

### Key Features
- **Contact Cards**: Phone, email, address with click actions
- **Business Hours**: Clear operating hours display
- **Responsive Grid**: Adapts to different screen sizes
- **Company Branding**: Dynamic company information

## Implementation Steps

1. **Create directory structure**: `src/components/layout/`
2. **Implement Layout.tsx**: Basic page wrapper
3. **Build Header.tsx**: Logo and navigation structure
4. **Create Navigation.tsx**: Flexible navigation component  
5. **Implement Footer.tsx**: Contact information and hours
6. **Test responsiveness**: Verify mobile and desktop layouts
7. **Accessibility audit**: Ensure WCAG 2.1 AA compliance

## Styling Guidelines

### Tailwind Classes Used
- **Layout**: `min-h-screen`, `flex`, `flex-col`, `max-w-7xl`, `mx-auto`
- **Spacing**: `px-4`, `sm:px-6`, `lg:px-8`, `py-12`, `space-y-2`
- **Typography**: `font-semibold`, `text-lg`, `text-sm`, `uppercase`
- **Colors**: `text-gray-700`, `bg-white`, `bg-gray-900`, `text-primary`
- **Interactive**: `hover:text-primary`, `focus:ring-2`, `transition-colors`

### Responsive Breakpoints
- **Mobile**: Default styles, mobile-first approach
- **Tablet**: `md:` prefix for medium screens (768px+)
- **Desktop**: `lg:` prefix for large screens (1024px+)

## Testing Checklist

- [ ] Layout renders correctly on all screen sizes
- [ ] Navigation works on both desktop and mobile
- [ ] Mobile menu toggles properly
- [ ] Footer displays contact information correctly
- [ ] All links and interactive elements function
- [ ] Accessibility features work with screen readers
- [ ] SEO meta tags are properly set