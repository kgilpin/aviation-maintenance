# Step 6: Create Layout Components

## Objective
Create reusable layout components (Header, Footer, Layout) that will be used across all pages of the site.

## Actions Required

### 6.1 Create Layout Wrapper Component
Create `src/components/layout/Layout.tsx`:

```typescript
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { LayoutProps } from '@/data/types';
import { cn } from '@/utils/cn';

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <body className="bg-white text-black font-sans" />
      </Helmet>
      
      <div className={cn('min-h-screen flex flex-col', className)}>
        <Header />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout;
```

### 6.2 Create Header Component
Create `src/components/layout/Header.tsx`:

```typescript
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeaderProps } from '@/data/types';
import { cn } from '@/utils/cn';

const Header: React.FC<HeaderProps> = ({ navigation, company, currentPath }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (href: string) => {
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src={company.logo.main} 
                alt={company.logo.alt}
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.main.map((item) => (
              <div key={item.id} className="relative group">
                <Link
                  to={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-blue-600',
                    isActiveLink(item.href) 
                      ? 'text-blue-600' 
                      : 'text-gray-700'
                  )}
                >
                  {item.label}
                </Link>
                
                {/* Dropdown Menu */}
                {item.children && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        >
                          {child.label}
                          {child.description && (
                            <span className="block text-xs text-gray-500 mt-1">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 ml-4 border-l border-gray-300 pl-4">
              {navigation.languages.map((lang) => (
                <button
                  key={lang.code}
                  className={cn(
                    'px-2 py-1 text-sm rounded transition-colors',
                    lang.isDefault 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={toggleMobileMenu}
            aria-label={navigation.mobile.hamburgerLabel}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navigation.main.map((item) => (
                <div key={item.id}>
                  <Link
                    to={item.href}
                    className={cn(
                      'block px-4 py-2 text-base font-medium rounded-md transition-colors',
                      isActiveLink(item.href)
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {item.children && (
                    <div className="pl-4 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="px-4 py-2 text-sm font-medium text-gray-500">Language</div>
                <div className="flex space-x-2 px-4">
                  {navigation.languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={cn(
                        'px-3 py-1 text-sm rounded transition-colors',
                        lang.isDefault 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
```

### 6.3 Create Footer Component
Create `src/components/layout/Footer.tsx`:

```typescript
import React from 'react';
import { Link } from 'react-router-dom';
import { FooterProps } from '@/data/types';

const Footer: React.FC<FooterProps> = ({ navigation, company }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src={company.logo.black} 
                alt={company.logo.alt}
                className="h-8 w-auto filter invert"
              />
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              {company.description}
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href={company.socialMedia.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={`Visit ${company.name} on Facebook`}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a
                href={company.socialMedia.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={`Visit ${company.name} on Twitter`}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              <a
                href={company.socialMedia.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={`Visit ${company.name} on LinkedIn`}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {navigation.footer.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} {company.name}. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              {company.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

## Component Features

### Layout Component
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **SEO Support:** Helmet integration for meta tags
- **Flexible Structure:** Accepts custom className for page-specific styling
- **Accessibility:** Proper semantic HTML structure

### Header Component
- **Responsive Navigation:** Desktop horizontal menu, mobile hamburger menu
- **Active Link Highlighting:** Shows current page in navigation
- **Dropdown Menus:** Support for multi-level navigation
- **Language Switching:** Integrated language selector
- **Sticky Positioning:** Header stays visible on scroll

### Footer Component
- **Multi-column Layout:** Responsive grid layout
- **Social Media Integration:** Links to company social profiles
- **Quick Links:** Easy access to main site sections
- **Legal Links:** Privacy policy and legal mentions
- **Company Branding:** Logo and tagline display

## Styling Strategy

### Tailwind CSS Classes Used
- **Layout:** `min-h-screen`, `flex`, `flex-col`, `flex-grow`
- **Spacing:** `container`, `mx-auto`, `px-4`, `py-8`, `space-x-4`
- **Typography:** `text-sm`, `font-medium`, `text-gray-700`
- **Colors:** `bg-white`, `text-black`, `hover:text-blue-600`
- **Responsive:** `md:flex`, `md:hidden`, `lg:space-x-8`

### Hover and Focus States
- Smooth transitions with `transition-colors`
- Proper focus indicators for accessibility
- Interactive feedback for all clickable elements

## Deliverables
- `src/components/layout/Layout.tsx` - Main layout wrapper
- `src/components/layout/Header.tsx` - Site header with navigation
- `src/components/layout/Footer.tsx` - Site footer with links
- Responsive design implementation
- Accessibility features included
- SEO-friendly structure

## Next Step
Proceed to Step 7: Create Header Component (Complete)
Proceed to Step 8: Create Footer Component (Complete)
Proceed to Step 9: Create UI Components