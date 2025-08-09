import { useState, useEffect } from 'react';
import type { PreviousEventsData } from '@/data/types';

export function usePreviousEventsData() {
  const [previousEventsData, setPreviousEventsData] = useState<PreviousEventsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPreviousEventsData = async () => {
      try {
        const response = await import('@/data/previous-events.json');
        setPreviousEventsData(response.default as PreviousEventsData);
      } catch (err) {
        setError('Failed to load previous events data');
        console.error('Error loading previous events data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPreviousEventsData();
  }, []);

  return { previousEventsData, loading, error };
}