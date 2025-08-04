import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import type { Navigation } from '@/data/types';
import navigationData from '@/data/navigation.json';

export const useNavigationData = (): Navigation => {
  const location = useLocation();
  
  return useMemo(() => {
    const nav = navigationData as Navigation;
    
    // Add active state based on current location
    const updatedPrimary = nav.primary.map(item => ({
      ...item,
      isActive: location.pathname === item.path
    }));
    
    return {
      ...nav,
      primary: updatedPrimary
    };
  }, [location.pathname]);
};