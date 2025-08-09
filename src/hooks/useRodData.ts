import { useState, useEffect } from 'react';
import type { RodData } from '@/data/types';

export function useRodData() {
  const [rodData, setRodData] = useState<RodData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRodData = async () => {
      try {
        setLoading(true);
        const response = await import('@/data/therod.json');
        setRodData(response.default);
      } catch (err) {
        console.error('Failed to load rod data:', err);
        setError('Failed to load rod data');
      } finally {
        setLoading(false);
      }
    };

    loadRodData();
  }, []);

  return { rodData, loading, error };
}