import { useState, useEffect } from 'react';
import type { NavigationData } from '@/data/types';

export const useNavigationData = () => {
  const [data, setData] = useState<NavigationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNavigationData = async () => {
      try {
        const response = await import('@/data/navigation.json');
        setData(response.default as NavigationData);
      } catch (err) {
        setError('Failed to load navigation data');
        console.error('Error loading navigation data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNavigationData();
  }, []);

  return { data, loading, error };
};