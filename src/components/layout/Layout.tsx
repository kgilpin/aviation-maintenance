import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '@/utils/cn';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className, 
  title = "Falcon Air Inc. - A Leading Fixed Base Operator",
  description = "Falcon Air Inc. provides expert aircraft maintenance and FBO services at Lawrence Municipal Airport in North Andover, Massachusetts."
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      
      <div className={cn('min-h-screen flex flex-col', className)}>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        
        <Header />
        
        <main className="flex-grow" role="main" id="main-content">
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  );
};