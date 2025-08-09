/**
 * Simple image path resolver for assets
 * Converts paths from JSON data to actual asset paths
 */
export function resolveImagePath(imagePath: string): string {
  // If the path starts with /assets/, it's already a proper asset path
  if (imagePath.startsWith('/assets/')) {
    // Convert to src path for Vite asset handling
    return imagePath.replace('/assets/', '/src/assets/');
  }
  
  // For relative paths, assume they're in src/assets/
  if (!imagePath.startsWith('/')) {
    return `/src/assets/${imagePath}`;
  }
  
  return imagePath;
}

/**
 * Legacy export for compatibility
 */
export const resolveImageUrl = resolveImagePath;