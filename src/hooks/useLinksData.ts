import { useState, useEffect } from 'react';
import type { LinksData } from '@/data/types';

export function useLinksData() {
  const [linksData, setLinksData] = useState<LinksData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLinksData = async () => {
      try {
        const response = await import('@/data/links.json');
        setLinksData(response.default);
      } catch (err) {
        setError('Failed to load links data');
        console.error('Error loading links data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLinksData();
  }, []);

  return { linksData, loading, error };
}