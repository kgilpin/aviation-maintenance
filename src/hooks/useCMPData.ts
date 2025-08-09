import { useState, useEffect } from 'react';
import type { CMPData } from '@/data/types';

export function useCMPData() {
  const [cmpData, setCMPData] = useState<CMPData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCMPData = async () => {
      try {
        const response = await import('@/data/cmp.json');
        setCMPData(response.default);
      } catch (err) {
        setError('Failed to load CMP data');
        console.error('Error loading CMP data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCMPData();
  }, []);

  return { cmpData, loading, error };
}