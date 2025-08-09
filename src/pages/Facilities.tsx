import { MainLayout } from '@/components/layout/MainLayout';
import { FacilitiesHeader } from '@/components/sections/FacilitiesHeader';
import { FacilitySection } from '@/components/sections/FacilitySection';
import { useFacilitiesData } from '@/hooks/useFacilitiesData';

export function Facilities() {
  const { facilitiesData, loading, error } = useFacilitiesData();

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

  if (!facilitiesData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <p>No facilities data available.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <FacilitiesHeader />
        
        {facilitiesData.facilities.map((facility) => (
          <FacilitySection key={facility.id} facility={facility} />
        ))}
      </div>
    </MainLayout>
  );
}