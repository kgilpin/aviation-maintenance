import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { LocationHeader } from '@/components/sections/LocationHeader';
import { LocationList } from '@/components/sections/LocationList';
import { useLocationData } from '@/hooks/useLocationData';

export function Location() {
  const { locationData, loading, error } = useLocationData();

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

  if (!locationData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <p>No location data available.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>{locationData.seo.title}</title>
        <meta name="description" content={locationData.seo.description} />
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-8">
        <LocationHeader />
        <LocationList />
      </div>
    </MainLayout>
  );
}