import { useState, useEffect } from 'react';
import type { GunData } from '@/data/types';

export function useGunData() {
  const [gunData, setGunData] = useState<GunData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGunData = async () => {
      try {
        const response = await import('@/data/the-gun.json');
        setGunData(response.default as GunData);
      } catch (err) {
        setError('Failed to load gun data');
        console.error('Error loading gun data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGunData();
  }, []);

  return { gunData, loading, error };
}