/**
 * Image mapping system using ES module imports for production compatibility
 * Maps JSON paths to imported asset URLs that work in both dev and production
 */

// Import all images as ES modules
import WRGLogo2GrnSmall from '@/assets/images/WRGLogo2GrnSmall.gif';
import cmpImage from '@/assets/images/cmp.png';
import newGif from '@/assets/images/new.gif';
import IMG_4468 from '@/assets/images/IMG_4468.jpg';
import IMG_4470 from '@/assets/images/IMG_4470.jpg';
import IMG_4471 from '@/assets/images/IMG_4471.jpg';
import IMG_4472 from '@/assets/images/IMG_4472.jpg';
import IMG_4473 from '@/assets/images/IMG_4473.jpg';
import IMG_4474 from '@/assets/images/IMG_4474.jpg';

/**
 * Image mapping from JSON paths to imported asset URLs
 * This ensures proper asset handling in both development and production builds
 */
const imageMap: Record<string, string> = {
  // Club logo
  '/assets/images/WRGLogo2GrnSmall.gif': WRGLogo2GrnSmall,
  '/images/WRGLogo2GrnSmall.gif': WRGLogo2GrnSmall,
  
  // CMP certificate
  '/assets/images/cmp.png': cmpImage,
  '/images/cmp.png': cmpImage,
  
  // New indicator
  '/assets/images/new.gif': newGif,
  '/images/new.gif': newGif,
  
  // Gallery images
  '/assets/images/IMG_4468.jpg': IMG_4468,
  '/images/IMG_4468.jpg': IMG_4468,
  '/assets/images/IMG_4470.jpg': IMG_4470,
  '/images/IMG_4470.jpg': IMG_4470,
  '/assets/images/IMG_4471.jpg': IMG_4471,
  '/images/IMG_4471.jpg': IMG_4471,
  '/assets/images/IMG_4472.jpg': IMG_4472,
  '/images/IMG_4472.jpg': IMG_4472,
  '/assets/images/IMG_4473.jpg': IMG_4473,
  '/images/IMG_4473.jpg': IMG_4473,
  '/assets/images/IMG_4474.jpg': IMG_4474,
  '/images/IMG_4474.jpg': IMG_4474,
};

/**
 * Resolves image paths from JSON data to actual imported asset URLs
 * @param imagePath - Path from JSON data (e.g., "/assets/images/logo.png")
 * @returns Resolved asset URL that works in both dev and production
 */
export function resolveImagePath(imagePath: string): string {
  // First try exact match in image map
  if (imageMap[imagePath]) {
    return imageMap[imagePath];
  }
  
  // Try normalized paths (with and without /assets prefix)
  const normalizedPath = imagePath.startsWith('/assets/') 
    ? imagePath 
    : `/assets${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
  
  if (imageMap[normalizedPath]) {
    return imageMap[normalizedPath];
  }
  
  // Try legacy path format
  const legacyPath = imagePath.replace('/assets', '');
  if (imageMap[legacyPath]) {
    return imageMap[legacyPath];
  }
  
  // Fallback: log warning and return original path
  console.warn(`Image not found in image map: ${imagePath}. Available images:`, Object.keys(imageMap));
  return imagePath;
}

/**
 * Get all available image paths for debugging
 */
export function getAvailableImages(): string[] {
  return Object.keys(imageMap);
}

/**
 * Legacy export for compatibility
 */
export const resolveImageUrl = resolveImagePath;