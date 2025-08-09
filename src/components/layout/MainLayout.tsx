import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
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