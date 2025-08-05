import { useState, useEffect } from 'react';
import type { EventsData } from '@/data/types';

export const useEventsData = () => {
  const [data, setData] = useState<EventsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEventsData = async () => {
      try {
        const response = await import('@/data/events.json');
        setData(response.default as EventsData);
      } catch (err) {
        setError('Failed to load events data');
        console.error('Error loading events data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEventsData();
  }, []);

  return { data, loading, error };
};