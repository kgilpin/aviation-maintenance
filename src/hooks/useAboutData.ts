import { useState, useEffect } from 'react';
import type { AboutPageData } from '@/data/types';
import aboutData from '@/data/about.json';

export const useAboutData = () => {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        setLoading(true);
        // Use the imported JSON data
        setData(aboutData as AboutPageData);
        setError(null);
      } catch (err) {
        setError('Failed to load about page data');
        console.error('Error loading about data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  return {
    data,
    loading,
    error,
    hero: data?.hero || null,
    companyHistory: data?.companyHistory || null,
    seoMeta: data?.seoMeta || null
  };
};

export default useAboutData;