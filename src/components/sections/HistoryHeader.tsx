import { useHistoryData } from '@/hooks/useHistoryData';

export function HistoryHeader() {
  const { historyData } = useHistoryData();

  if (!historyData) return null;

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-6">
        {historyData.title}
      </h1>
    </header>
  );
}