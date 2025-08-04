import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigationData } from '@/hooks/useNavigationData';
import { Navigation } from './Navigation';

export const Header: React.FC = () => {
  const navigationData = useNavigationData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company Text */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/images/cropped-Transparent-Logo-180x180.png" 
                alt="YAS Yankee Aviation Services Logo"
                className="h-12 w-12"
                width={180}
                height={180}
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-blue-900 leading-tight font-heading">
                  YANKEE AVIATION SERVICES
                </span>
                <span className="text-sm text-gray-600 leading-tight font-body">
                  EST 1977
                </span>
              </div>
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