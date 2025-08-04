import { useState, useEffect } from 'react';
import type { ServicesPageData, Service } from '@/data/types';
import servicesData from '@/data/services.json';

export const useServicesData = () => {
  const [data, setData] = useState<ServicesPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServicesData = async () => {
      try {
        setLoading(true);
        // Use the imported JSON data
        setData(servicesData as ServicesPageData);
        setError(null);
      } catch (err) {
        setError('Failed to load services page data');
        console.error('Error loading services data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServicesData();
  }, []);

  // Helper function to get a specific service by ID
  const getService = (id: string): Service | null => {
    return data?.servicesContent.services.find(service => service.id === id) || null;
  };

  // Helper function to get featured services
  const getFeaturedServices = (): Service[] => {
    return data?.servicesContent.services.filter(service => service.featured) || [];
  };

  // Helper function to get services by category (future extensibility)
  const getServicesByCategory = (category: string): Service[] => {
    return data?.servicesContent.services.filter(service => 
      (service as any).category === category
    ) || [];
  };

  // Helper function to format service title for URL/slug
  const getServiceSlug = (service: Service): string => {
    return service.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  return {
    data,
    loading,
    error,
    hero: data?.hero || null,
    servicesContent: data?.servicesContent || null,
    services: data?.servicesContent.services || [],
    callToAction: data?.callToAction || null,
    seoMeta: data?.seoMeta || null,
    // Helper functions
    getService,
    getFeaturedServices,
    getServicesByCategory,
    getServiceSlug
  };
};

export default useServicesData;