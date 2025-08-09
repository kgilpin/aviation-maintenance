import { useState, useEffect } from 'react';
import type { ContactData } from '@/data/types';

export function useContactData() {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContactData = async () => {
      try {
        const response = await import('@/data/contact.json');
        setContactData(response.default);
      } catch (err) {
        setError('Failed to load contact data');
        console.error('Error loading contact data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContactData();
  }, []);

  return { contactData, loading, error };
}