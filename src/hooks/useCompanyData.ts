import { useState, useEffect } from 'react';
import type { CompanyData, UseCompanyDataReturn } from '@/data/types';
import { resolveImagePath } from '@/utils/imageMap';

export const useCompanyData = (): UseCompanyDataReturn => {
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Import JSON data
        const companyDataModule = await import('@/data/company.json');
        const companyData = companyDataModule.default as CompanyData;

        // Resolve image paths
        const resolvedCompanyData = {
          ...companyData,
          logo: {
            ...companyData.logo,
            main: resolveImagePath(companyData.logo.main),
            favicon: resolveImagePath(companyData.logo.favicon),
          },
          branding: {
            ...companyData.branding,
            backgroundImage: resolveImagePath(companyData.branding.backgroundImage),
          },
          pwa: {
            ...companyData.pwa,
            appleTouchIcon: resolveImagePath(companyData.pwa.appleTouchIcon),
            favicon16: resolveImagePath(companyData.pwa.favicon16),
            favicon32: resolveImagePath(companyData.pwa.favicon32),
            safariPinnedTab: resolveImagePath(companyData.pwa.safariPinnedTab),
          }
        };

        setCompany(resolvedCompanyData);
      } catch (err) {
        setError('Failed to load company data');
        console.error('Error loading company data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCompanyData();
  }, []);

  return { company, loading, error };
};