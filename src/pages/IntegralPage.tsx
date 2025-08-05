import { Helmet } from 'react-helmet-async';
import { useIntegralData } from '@/hooks/useIntegralData';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroVideoSection } from '@/components/sections/HeroVideoSection';
import { AircraftViewerSection } from '@/components/sections/AircraftViewerSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { AvailabilityStatus } from '@/components/ui/AvailabilityStatus';
import { SpecificationsSection } from '@/components/sections/SpecificationsSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';

export function IntegralPage(): JSX.Element {
  const integralData = useIntegralData();

  return (
    <>
      <Helmet>
        <title>{integralData.meta.title}</title>
        <meta name="description" content={integralData.meta.description} />
        <meta name="keywords" content={integralData.meta.keywords.join(', ')} />
        <meta property="og:title" content={integralData.meta.title} />
        <meta property="og:description" content={integralData.meta.description} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={integralData.meta.title} />
        <meta name="twitter:description" content={integralData.meta.description} />
      </Helmet>

      <div className="integral-page bg-black text-white min-h-screen">
        {/* Site Header */}
        <Header />

        {/* Fixed Sidebar Navigation */}
        <SidebarNavigation 
          navigationItems={integralData.navigation}
          className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
        />

        {/* Hero Video Section */}
        <section id="video" className="relative">
          <HeroVideoSection
            video={integralData.hero.video}
            videoPoster={integralData.hero.videoPoster}
            headline={integralData.hero.headline}
            certification={integralData.hero.certification}
          />
        </section>

        {/* Aircraft Viewer Section */}
        <section id="integral" className="py-20">
          <AircraftViewerSection
            models={integralData.aircraftModels}
            defaultModelId="integral-r"
          />
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <FeaturesSection features={integralData.features} />
          </div>
        </section>

        {/* Availability Status */}
        <section className="py-10">
          <div className="container mx-auto px-4 text-center">
            <AvailabilityStatus status={integralData.availability} />
          </div>
        </section>

        {/* Technical Specifications */}
        <section id="characteristics" className="py-20">
          <SpecificationsSection
            specifications={integralData.specifications}
            backgroundImage="/images/INTEGRAL-R-HANGAR-DARK_Website.png"
          />
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <BenefitsSection benefits={integralData.benefits} />
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ContactSection
              icon={integralData.contact.icon}
              message={integralData.contact.message}
              link={integralData.contact.link}
            />
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <TestimonialsSection testimonials={integralData.testimonials} />
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="py-10 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <p className="text-sm text-gray-400 text-center max-w-4xl mx-auto">
              {integralData.legalDisclaimer}
            </p>
          </div>
        </section>

        {/* Site Footer */}
        <Footer />
      </div>
    </>
  );
}