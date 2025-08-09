import { useState, useEffect } from 'react';
import type { MeetingsData } from '@/data/types';

export function useMeetingsData() {
  const [meetingsData, setMeetingsData] = useState<MeetingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeetingsData = async () => {
      try {
        const response = await import('@/data/meetings.json');
        setMeetingsData(response.default as MeetingsData);
      } catch (err) {
        setError('Failed to load meetings data');
        console.error('Error loading meetings data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMeetingsData();
  }, []);

  return { meetingsData, loading, error };
}