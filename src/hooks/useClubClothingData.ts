import { useState, useEffect } from 'react';
import type { ClubClothingData } from '@/data/types';

export function useClubClothingData() {
  const [clubClothingData, setClubClothingData] = useState<ClubClothingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClubClothingData = async () => {
      try {
        const response = await import('@/data/clubclothing.json');
        setClubClothingData(response.default as ClubClothingData);
      } catch (err) {
        setError('Failed to load club clothing data');
        console.error('Error loading club clothing data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadClubClothingData();
  }, []);

  return { clubClothingData, loading, error };
}