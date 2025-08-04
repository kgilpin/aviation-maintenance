import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { TeamMemberBioSection } from '@/components/sections/TeamMemberBioSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { useAboutData } from '@/hooks/useAboutData';
import { useTeamData } from '@/hooks/useTeamData';
import { useContactData } from '@/hooks/useContactData';

export const AboutPage: React.FC = () => {
  const { 
    seoMeta, 
    loading: aboutLoading, 
    error: aboutError 
  } = useAboutData();
  
  const { 
    members, 
    loading: teamLoading, 
    error: teamError 
  } = useTeamData();
  
  const contactData = useContactData();

  // Handle loading states
  if (aboutLoading || teamLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  // Handle error states
  if (aboutError || teamError) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Unable to Load About Page
            </h1>
            <p className="text-gray-600">
              {aboutError || teamError || 'An unexpected error occurred.'}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Use all team members in the order they appear on live site
  const displayedMembers = members;

  return (
    <Layout>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{seoMeta?.title || 'About Us - Yankee Aviation Services'}</title>
        <meta 
          name="description" 
          content={seoMeta?.description || "Learn about Yankee Aviation's 44+ years of experience in aircraft maintenance services in Plymouth, MA."} 
        />
        {seoMeta?.keywords && (
          <meta name="keywords" content={seoMeta.keywords.join(', ')} />
        )}
        {seoMeta?.ogImage && <meta property="og:image" content={seoMeta.ogImage} />}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yankeeaviation.com/about" />
        <link rel="canonical" href="https://yankeeaviation.com/about" />
      </Helmet>

      {/* Page Content */}
      <PageHero 
        title="ABOUT"
        backgroundImage="/images/cloud-background.jpg"
      />
      
      {/* Team Member Biographical Sections */}
      {displayedMembers.map((member, index) => (
        <TeamMemberBioSection
          key={member.id}
          member={member}
          imagePosition={index % 2 === 0 ? 'left' : 'right'}
          showReadMore={member.id === 'peter-conner'}
        />
      ))}

      {contactData && (
        <ContactSection 
          contact={contactData}
          className="bg-gray-50"
        />
      )}
    </Layout>
  );
};

export default AboutPage;