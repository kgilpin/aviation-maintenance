import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { ContactHero } from '@/components/sections/ContactHero';
import { ContactSection } from '@/components/sections/ContactSection';
import { ContactForm, type ContactFormData } from '@/components/sections/ContactForm';
import { GoogleMapsEmbed } from '@/components/ui/GoogleMapsEmbed';
import { useContactData } from '@/hooks/useContactData';

export const ContactPage: React.FC = () => {
  const contactData = useContactData();

  const handleFormSubmit = (formData: ContactFormData) => {
    // TODO: Implement actual form submission
    console.log('Form submitted:', formData);
    // Show success message (handled by ContactForm component)
  };

  return (
    <Layout>
      {/* SEO and Meta Tags */}
      <Helmet>
        <title>Contact - Yankee Aviation</title>
        <meta 
          name="description" 
          content="Led by Peter and Gail Conner, Yankee Aviation in Plymouth, MA is a full-service general aviation maintenance facility. We take pride in having a team of professionals who have extensive experience in annual inspections and full engine overhauls. If you are interested, get in touch with us today." 
        />
        <meta name="keywords" content="contact yankee aviation, plymouth ma aircraft maintenance, aviation services contact" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact - Yankee Aviation" />
        <meta property="og:description" content="Led by Peter and Gail Conner, Yankee Aviation in Plymouth, MA is a full-service general aviation maintenance facility." />
        <meta property="og:url" content="https://yankeeaviation.com/contact" />
        <meta property="og:site_name" content="Yankee Aviation" />
        <meta property="og:image" content="https://yankeeaviation.com/contact-hero-bg.jpg" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact - Yankee Aviation" />
        <meta name="twitter:description" content="Get in touch with our experienced aircraft maintenance team in Plymouth, MA." />
        <meta name="twitter:image" content="https://yankeeaviation.com/contact-hero-bg.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://yankeeaviation.com/contact" />
        
        {/* Structured Data for Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Yankee Aviation Services",
            "description": "Full-service general aviation maintenance facility",
            "url": "https://yankeeaviation.com",
            "telephone": contactData.phone,
            "email": contactData.email,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": `${contactData.address.street}, ${contactData.address.gate}`,
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
            "openingHours": [
              "Mo-Sa 08:00-16:30"
            ],
            "sameAs": [
              "https://yankeeaviation.com"
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <ContactHero />

      {/* Main Contact Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
              Contact us today to discuss your aircraft maintenance needs. We're here to help keep you flying safely.
            </p>
          </div>

          {/* Two-Column Layout: Contact Info + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information (Reuse existing ContactSection) */}
            <div className="space-y-6">
              <ContactSection contact={contactData} className="py-0" />
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">
              Find Us
            </h2>
            <p className="text-lg text-gray-600 font-body">
              Visit us at Plymouth Municipal Airport, conveniently located in Plymouth, Massachusetts.
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="max-w-4xl mx-auto">
            <GoogleMapsEmbed 
              embedUrl={contactData.googleMaps.embedUrl}
              height={400}
              title="Yankee Aviation Services - Plymouth Municipal Airport Location"
              className="rounded-lg shadow-lg"
            />
            
            {/* Address Information Below Map */}
            <div className="mt-6 text-center">
              <div className="inline-block bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-2 font-heading">Our Location</h3>
                <p className="text-gray-600 font-body">
                  <strong>{contactData.address.street}, {contactData.address.gate}</strong><br />
                  {contactData.address.facility}<br />
                  {contactData.address.city}, {contactData.address.state} {contactData.address.zipCode}
                </p>
                <a 
                  href="https://goo.gl/maps/77wH5wiK7ibGjvUo8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;