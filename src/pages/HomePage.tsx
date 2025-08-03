import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { AmenitiesSection } from '@/components/sections/AmenitiesSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { useHomeData } from '@/hooks/useHomeData';

export const HomePage: React.FC = () => {
  const homeData = useHomeData();

  return (
    <Layout 
      className="home-page bg-gradient-falcon min-h-screen text-white"
      title={homeData.seo.title}
      description={homeData.seo.description}
    >
      <HeroSection data={homeData.hero} />
      <AmenitiesSection data={homeData.sections.amenities} />
      <GallerySection data={homeData.sections.gallery} />
      <PartnersSection data={homeData.sections.partners} />
    </Layout>
  );
};