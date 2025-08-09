import { useLocationData } from '@/hooks/useLocationData';

export function LocationHeader() {
  const { locationData } = useLocationData();

  if (!locationData) return null;

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-6">
        {locationData.title}
      </h1>
    </header>
  );
}