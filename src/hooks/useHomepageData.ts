import { useState, useEffect } from 'react';
import type { WaylandHomepageData } from '@/data/types';

export function useHomepageData() {
  const [homepageData, setHomepageData] = useState<WaylandHomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHomepageData = async () => {
      try {
        const response = await import('@/data/homepage.json');
        setHomepageData(response.default);
      } catch (err) {
        setError('Failed to load homepage data');
        console.error('Error loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomepageData();
  }, []);

  return { homepageData, loading, error };
}