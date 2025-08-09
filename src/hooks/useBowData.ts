import { useState, useEffect } from 'react';
import type { BowData } from '@/data/types';

export function useBowData() {
  const [bowData, setBowData] = useState<BowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBowData = async () => {
      try {
        setLoading(true);
        const response = await import('@/data/thebow.json');
        setBowData(response.default);
      } catch (err) {
        console.error('Failed to load bow data:', err);
        setError('Failed to load bow data');
      } finally {
        setLoading(false);
      }
    };

    loadBowData();
  }, []);

  return { bowData, loading, error };
}