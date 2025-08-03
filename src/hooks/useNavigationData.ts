import { useMemo } from 'react';
import type { Navigation } from '@/data/types';
import navigationData from '@/data/navigation.json';

export const useNavigationData = (): Navigation => {
  return useMemo(() => navigationData as Navigation, []);
};