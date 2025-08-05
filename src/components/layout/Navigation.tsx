import React, { useState } from 'react';
import { useNavigationData } from '@/hooks/useNavigationData';
import type { NavigationItem } from '@/data/types';

export const Navigation: React.FC = () => {
  const { data: navigation } = useNavigationData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!navigation) return null;

  const handleItemClick = (item: NavigationItem) => {
    if (item.href === '#') return;
    
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = item.href;
    }
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav className="bg-green-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center py-4">
          <ul className="flex space-x-8">
            {navigation.mainNavigation.map((item) => (
              <li key={item.label} className="relative group">
                <button
                  onClick={() => item.children && item.children.length > 0 ? toggleDropdown(item.label) : handleItemClick(item)}
                  className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium flex items-center"
                  onMouseEnter={() => item.children && item.children.length > 0 && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.label}
                  {item.children && item.children.length > 0 && (
                    <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {item.children && item.children.length > 0 && openDropdown === item.label && (
                  <div 
                    className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="py-1">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => handleItemClick(child)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                        >
                          {child.label}
                          {child.external && (
                            <svg className="inline ml-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-2a1 1 0 10-2 0v2H5V7h2a1 1 0 000-2H5z" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-4">
            <span className="text-white font-medium">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-green-200"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="pb-4">
              <ul className="space-y-2">
                {navigation.mainNavigation.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleItemClick(item)}
                      className="block w-full text-left text-white hover:text-green-200 px-3 py-2 text-base font-medium"
                    >
                      {item.label}
                    </button>
                    {item.children && item.children.length > 0 && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <button
                              onClick={() => handleItemClick(child)}
                              className="block w-full text-left text-green-200 hover:text-white px-3 py-1 text-sm"
                            >
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};