import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';

export const ContactPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Contact Us - Yankee Aviation Services</title>
        <meta name="description" content="Contact Yankee Aviation for all your aircraft maintenance needs. Located in Plymouth, MA with 44+ years of experience." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700">
          Get in touch with our experienced team for all your aircraft maintenance needs. 
          We're located at Plymouth Municipal Airport and ready to help.
        </p>
      </div>
    </Layout>
  );
};

export default ContactPage;