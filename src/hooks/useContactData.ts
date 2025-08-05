import { useState, useEffect } from 'react';
import type { ContactData, UseContactDataReturn } from '@/data/types';

export const useContactData = (): UseContactDataReturn => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContactData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Import JSON data
        const contactDataModule = await import('@/data/contact.json');
        const contactData = contactDataModule.default as ContactData;

        setContactData(contactData);
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
};