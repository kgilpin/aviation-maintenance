import { useState, useEffect } from 'react';
import type { TestimonialsData } from '@/data/types';

export const useTestimonialsData = () => {
  const [data, setData] = useState<TestimonialsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTestimonialsData = async () => {
      try {
        const response = await import('@/data/testimonials.json');
        setData(response.default as TestimonialsData);
      } catch (err) {
        setError('Failed to load testimonials data');
        console.error('Error loading testimonials data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonialsData();
  }, []);

  return { data, loading, error };
};