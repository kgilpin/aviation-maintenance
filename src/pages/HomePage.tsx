import React from 'react';
import { Helmet } from 'react-helmet-async';

// Layout Components
import { Layout } from '@/components/layout/Layout';

// Section Components
import { HeroSection } from '@/components/sections/HeroSection';
import { QuickLinksSection } from '@/components/sections/QuickLinksSection';
import { LeaderSection } from '@/components/sections/LeaderSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { WhatWeDoSection } from '@/components/sections/WhatWeDoSection';
// import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';

// Custom Hooks for Data
import { useHomeData } from '@/hooks/useHomeData';
import { useCompanyData } from '@/hooks/useCompanyData';
import { useContactData } from '@/hooks/useContactData';

export const HomePage: React.FC = () => {
  // Data Loading
  const homeData = useHomeData();
  const companyData = useCompanyData();
  const contactData = useContactData();

  return (
    <Layout>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{homeData.seoMeta.title}</title>
        <meta name="description" content={homeData.seoMeta.description} />
        <meta name="keywords" content={homeData.seoMeta.keywords.join(', ')} />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={homeData.seoMeta.title} />
        <meta property="og:description" content={homeData.seoMeta.description} />
        <meta property="og:url" content="https://yankeeaviation.com/" />
        <meta property="og:site_name" content={companyData.name} />
        {homeData.seoMeta.ogImage && (
          <meta property="og:image" content={homeData.seoMeta.ogImage} />
        )}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={homeData.seoMeta.title} />
        <meta name="twitter:description" content={homeData.seoMeta.description} />
        
        {/* Structured Data - Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://yankeeaviation.com/#organization",
            "name": companyData.name,
            "description": companyData.description,
            "foundingDate": companyData.establishedYear.toString(),
            "url": "https://yankeeaviation.com/",
            "telephone": contactData.phone,
            "email": contactData.email,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": contactData.address.street,
              "addressLocality": contactData.address.city,
              "addressRegion": contactData.address.state,
              "postalCode": contactData.address.zipCode,
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": contactData.googleMaps.coordinates.lat,
              "longitude": contactData.googleMaps.coordinates.lng
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "08:00",
                "closes": "16:30"
              }
            ],
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": contactData.googleMaps.coordinates.lat,
                "longitude": contactData.googleMaps.coordinates.lng
              },
              "geoRadius": "100000"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Aircraft Maintenance Services",
              "itemListElement": homeData.services.services.map((service) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service
                }
              }))
            }
          })}
        </script>
      </Helmet>

      {/* Page Content */}
      <HeroSection hero={homeData.hero} />
      
      <QuickLinksSection quickLinks={homeData.quickLinks} />
      
      <LeaderSection />
      
      <AboutSection 
        about={homeData.about} 
        company={companyData} 
      />
      
      <WhatWeDoSection />
      
      <TestimonialsSection testimonials={homeData.testimonials} />
      
      <ContactSection contact={contactData} />
    </Layout>
  );
};

export default HomePage;