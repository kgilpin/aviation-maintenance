// Image path resolution utility for asset management
// Maps JSON data paths to imported assets for optimal bundling and performance

// Static image imports for key assets
import logoSvg from '@/assets/images/logo.svg';
import bgDefault from '@/assets/images/bg-default.png';

// Video imports
import integralVideo from '@/assets/videos/INTEGRAL-WEB-1.mp4';

// Background images
import hangarBackground from '@/assets/images/INTEGRAL-R-HANGAR-DARK_Website.png';

// Model logos
import integralRLogo from '@/assets/images/integral/logos/integral-r-logo.png';
import integralSLogo from '@/assets/images/integral/logos/integral-s-logo.png';
import integralELogo from '@/assets/images/integral/logos/integral-e-logo.png';

// Partner logos
import frenchFabLogo from '@/assets/images/partners/french-fab.png';
import bpiFranceLogo from '@/assets/images/partners/logo-bpi-france.jpg';
import franceRelanceLogo from '@/assets/images/partners/logo-france-relance.jpg';
import occitanieLogo from '@/assets/images/partners/logo-occitanie.jpg';
import easaLogo from '@/assets/images/partners/easa.png';
import osacLogo from '@/assets/images/partners/osac.png';
import eraLogo from '@/assets/images/partners/era.png';
import azealLogo from '@/assets/images/partners/AZEA_logo_colour-62.png';
import eicLogoEn from '@/assets/images/partners/EIC-logo-CoFundedBy-CMYK_EN.png';
import eicLogoFr from '@/assets/images/partners/EIC-logo-CoFundedBy-CMYK_FR.png';
import entrepriseEngageeLogo from '@/assets/images/partners/entreprise-engagee.png';
import frenchTechToulouseLogo from '@/assets/images/partners/french-tech-toulouse.png';

// 360° images - all frames for smooth rotation
import integral360_001 from '@/assets/images/integral/360/IntegralRX2_001.png';
import integral360_005 from '@/assets/images/integral/360/IntegralRX2_005.png';
import integral360_010 from '@/assets/images/integral/360/IntegralRX2_010.png';
import integral360_015 from '@/assets/images/integral/360/IntegralRX2_015.png';
import integral360_020 from '@/assets/images/integral/360/IntegralRX2_020.png';
import integral360_025 from '@/assets/images/integral/360/IntegralRX2_025.png';
import integral360_030 from '@/assets/images/integral/360/IntegralRX2_030.png';
import integral360_035 from '@/assets/images/integral/360/IntegralRX2_035.png';
import integral360_040 from '@/assets/images/integral/360/IntegralRX2_040.png';
import integral360_045 from '@/assets/images/integral/360/IntegralRX2_045.png';
import integral360_050 from '@/assets/images/integral/360/IntegralRX2_050.png';
import integral360_055 from '@/assets/images/integral/360/IntegralRX2_055.png';
import integral360_060 from '@/assets/images/integral/360/IntegralRX2_060.png';
import integral360_065 from '@/assets/images/integral/360/IntegralRX2_065.png';
import integral360_070 from '@/assets/images/integral/360/IntegralRX2_070.png';

