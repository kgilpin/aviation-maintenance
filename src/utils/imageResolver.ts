import type { ImageConfig } from '@/data/types';
import imageConfig from '@/data/imageConfig.json';

/**
 * Resolves image URLs based on the configured provider and mappings
 */
export function resolveImageUrl(imagePath: string, variant?: string): string {
  const config = imageConfig as ImageConfig;
  const activeProvider = config.providers[config.provider];
  
  if (!activeProvider.enabled) {
    // Fallback to local if active provider is disabled
    return config.providers.local.baseUrl + imagePath.replace(/^\/src\/assets\/images\//, '');
  }
  
  // Check if we have a specific mapping for this image
  const mapping = config.mappings[imagePath];
  if (mapping && config.provider === 'cloudflare') {
    const variantPath = variant 
      ? config.providers.cloudflare.variants[variant] || ''
      : config.providers.cloudflare.variants[mapping.variant] || '';
    
    return `${activeProvider.baseUrl}${mapping.cloudflareId}${variantPath}`;
  }
  
  // Default behavior - use local paths
  if (config.provider === 'local') {
    return imagePath;
  }
  
  // For cloudflare without mapping, generate a default ID from filename
  if (config.provider === 'cloudflare') {
    const filename = imagePath.split('/').pop()?.split('.')[0] || 'unknown';
    const variantPath = variant 
      ? config.providers.cloudflare.variants[variant] || ''
      : config.providers.cloudflare.variants.medium || '';
    
    return `${activeProvider.baseUrl}${filename}${variantPath}`;
  }
  
  return imagePath;
}

/**
 * Get alt text for an image from the configuration
 */
export function getImageAlt(imagePath: string): string {
  const config = imageConfig as ImageConfig;
  const mapping = config.mappings[imagePath];
  return mapping?.alt || '';
}

/**
 * Get all available variants for the current provider
 */
export function getAvailableVariants(): string[] {
  const config = imageConfig as ImageConfig;
  
  if (config.provider === 'cloudflare') {
    return Object.keys(config.providers.cloudflare.variants);
  }
  
  return [];
}

/**
 * Switch the active image provider (development only)
 */
export function switchProvider(provider: 'local' | 'cloudflare'): void {
  console.warn('switchProvider should only be used in development. Update imageConfig.json directly for production.');
  const mutableConfig = imageConfig as { provider: string };
  mutableConfig.provider = provider;
}