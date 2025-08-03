import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';

export const AboutPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>About Us - Yankee Aviation Services</title>
        <meta name="description" content="Learn about Yankee Aviation's 44+ years of experience in aircraft maintenance services in Plymouth, MA." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Yankee Aviation</h1>
        <p className="text-lg text-gray-700">
          For more than 44 years, Yankee Aviation in Plymouth, Massachusetts has been offering 
          a wide range of aircraft maintenance services. Learn more about our history, team, and commitment to excellence.
        </p>
      </div>
    </Layout>
  );
};

export default AboutPage;