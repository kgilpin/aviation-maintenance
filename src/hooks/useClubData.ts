import { useState, useEffect } from 'react';
import type { ClubData } from '@/data/types';

export function useClubData() {
  const [clubData, setClubData] = useState<ClubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClubData = async () => {
      try {
        const response = await import('@/data/club.json');
        setClubData(response.default);
      } catch (err) {
        setError('Failed to load club data');
        console.error('Error loading club data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadClubData();
  }, []);

  return { clubData, loading, error };
}