import { useMemo } from 'react';
import type { Company } from '@/data/types';
import companyData from '@/data/company.json';

export const useCompanyData = (): Company => {
  return useMemo(() => companyData as Company, []);
};