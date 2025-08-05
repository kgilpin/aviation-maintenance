import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { PremierCourseSection } from '@/components/sections/PremierCourseSection';
import { WhyPlaySection } from '@/components/sections/WhyPlaySection';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { AppPromotionSection } from '@/components/sections/AppPromotionSection';
import { UpcomingEventsSection } from '@/components/sections/UpcomingEventsSection';
import { ContactMapSection } from '@/components/sections/ContactMapSection';
import { useCompanyData } from '@/hooks/useCompanyData';

export const Homepage: React.FC = () => {
  const { data: company } = useCompanyData();

  return (
    <>
      <Helmet>
        <title>{company?.seo?.title || 'Spring Meadows Golf Club'}</title>
        <meta name="description" content={company?.seo?.description || 'Enjoy a memorable round of golf with exceptional service at Spring Meadows Golf Club in Gray, Maine.'} />
        <meta property="og:title" content={company?.seo?.title || 'Spring Meadows Golf Club'} />
        <meta property="og:description" content={company?.seo?.description || 'Enjoy a memorable round of golf with exceptional service at Spring Meadows Golf Club in Gray, Maine.'} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={company?.seo?.title || 'Spring Meadows Golf Club'} />
        <meta name="twitter:description" content={company?.seo?.description || 'Enjoy a memorable round of golf with exceptional service at Spring Meadows Golf Club in Gray, Maine.'} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GolfCourse",
            "name": company?.name || "Spring Meadows Golf Club",
            "description": company?.seo?.description || "Enjoy a memorable round of golf with exceptional service at Spring Meadows Golf Club in Gray, Maine.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "59 Lewiston Road",
              "addressLocality": "Gray",
              "addressRegion": "ME",
              "postalCode": "04039",
              "addressCountry": "US"
            },
            "telephone": company?.phone || "207.657.2586",
            "url": "https://www.springmeadowsgolf.com/",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 43.89925,
              "longitude": -70.32743
            },
            "sameAs": [
              company?.social?.facebook || "https://www.facebook.com/springmeadowsgolf/"
            ]
          })}
        </script>
      </Helmet>

      <Layout>
        <HeroSection />
        <PremierCourseSection />
        <WhyPlaySection />
        <TestimonialSection />
        <AppPromotionSection />
        <UpcomingEventsSection />
        <ContactMapSection />
      </Layout>
    </>
  );
};