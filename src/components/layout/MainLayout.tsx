import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  customBgColor?: string;
}

export function MainLayout({ children, customBgColor }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const bgStyle = customBgColor 
    ? { backgroundColor: customBgColor }
    : {};

  return (
    <div className="min-h-screen bg-white" style={bgStyle}>
      {/* Mobile Header */}
      <Header onMenuToggle={toggleMobileMenu} isMenuOpen={isMobileMenuOpen} />
      
      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        
        {/* Main Content */}
        <main className="flex-1 lg:w-4/5 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}