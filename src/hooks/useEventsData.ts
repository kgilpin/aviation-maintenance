import { useState, useEffect } from 'react';
import type { WaylandEventsData } from '@/data/types';

export function useEventsData() {
  const [eventsData, setEventsData] = useState<WaylandEventsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEventsData = async () => {
      try {
        const response = await import('@/data/events.json');
        setEventsData(response.default);
      } catch (err) {
        setError('Failed to load events data');
        console.error('Error loading events data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEventsData();
  }, []);

  return { eventsData, loading, error };
}