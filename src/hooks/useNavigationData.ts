import { useState, useEffect } from 'react';
import type { WaylandNavigationData } from '@/data/types';

export function useNavigationData() {
  const [navigationData, setNavigationData] = useState<WaylandNavigationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNavigationData = async () => {
      try {
        const response = await import('@/data/navigation.json');
        setNavigationData(response.default);
      } catch (err) {
        setError('Failed to load navigation data');
        console.error('Error loading navigation data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNavigationData();
  }, []);

  return { navigationData, loading, error };
}