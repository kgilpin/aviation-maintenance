import { MainLayout } from '@/components/layout/MainLayout';
import { MeetingsHeader } from '@/components/sections/MeetingsHeader';
import { MeetingsSchedule } from '@/components/sections/MeetingsSchedule';
import { useMeetingsData } from '@/hooks/useMeetingsData';

export function Meetings() {
  const { meetingsData, loading, error } = useMeetingsData();

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

  if (!meetingsData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <p>No meetings data available.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <MeetingsHeader />
        <MeetingsSchedule />
      </div>
    </MainLayout>
  );
}