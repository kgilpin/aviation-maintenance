import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { ServicesContentSection } from '@/components/sections/ServicesContentSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { useServicesData } from '@/hooks/useServicesData';

export const ServicesPage: React.FC = () => {
  const { data, loading, error, hero, servicesContent, callToAction, seoMeta } = useServicesData();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Available</h1>
            <p className="text-gray-600">Sorry, we couldn't load the services page. Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={seoMeta?.title}
      description={seoMeta?.description}
    >
      {hero && (
        <PageHero 
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage={hero.backgroundImage}
        />
      )}
      
      {servicesContent && (
        <ServicesContentSection content={servicesContent} />
      )}
      
      {callToAction && (
        <WhyChooseUsSection 
          callToAction={callToAction} 
          layout="section"
        />
      )}
    </Layout>
  );
};

export default ServicesPage;