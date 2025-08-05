import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import type { LayoutProps } from '@/data/types';
import { useNavigationData } from '@/hooks/useNavigationData';
import { useCompanyData } from '@/hooks/useCompanyData';
import { resolveImagePath } from '@/utils/imageMap';
import { cn } from '@/utils/cn';

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { navigation, loading: navLoading } = useNavigationData();
  const { company, loading: companyLoading } = useCompanyData();

  const loading = navLoading || companyLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!navigation || !company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Failed to load site data</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <html lang="en" />
        <body className="bg-white text-black font-sans" />
        
        {/* Favicon Links */}
        <link rel="apple-touch-icon" sizes="180x180" href={resolveImagePath(company.pwa.appleTouchIcon)} />
        <link rel="icon" type="image/png" sizes="32x32" href={resolveImagePath(company.pwa.favicon32)} />
        <link rel="icon" type="image/png" sizes="16x16" href={resolveImagePath(company.pwa.favicon16)} />
        <link rel="manifest" href={resolveImagePath(company.pwa.manifest)} />
        <link rel="mask-icon" href={resolveImagePath(company.pwa.safariPinnedTab)} color="#000000" />
        
        {/* Background Preload */}
        <link rel="preload" as="image" href={resolveImagePath(company.branding.backgroundImage)} />
        
        {/* PWA Meta Tags */}
        <meta name="msapplication-TileColor" content={company.branding.backgroundColor} />
        <meta name="theme-color" content={company.branding.themeColor} />
        
        {/* SEO Meta Tags */}
        <title>{company.seo.defaultTitle}</title>
        <meta name="description" content={company.seo.defaultDescription} />
      </Helmet>
      
      <div className={cn('min-h-screen flex flex-col', className)}>
        <Header navigation={navigation} company={company} />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer navigation={navigation} company={company} />
      </div>
    </>
  );
};

export default Layout;