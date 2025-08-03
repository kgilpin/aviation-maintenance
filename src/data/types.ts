/**
 * TypeScript interfaces for Yankee Aviation website data structures
 * Ensures type safety across all components and data access patterns
 */

// Company Information Interfaces
export interface Company {
  name: string;
  establishedYear: number;
  yearsInBusiness: number;
  owners: string[];
  businessType: string;
  description: string;
  location: {
    facility: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    airport: string;
  };
  certifications?: string[];
  specialties: string[];
}

// Contact Information Interfaces
export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Contact {
  phone: string;
  email: string;
  address: {
    street: string;
    gate?: string;
    facility: string;
    city: string;
    state: string;
    zipCode: string;
  };
  hours: BusinessHours;
  googleMaps: {
    embedUrl: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

// Navigation Structure Interfaces
export interface NavigationItem {
  label: string;
  path: string;
  isActive?: boolean;
}

export interface Navigation {
  primary: NavigationItem[];
  mobile: {
    enabled: boolean;
    breakpoint: string;
  };
}

// Home Page Content Interfaces
export interface HeroContent {
  primaryHeading: string;
  secondaryHeading: string;
  description: string;
  callToAction?: {
    text: string;
    link: string;
  };
  backgroundImage?: string;
}

export interface QuickLink {
  title: string;
  image: string;
  imageAlt: string;
  link: string;
}

export interface AboutContent {
  heading: string;
  description: string[];
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface ServiceOverview {
  heading: string;
  description: string;
  services: string[];
  image: string;
  imageAlt: string;
}

/**
 * Customer testimonial with optional credentials and service highlights
 */
export interface Testimonial {
  name: string;
  credentials?: string;
  yearsAsCustomer?: number;
  quote: string;
  highlights?: string[];
}

export interface TestimonialsSection {
  heading: string;
  testimonials: Testimonial[];
}

/**
 * Complete home page data structure
 */
export interface HomeData {
  hero: HeroContent;
  quickLinks: QuickLink[];
  about: AboutContent;
  services: ServiceOverview;
  testimonials: TestimonialsSection;
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}

// Media Assets Interfaces
export interface MediaAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export interface MediaGallery {
  images: MediaAsset[];
  featured?: MediaAsset;
}

// Enhanced Media Documentation Interfaces
export interface MediaItem {
  path: string;
  description: string;
  usage: string;
  context: string;
  components?: string[];
  dimensions?: string;
  source?: string;
}

export interface ExtractedImage {
  path: string;
  description: string;
  usage: string;
  source: string;
  context: string;
  dimensions?: string;
}

export interface MediaCategory {
  [key: string]: MediaItem;
}

export interface ExtractedImageCategory {
  [key: string]: ExtractedImage;
}

export interface MediaData {
  media: {
    images: MediaCategory;
    extractedImages: {
      homePageImages: ExtractedImageCategory;
      contactPageImages: ExtractedImageCategory;
      servicesPageImages: ExtractedImageCategory;
      aboutPageImages: ExtractedImageCategory;
      favicon: ExtractedImageCategory;
    };
    assets: MediaCategory;
  };
}

// Common component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Button component interfaces
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Team Member Interfaces
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  shortBio: string;
  fullBio?: string;
  credentials?: string[];
  achievements?: string[];
  specialties?: string[];
  yearsWithCompany?: number;
  personalInterests?: string[];
  currentAircraft?: string;
  education?: string[];
}

export interface TeamSection {
  heading: string;
  subheading?: string;
  description?: string;
  members: TeamMember[];
}

// About Page Content Interfaces
export interface AboutHeroContent {
  primaryHeading: string;
  secondaryHeading?: string;
  description: string;
  backgroundImage?: string;
  callToAction?: {
    text: string;
    link: string;
  };
}

export interface CompanyHistoryContent {
  heading: string;
  description: string[];
  highlights: string[];
  timeline?: {
    year: number;
    event: string;
  }[];
  image?: string;
  imageAlt?: string;
}

export interface AboutPageData {
  hero: AboutHeroContent;
  companyHistory: CompanyHistoryContent;
  team: TeamSection;
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}

// Enhanced Company Interface Extensions
export interface Award {
  title: string;
  year: number;
  organization: string;
  recipient: string;
  description?: string;
}

export interface Certification {
  name: string;
  organization: string;
  holder: string;
  year?: number;
  description?: string;
}