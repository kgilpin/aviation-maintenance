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

// Facilities data
export interface FacilityInfo {
  id: string;
  title: string;
  description: string;
  links?: Array<{
    label: string;
    href: string;
    external?: boolean;
    target?: string;
  }>;
  specifications?: string[];
  restrictions?: string[];
}

export interface FacilitiesData {
  pageTitle: string;
  facilities: FacilityInfo[];
}

// CMP (Civilian Marksmanship Program) page data
export interface CMPData {
  title: string;
  certificate: {
    image: string;
    alt: string;
  };
  description: string;
  seo: {
    title: string;
    description: string;
  };
}

// Club Clothing data
export interface ClothingItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface ClubClothingData {
  title: string;
  description: string[];
  orderFormLink: {
    label: string;
    href: string;
    external: boolean;
  };
  items: ClothingItem[];
}

// Contact page data
export interface ContactEmail {
  label: string;
  address: string;
}

export interface ContactData {
  title: string;
  mailingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: {
    number: string;
    note: string;
  };
  emails: ContactEmail[];
  seo: {
    title: string;
    description: string;
  };
}

// Club History data
export interface HistoryData {
  title: string;
  content: string[];
  footer: {
    source: string;
    contactNote: string;
  };
  externalLink: {
    label: string;
    href: string;
  };
}

// Links page data
export interface LinkItem {
  label: string;
  href: string;
  description?: string;
  external: boolean;
}

export interface LinkCategory {
  title: string;
  links: LinkItem[];
}

export interface LinksData {
  title: string;
  categories: LinkCategory[];
  seo: {
    title: string;
    description: string;
  };
}

// Meetings page data
export interface MeetingRow {
  boardMeeting: string;
  generalMeeting: string;
}

export interface MeetingsData {
  title: string;
  description: {
    boardMeetings: string;
    generalMeetings: string;
  };
  schedule: MeetingRow[];
}

// Membership page data
export interface MembershipType {
  type: string;
  annualFee: string;
  comments: string;
  septOctFee: string;
  novDecFee: string;
}

export interface ApplicationRequirement {
  text: string;
  link?: {
    label: string;
    href: string;
    external: boolean;
  };
}

export interface MembershipData {
  title: string;
  applications: {
    title: string;
    description: string;
    requirements: ApplicationRequirement[];
    afterVoting: string;
  };
  dues: {
    title: string;
    generalInfo: string[];
    importantNote: string;
    seasonalInfo: string[];
    membershipTypes: MembershipType[];
    applicationFee: {
      amount: string;
      description: string;
    };
  };
  seo: {
    title: string;
    description: string;
  };
}

// Location page data
export interface LocationInfo {
  id: string;
  name: string;
  description: string;
  address: string;
  directions: string[];
  amenities: string[];
  hours?: string;
  restrictions?: string[];
  image?: string;
}

export interface LocationData {
  title: string;
  locations: LocationInfo[];
  seo: {
    title: string;
    description: string;
  };
}

// The Bow page data
export interface BowRangeInfo {
  title: string;
  content: string[];
}

export interface BowLink {
  label: string;
  href: string;
  external: boolean;
}

export interface BowData {
  title: string;
  subtitle: string;
  rangeInfo: {
    announcement: string;
    image?: {
      src: string;
      alt: string;
    };
    sections: BowRangeInfo[];
  };
  newEnglandInfo: {
    title: string;
    presentationPrompts: string[];
    links: BowLink[];
  };
  seo: {
    title: string;
    description: string;
  };
}

// The Rod page data
export interface RodLink {
  label: string;
  href: string;
  external: boolean;
}

export interface RodData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  leadRegulation: {
    effectiveDate: string;
    title: string;
    content: string[];
    links: RodLink[];
  };
  fishingShows: {
    title: string;
    links: RodLink[];
  };
  memberPresentation: {
    introduction: string;
    prompts: string[];
    contact: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

// Previous Events page data
export interface PreviousEvent {
  id: string;
  title: string;
  date: string;
  year: number;
  description: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  link?: {
    href: string;
    label: string;
    external: boolean;
  };
  status: 'available' | 'unavailable' | 'archived';
}

export interface PreviousEventsData {
  title: string;
  description: string;
  events: PreviousEvent[];
  seo: {
    title: string;
    description: string;
  };
}

// The Gun page data
export interface GunLink {
  label: string;
  href: string;
  external: boolean;
}

export interface GunLinkCategory {
  title: string;
  links: GunLink[];
}

export interface GunData {
  title: string;
  subtitle: string;
  categories: GunLinkCategory[];
  memberPresentation: {
    title: string;
    introduction: string;
    topics: string[];
    contact: string;
  };
  seo: {
    title: string;
    description: string;
  };
}