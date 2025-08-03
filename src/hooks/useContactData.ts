import { useMemo } from 'react';
import type { Contact } from '@/data/types';
import contactData from '@/data/contact.json';

export const useContactData = (): Contact => {
  return useMemo(() => contactData as Contact, []);
};