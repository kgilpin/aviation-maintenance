import { useState, useEffect } from 'react';
import type { HomepageData } from '@/data/types';

export const useHomepageData = () => {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHomepageData = async () => {
      try {
        const response = await import('@/data/homepage.json');
        setData(response.default as HomepageData);
      } catch (err) {
        setError('Failed to load homepage data');
        console.error('Error loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomepageData();
  }, []);

  return { data, loading, error };
};