// INTEGRAL-specific assets
const integralImages = {
  // Hero background (already imported in assets)
  '/images/INTEGRAL-R-HANGAR-DARK_Website.png': hangarBackground,
  
  // Placeholder paths for icons (will need actual assets)
  '/images/icons/seat.svg': '/src/assets/images/icons/seat.svg',
  '/images/icons/weight.svg': '/src/assets/images/icons/weight.svg',
  '/images/icons/shield-check.svg': '/src/assets/images/icons/shield-check.svg',
  '/images/icons/certification.svg': '/src/assets/images/icons/certification.svg',
  '/images/icons/picto-contact.svg': '/src/assets/images/icons/picto-contact.svg',
  '/images/icons/versatility.svg': '/src/assets/images/icons/versatility.svg',
  '/images/icons/performance.svg': '/src/assets/images/icons/performance.svg',
  '/images/icons/ergonomic.svg': '/src/assets/images/icons/ergonomic.svg',
  '/images/icons/materials.svg': '/src/assets/images/icons/materials.svg',
  
  // Model logos
  '/images/integral/logos/integral-r-logo.png': integralRLogo,
  '/images/integral/logos/integral-s-logo.png': integralSLogo,
  '/images/integral/logos/integral-e-1.png': integralELogo,
  
  // Testimonial logos (placeholder paths)
  '/images/testimonials/midi-pyrenees-voltige.jpg': '/src/assets/images/testimonials/midi-pyrenees-voltige.jpg',
  '/images/testimonials/aero-club-chateauroux.jpg': '/src/assets/images/testimonials/aero-club-chateauroux.jpg',
  
  // Hero video poster (placeholder)
  '/images/integral/integral-hero-poster.jpg': '/src/assets/images/integral/integral-hero-poster.jpg',
  
  // Videos
  '/videos/INTEGRAL-WEB-1.mp4': integralVideo,
  
  // 360° images - all frames for smooth rotation
  '/images/integral/360/IntegralRX2_001.png': integral360_001,
  '/images/integral/360/IntegralRX2_005.png': integral360_005,
  '/images/integral/360/IntegralRX2_010.png': integral360_010,
  '/images/integral/360/IntegralRX2_015.png': integral360_015,
  '/images/integral/360/IntegralRX2_020.png': integral360_020,
  '/images/integral/360/IntegralRX2_025.png': integral360_025,
  '/images/integral/360/IntegralRX2_030.png': integral360_030,
  '/images/integral/360/IntegralRX2_035.png': integral360_035,
  '/images/integral/360/IntegralRX2_040.png': integral360_040,
  '/images/integral/360/IntegralRX2_045.png': integral360_045,
  '/images/integral/360/IntegralRX2_050.png': integral360_050,
  '/images/integral/360/IntegralRX2_055.png': integral360_055,
  '/images/integral/360/IntegralRX2_060.png': integral360_060,
  '/images/integral/360/IntegralRX2_065.png': integral360_065,
  '/images/integral/360/IntegralRX2_070.png': integral360_070,
  
  // Partner logos
  '/images/partners/french-fab.png': frenchFabLogo,
  '/images/partners/logo-bpi-france.jpg': bpiFranceLogo,
  '/images/partners/logo-france-relance.jpg': franceRelanceLogo,
  '/images/partners/logo-occitanie.jpg': occitanieLogo,
  '/images/partners/easa.png': easaLogo,
  '/images/partners/osac.png': osacLogo,
  '/images/partners/era.png': eraLogo,
  '/images/partners/AZEA_logo_colour-62.png': azealLogo,
  '/images/partners/EIC-logo-CoFundedBy-CMYK_EN.png': eicLogoEn,
  '/images/partners/EIC-logo-CoFundedBy-CMYK_FR.png': eicLogoFr,
  '/images/partners/entreprise-engagee.png': entrepriseEngageeLogo,
  '/images/partners/french-tech-toulouse.png': frenchTechToulouseLogo
};

// Main image map combining all sources
const imageMap: Record<string, string> = {
  // Core site assets
  '/images/logo.svg': logoSvg,
  '/images/bg-default.png': bgDefault,
  
  // INTEGRAL-specific assets
  ...integralImages
};

/**
 * Resolves a JSON data image path to the actual asset URL
 * This function ensures that images referenced in JSON data files
 * are properly resolved to their imported asset paths
 */
export function resolveImagePath(path: string): string {
  // First check if we have a mapping for this path
  if (imageMap[path]) {
    return imageMap[path];
  }
  
  // If no mapping found, return the path as-is (for external URLs or assets in public folder)
  // This allows for graceful fallback to public folder assets
  return path;
}

/**
 * Gets all available image paths for debugging
 */
export function getAvailableImagePaths(): string[] {
  return Object.keys(imageMap);
}

/**
 * Preloads critical images for better performance
 */
export function preloadCriticalImages(): void {
  const criticalImages = [
    '/images/logo.svg',
    '/images/INTEGRAL-R-HANGAR-DARK_Website.png'
  ];
  
  criticalImages.forEach(path => {
    const resolvedPath = resolveImagePath(path);
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = resolvedPath;
    document.head.appendChild(link);
  });
}