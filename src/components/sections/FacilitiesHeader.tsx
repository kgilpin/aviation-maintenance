import { useFacilitiesData } from '@/hooks/useFacilitiesData';

export function FacilitiesHeader() {
  const { facilitiesData } = useFacilitiesData();

  if (!facilitiesData) return null;

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-6">
        {facilitiesData.pageTitle}
      </h1>
    </header>
  );
}