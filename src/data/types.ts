// TypeScript interfaces for Falcon Air data structures

export interface Company {
  name: string;
  tagline: string;
  location: string;
  phone: string;
  description: string;
  services: {
    primary: string[];
    specialties: string[];
  };
  values: string[];
  experience_years: string;
}

export interface NavigationItem {
  text: string;
  url: string;
  description: string;
}

export interface Navigation {
  main: NavigationItem[];
  contact: {
    phone: string;
    phone_formatted: string;
  };
  social: {
    facebook?: {
      url: string;
      icon: string;
    };
  };
  partnerships: {
    [key: string]: {
      name: string;
      url: string;
      logo: string;
    };
  };
}

export interface Contact {
  phone: {
    display: string;
    tel: string;
  };
  location: {
    name: string;
    address: string;
  };
  services_available: string[];
  social: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
}

export interface CTAButton {
  text: string;
  url: string;
  external?: boolean;
  style?: 'primary' | 'secondary';
  size?: 'default' | 'large' | 'small';
}

export interface HeroSection {
  heading: string;
  description?: string;
  background: {
    type: 'image' | 'video';
    image: string;
    blur?: boolean;
    video_url?: string;
    poster?: string;
    fallback_image?: string;
  };
  cta?: CTAButton;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface PartnerLogo {
  src: string;
  alt: string;
  name: string;
  url?: string;
}

export interface AmenitiesSection {
  heading: string;
  items: string[];
  cta: CTAButton;
}

export interface GallerySection {
  heading?: string;
  images: GalleryImage[];
}

export interface PartnersSection {
  heading: string;
  logos: PartnerLogo[];
}

export interface HomeData {
  seo: SEO;
  hero: HeroSection;
  sections: {
    amenities: AmenitiesSection;
    gallery: GallerySection;
    partners: PartnersSection;
  };
}

export interface MediaFile {
  filename: string;
  path: string;
  description: string;
  usage: string[];
  dimensions?: {
    width: number;
    height: number;
  };
  filesize?: string;
  category: 'branding' | 'aircraft' | 'facilities' | 'people' | 'partnerships' | 'logos';
}

export interface Media {
  media: {
    [category: string]: {
      [key: string]: MediaFile;
    };
  };
}

// Utility types
export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'default' | 'large' | 'small';
export type MediaCategory = 'branding' | 'aircraft' | 'facilities' | 'people' | 'partnerships' | 'logos';