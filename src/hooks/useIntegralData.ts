import { useMemo } from 'react';
import type { IntegralPageData, AircraftModel, FeatureCard, TechnicalSpecification, Testimonial, Benefit } from '@/data/types';
import integralData from '@/data/integral.json';
import aircraftModelsData from '@/data/aircraftModels.json';
import featuresData from '@/data/integralFeatures.json';
import specificationsData from '@/data/integralSpecifications.json';
import testimonialsData from '@/data/integralTestimonials.json';
import benefitsData from '@/data/integralBenefits.json';

export function useIntegralData(): IntegralPageData {
  return useMemo(() => {
    const data: IntegralPageData = {
      meta: integralData.meta,
      hero: integralData.hero,
      aircraftModels: aircraftModelsData.models as AircraftModel[],
      features: featuresData.features as FeatureCard[],
      specifications: specificationsData.specifications as TechnicalSpecification[],
      benefits: benefitsData.benefits as Benefit[],
      testimonials: testimonialsData.testimonials as Testimonial[],
      contact: integralData.contact,
      navigation: integralData.navigation,
      availability: integralData.availability,
      legalDisclaimer: integralData.legalDisclaimer
    };

    return data;
  }, []);
}

export function useAircraftModels(): AircraftModel[] {
  return useMemo(() => {
    return aircraftModelsData.models as AircraftModel[];
  }, []);
}

export function useIntegralFeatures(): FeatureCard[] {
  return useMemo(() => {
    return featuresData.features as FeatureCard[];
  }, []);
}

export function useIntegralSpecifications(): TechnicalSpecification[] {
  return useMemo(() => {
    return specificationsData.specifications as TechnicalSpecification[];
  }, []);
}

export function useIntegralTestimonials(): Testimonial[] {
  return useMemo(() => {
    return testimonialsData.testimonials as Testimonial[];
  }, []);
}

export function useIntegralBenefits(): Benefit[] {
  return useMemo(() => {
    return benefitsData.benefits as Benefit[];
  }, []);
}