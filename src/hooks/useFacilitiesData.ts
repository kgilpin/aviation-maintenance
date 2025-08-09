import { useState, useEffect } from 'react';
import type { FacilitiesData } from '@/data/types';

export function useFacilitiesData() {
  const [facilitiesData, setFacilitiesData] = useState<FacilitiesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFacilitiesData = async () => {
      try {
        const response = await import('@/data/facilities.json');
        setFacilitiesData(response.default as FacilitiesData);
      } catch (err) {
        setError('Failed to load facilities data');
        console.error('Error loading facilities data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFacilitiesData();
  }, []);

  return { facilitiesData, loading, error };
}