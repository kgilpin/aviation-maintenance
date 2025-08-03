import React from 'react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/utils/cn';
import { Header } from './Header';
import { Footer } from './Footer';

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