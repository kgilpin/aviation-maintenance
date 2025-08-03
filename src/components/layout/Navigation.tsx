import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { useNavigationData } from '@/hooks/useNavigationData';

export const Navigation: React.FC = () => {
  const navigation = useNavigationData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Get navigation items
  const navigationItems = navigation.main;

  return (
    <nav className="main-navigation" role="navigation">
      {/* Desktop Navigation - Horizontal Menu */}
      <div className="hidden md:block">
        <ul className="flex justify-center items-center space-x-6 text-center">
          {navigationItems.map((item, index) => {
            const isPhone = item.url.startsWith('tel:');
            return (
              <li key={index}>
                <a
                  href={item.url}
                  className={cn(
                    'inline-block px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200',
                    'text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded',
                    isPhone && 'text-blue-600 font-semibold hover:text-blue-800'
                  )}
                  {...(item.url.startsWith('http') && { 
                    target: '_blank', 
                    rel: 'noopener noreferrer' 
                  })}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile menu button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon */}
            <svg 
              className={cn("h-6 w-6 transition-transform", mobileMenuOpen && "rotate-90")} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="py-2 space-y-1 bg-white rounded-lg shadow-sm border">
            {navigationItems.map((item, index) => {
              const isPhone = item.url.startsWith('tel:');
              return (
                <a
                  key={index}
                  href={item.url}
                  className={cn(
                    'block px-4 py-2 text-sm font-medium text-center transition-colors',
                    'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                    isPhone && 'text-blue-600 font-semibold hover:text-blue-800'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  {...(item.url.startsWith('http') && { 
                    target: '_blank', 
                    rel: 'noopener noreferrer' 
                  })}
                >
                  {item.text}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};