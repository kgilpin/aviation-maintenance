import { MainLayout } from '@/components/layout/MainLayout';
import { HistoryHeader } from '@/components/sections/HistoryHeader';
import { HistoryContent } from '@/components/sections/HistoryContent';
import { useHistoryData } from '@/hooks/useHistoryData';

export function History() {
  const { historyData, loading, error } = useHistoryData();

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

  if (!historyData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <p>No history data available.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <HistoryHeader />
        <HistoryContent />
      </div>
    </MainLayout>
  );
}