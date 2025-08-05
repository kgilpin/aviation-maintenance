import { useState, useEffect } from 'react';
import type { CompanyData } from '@/data/types';

export const useCompanyData = () => {
  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        const response = await import('@/data/company.json');
        setData(response.default as CompanyData);
      } catch (err) {
        setError('Failed to load company data');
        console.error('Error loading company data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCompanyData();
  }, []);

  return { data, loading, error };
};