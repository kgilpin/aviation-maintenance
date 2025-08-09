import { useMeetingsData } from '@/hooks/useMeetingsData';

export function MeetingsHeader() {
  const { meetingsData } = useMeetingsData();

  if (!meetingsData) return null;

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        {meetingsData.title}
      </h1>
    </header>
  );
}