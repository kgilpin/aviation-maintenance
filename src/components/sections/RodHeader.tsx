import { useRodData } from '@/hooks/useRodData';

export function RodHeader() {
  const { rodData } = useRodData();

  if (!rodData) return null;

  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-4">
        {rodData.title}
      </h1>
      <h2 className="text-xl mb-6">
        {rodData.subtitle}
      </h2>
      <hr className="mx-auto w-3/5 border-gray-400 mb-6" />
    </header>
  );
}