import { useMemo } from 'react';
import type { HomeData } from '@/data/types';
import homeData from '@/data/home.json';

export const useHomeData = (): HomeData => {
  return useMemo(() => homeData as HomeData, []);
};