import { useState, useEffect } from 'react';
import type { HistoryData } from '@/data/types';

export function useHistoryData() {
  const [historyData, setHistoryData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistoryData = async () => {
      try {
        const response = await import('@/data/history.json');
        setHistoryData(response.default as HistoryData);
      } catch (err) {
        setError('Failed to load history data');
        console.error('Error loading history data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHistoryData();
  }, []);

  return { historyData, loading, error };
}