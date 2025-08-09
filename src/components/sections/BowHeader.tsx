import { useBowData } from '@/hooks/useBowData';

export function BowHeader() {
  const { bowData } = useBowData();

  if (!bowData) return null;

  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-4">
        {bowData.title}
      </h1>
      <h2 className="text-xl mb-6">
        {bowData.subtitle}
      </h2>
      <hr className="mx-auto w-3/5 border-gray-400 mb-6" />
    </header>
  );
}