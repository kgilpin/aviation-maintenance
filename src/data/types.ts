// TypeScript interfaces for INTEGRAL page and site data

// Company and contact data types (existing)
export interface CompanyData {
  name: string;
  description: string;
  logo: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface ContactData {
  title: string;
  description: string;
  form: {
    action: string;
    method: string;
    fields: Array<{
      name: string;
      type: string;
      label: string;
      required: boolean;
      placeholder?: string;
    }>;
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface NavigationData {
  main: NavigationItem[];
  footer: NavigationItem[];
}

// INTEGRAL page specific interfaces
export interface AircraftModel {
  id: string;
  name: string;
  logo: string;
  description: string;
  status: 'certified' | 'in-progress' | 'development';
  certification: {
    easa: boolean;
    faa: boolean;
    details: string;
  };
  images: {
    hero: string;
    viewer360: string[];
    thumbnail: string;
  };
}

export interface TechnicalSpecification {
  category: string;
  items: Array<{
    label: string;
    value: string;
    unit?: string;
  }>;
}

export interface FeatureCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  company: string;
  logo: string;
  quote: string;
  author: {
    name: string;
    title: string;
  };
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface IntegralPageData {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    video: string;
    videoPoster: string;
    headline: string;
    subheadline: string;
    certification: string;
  };
  aircraftModels: AircraftModel[];
  features: FeatureCard[];
  specifications: TechnicalSpecification[];
  benefits: Benefit[];
  testimonials: Testimonial[];
  contact: {
    icon: string;
    message: string;
    link: string;
  };
  navigation: Array<{
    id: string;
    label: string;
    target: string;
  }>;
  availability: string;
  legalDisclaimer: string;
}

// Form validation types
export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface ValidationRules {
  [key: string]: {
    required?: boolean;
    email?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}