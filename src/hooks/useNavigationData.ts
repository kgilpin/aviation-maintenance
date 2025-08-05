import { useState, useEffect } from 'react';
import type { NavigationData, UseNavigationDataReturn } from '@/data/types';

export const useNavigationData = (): UseNavigationDataReturn => {
  const [navigation, setNavigation] = useState<NavigationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNavigationData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Import JSON data
        const navigationDataModule = await import('@/data/navigation.json');
        const navigationData = navigationDataModule.default as NavigationData;

        setNavigation(navigationData);
      } catch (err) {
        setError('Failed to load navigation data');
        console.error('Error loading navigation data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNavigationData();
  }, []);

  return { navigation, loading, error };
};