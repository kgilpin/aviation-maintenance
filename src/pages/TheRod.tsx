import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { RodHeader } from '@/components/sections/RodHeader';
import { RodLeadRegulation } from '@/components/sections/RodLeadRegulation';
import { RodFishingShows } from '@/components/sections/RodFishingShows';
import { RodMemberPresentation } from '@/components/sections/RodMemberPresentation';
import { useRodData } from '@/hooks/useRodData';

export function TheRod() {
  const { rodData, loading, error } = useRodData();

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </MainLayout>
    );
  }

  if (!rodData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <p>No rod data available.</p>
        </div>
      </MainLayout>
    );
  }

  // Use a water-themed background similar to the original
  const backgroundStyle = {
    backgroundImage: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
    minHeight: '100vh'
  };

  return (
    <div style={backgroundStyle}>
      <Helmet>
        <title>{rodData.seo.title}</title>
        <meta name="description" content={rodData.seo.description} />
      </Helmet>
      <MainLayout>
        <div className="max-w-4xl mx-auto space-y-8 py-8">
          <RodHeader />
          <RodLeadRegulation />
          <RodFishingShows />
          <RodMemberPresentation />
        </div>
      </MainLayout>
    </div>
  );
}