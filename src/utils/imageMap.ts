// Import all images from assets
import fmf116440 from '@/assets/images/fmf_116440.jpg';
import heroAircraft from '@/assets/images/hero-aircraft.jpg';
import heroWorkshop from '@/assets/images/hero-workshop.jpg';
import heroEquipment from '@/assets/images/hero-equipment.jpg';
import aboutImage from '@/assets/images/about.jpg';
import servicesImage from '@/assets/images/services.jpg';
import contactImage from '@/assets/images/Contact_Img.jpg';
import whatWeDoAircraft from '@/assets/images/what-we-do-aircraft.jpg';
import leaderImage from '@/assets/images/20200531_191924_resized-scaled.jpg';
import peterAtDesk from '@/assets/images/20201021_122112_resized-Pete-at-his-desk-10-21-20.jpg';
import spinner from '@/assets/images/spinner.gif';
import logo180 from '@/assets/images/cropped-Transparent-Logo-180x180.png';
import logo192 from '@/assets/images/cropped-Transparent-Logo-192x192.png';
import logo32 from '@/assets/images/cropped-Transparent-Logo-32x32.png';
import cloudBackground from '@/assets/images/cloud-background.jpg';
import contactHeroBg from '@/assets/images/contact-hero-bg.jpg';
import aboutHeroBg from '@/assets/images/about-hero-bg.jpg';
import servicesBg from '@/assets/images/pexels-daniel-torobekov-5262805-scaled.jpg';
import aircraftPhoto from '@/assets/images/Transparent-Logo-aircraft-photo.png';
import servicesCtaBg from '@/assets/images/services-cta-bg.jpg';
import servicesHeroBg from '@/assets/images/services-hero-bg.jpg';
import yankeeAviation from '@/assets/images/yankee-aviation-logo.svg';

// Team member images
import peterConnerImage from '@/assets/images/team/peter-conner.jpg';
import gailConnerImage from '@/assets/images/team/gail-conner.jpg';
import kenHughesImage from '@/assets/images/team/ken-hughes.jpg';
import joeRicciImage from '@/assets/images/team/joe-ricci.jpg';
import hankWiltshireImage from '@/assets/images/team/hank-wiltshire.jpg';

/**
 * Maps JSON image paths to imported asset modules
 * This allows components to resolve /images/ paths to actual imported assets
 */
export const imageMap: Record<string, string> = {
  // Main images
  '/images/fmf_116440.jpg': fmf116440,
  '/images/hero-aircraft.jpg': heroAircraft,
  '/images/hero-workshop.jpg': heroWorkshop,
  '/images/hero-equipment.jpg': heroEquipment,
  '/images/about.jpg': aboutImage,
  '/images/services.jpg': servicesImage,
  '/images/Contact_Img.jpg': contactImage,
  '/images/what-we-do-aircraft.jpg': whatWeDoAircraft,
  '/images/20200531_191924_resized-scaled.jpg': leaderImage,
  '/images/20201021_122112_resized-Pete-at-his-desk-10-21-20.jpg': peterAtDesk,
  '/images/spinner.gif': spinner,
  '/images/cloud-background.jpg': cloudBackground,
  '/images/contact-hero-bg.jpg': contactHeroBg,
  '/images/about-hero-bg.jpg': aboutHeroBg,
  '/images/pexels-daniel-torobekov-5262805-scaled.jpg': servicesBg,
  '/images/services-cta-bg.jpg': servicesCtaBg,
  '/images/services-hero-bg.jpg': servicesHeroBg,
  
  // Logo variations
  '/images/Transparent-Logo.png': logo180,
  '/images/cropped-Transparent-Logo-180x180.png': logo180,
  '/images/cropped-Transparent-Logo-192x192.png': logo192,
  '/images/cropped-Transparent-Logo-32x32.png': logo32,
  '/images/Transparent-Logo-aircraft-photo.png': aircraftPhoto,
  '/images/yankee-aviation-logo.svg': yankeeAviation,
  
  // Team member images
  '/images/team/peter-conner.jpg': peterConnerImage,
  '/images/team/gail-conner.jpg': gailConnerImage,
  '/images/team/ken-hughes.jpg': kenHughesImage,
  '/images/team/joe-ricci.jpg': joeRicciImage,
  '/images/team/hank-wiltshire.jpg': hankWiltshireImage,
};

/**
 * Resolves an image path to the actual imported asset
 * Falls back to the original path if not found in the map
 */
export const resolveImagePath = (imagePath: string): string => {
  return imageMap[imagePath] || imagePath;
};