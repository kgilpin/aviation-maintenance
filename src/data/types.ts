// TypeScript interfaces for media data structures

export interface MediaItem {
  path: string;
  description: string;
  usage: string;
  type: "image" | "video" | "audio" | "document";
  format?: string;
  size?: string;
  source?: string;
}

export interface MediaCollection {
  [key: string]: MediaItem;
}

export interface MediaData {
  media: {
    images: MediaCollection;
    videos: MediaCollection;
    favicons: MediaCollection;
    audio: MediaCollection;
    documents: MediaCollection;
  };
}

// Media category types for type-safe access
export type MediaCategory = "images" | "videos" | "favicons" | "audio" | "documents";

// Utility types for specific media categories
export type ImageMedia = MediaCollection;
export type VideoMedia = MediaCollection;
export type FaviconMedia = MediaCollection;
export type AudioMedia = MediaCollection;
export type DocumentMedia = MediaCollection;

// Company and business information
export interface CompanyData {
  name: string;
  tagline: string;
  description: string;
  location: {
    city: string;
    state: string;
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  phone: string;
  social: {
    facebook: string;
  };
  hours: {
    title: string;
    schedule: Array<{
      day: string;
      hours: string;
    }>;
  };
  seo: {
    title: string;
    description: string;
  };
}

// Navigation structure
export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}

export interface NavigationData {
  mainNavigation: NavigationItem[];
}

// Events and calendar
export interface Event {
  id: string;
  title: string;
  description: string;
  date?: string;
  time?: string;
  type: "weekly" | "ongoing" | "special";
  url: string;
  external?: boolean;
}

export interface EventsData {
  upcomingEvents: Event[];
  featuredEvents: Event[];
}

// Homepage content
export interface HomepageData {
  hero: {
    title: string;
    video: {
      src: string;
      poster: string;
      autoplay: boolean;
      loop: boolean;
      muted: boolean;
    };
  };
  whyPlaySection: {
    title: string;
    description: string;
  };
  premierCourseSection: {
    title: string;
    image: string;
    description: string;
  };
  appPromotionSection: {
    title: string;
    bannerImage: string;
    description: string;
  };
  bookingSection: {
    title: string;
    buttonText: string;
    url: string;
  };
}

// Testimonials
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
}

export interface TestimonialsData {
  testimonials: Testimonial[];
}

// Image configuration for URL rewriting
export interface ImageMapping {
  cloudflareId: string;
  variant: string;
  alt: string;
}

export interface ImageProvider {
  baseUrl: string;
  enabled: boolean;
  variants?: Record<string, string>;
}

export interface ImageConfig {
  provider: 'local' | 'cloudflare';
  providers: {
    local: ImageProvider;
    cloudflare: ImageProvider & {
      variants: Record<string, string>;
    };
  };
  mappings: Record<string, ImageMapping>;
}

// Club information
export interface ClubData {
  name: string;
  address: string;
  phone: string;
  logo: string;
}

// Navigation items with specific features for the gun club site
export interface WaylandNavigationItem {
  label: string;
  href: string;
  target?: string;
  external?: boolean;
  newIndicator?: boolean;
}

export interface WaylandNavigationData {
  mainNavigation: WaylandNavigationItem[];
}

// Homepage content specific to Wayland Rod & Gun Club
export interface WaylandHomepageData {
  hero: {
    title: string;
    description: string;
    mission: string;
  };
  membershipCallout: {
    title: string;
    description: string;
    meetingInfo: string;
  };
  clubClothing: {
    title: string;
    description: string;
  };
  news: {
    title: string;
    articles: Array<{
      title: string;
      url: string;
    }>;
  };
}

// Events calendar
export interface WaylandEvent {
  date: string;
  time: string;
  title: string;
}

export interface WaylandEventsData {
  events: WaylandEvent[];
}