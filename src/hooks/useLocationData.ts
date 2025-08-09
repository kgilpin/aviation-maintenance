import { useState, useEffect } from 'react';
import type { LocationData } from '@/data/types';

export function useLocationData() {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLocationData = async () => {
      try {
        setLoading(true);
        const response = await import('@/data/location.json');
        setLocationData(response.default);
      } catch (err) {
        console.error('Failed to load location data:', err);
        setError('Failed to load location data');
      } finally {
        setLoading(false);
      }
    };

    loadLocationData();
  }, []);

  return { locationData, loading, error };
}