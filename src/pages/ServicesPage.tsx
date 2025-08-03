import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';

export const ServicesPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Services - Yankee Aviation Services</title>
        <meta name="description" content="Comprehensive aircraft maintenance services including inspections, repairs, and certifications at Yankee Aviation in Plymouth, MA." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Services</h1>
        <p className="text-lg text-gray-700">
          We offer comprehensive aircraft maintenance services including general aviation maintenance, 
          special flight permits, recurrent standard airworthiness certificates, and more.
        </p>
      </div>
    </Layout>
  );
};

export default ServicesPage;