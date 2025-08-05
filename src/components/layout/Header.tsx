import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { HeaderProps } from '@/data/types';
import { resolveImagePath } from '@/utils/imageMap';
import { cn } from '@/utils/cn';

const Header: React.FC<HeaderProps> = ({ navigation, company }) => {
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
                src={resolveImagePath(company.logo.main)} 
                alt={company.logo.alt}
                className="h-8 md:h-10 w-auto"
                loading="eager"
                decoding="async"
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