import { MainLayout } from '@/components/layout/MainLayout';
import { ClubClothingHeader } from '@/components/sections/ClubClothingHeader';
import { ClubClothingGallery } from '@/components/sections/ClubClothingGallery';
import { useClubClothingData } from '@/hooks/useClubClothingData';

export function ClubClothing() {
  const { clubClothingData, loading, error } = useClubClothingData();

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

  if (!clubClothingData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <p>No club clothing data available.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <ClubClothingHeader />
        <ClubClothingGallery />
      </div>
    </MainLayout>
  );
}