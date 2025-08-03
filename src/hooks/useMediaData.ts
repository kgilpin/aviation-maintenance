import { useMemo } from 'react';
import type { MediaData, MediaItem, ExtractedImage } from '@/data/types';
import mediaDataJson from '@/data/media.json';

/**
 * Custom hook for type-safe access to media data
 * Provides centralized access to all media assets and their metadata
 */
export function useMediaData() {
  const mediaData = useMemo(() => mediaDataJson as MediaData, []);

  /**
   * Get a specific media item by key from the main images collection
   */
  const getImage = (key: string): MediaItem | null => {
    return mediaData.media.images[key] || null;
  };

  /**
   * Get all main images
   */
  const getAllImages = (): Record<string, MediaItem> => {
    return mediaData.media.images;
  };

  /**
   * Get extracted images from a specific page
   */
  const getExtractedImages = (page: 'homePageImages' | 'contactPageImages' | 'servicesPageImages' | 'aboutPageImages' | 'favicon'): Record<string, ExtractedImage> => {
    return mediaData.media.extractedImages[page] || {};
  };

  /**
   * Get a specific extracted image by page and key
   */
  const getExtractedImage = (page: 'homePageImages' | 'contactPageImages' | 'servicesPageImages' | 'aboutPageImages' | 'favicon', key: string): ExtractedImage | null => {
    return mediaData.media.extractedImages[page]?.[key] || null;
  };

  /**
   * Get all assets (development and utility files)
   */
  const getAssets = (): Record<string, MediaItem> => {
    return mediaData.media.assets;
  };

  /**
   * Search for media items by usage or description
   */
  const searchMedia = (query: string): (MediaItem | ExtractedImage)[] => {
    const results: (MediaItem | ExtractedImage)[] = [];
    const searchTerm = query.toLowerCase();

    // Search main images
    Object.values(mediaData.media.images).forEach(item => {
      if (
        item.description.toLowerCase().includes(searchTerm) ||
        item.usage.toLowerCase().includes(searchTerm) ||
        item.context.toLowerCase().includes(searchTerm)
      ) {
        results.push(item);
      }
    });

    // Search extracted images
    Object.values(mediaData.media.extractedImages).forEach(category => {
      Object.values(category).forEach(item => {
        if (
          item.description.toLowerCase().includes(searchTerm) ||
          item.usage.toLowerCase().includes(searchTerm) ||
          item.context.toLowerCase().includes(searchTerm)
        ) {
          results.push(item);
        }
      });
    });

    return results;
  };

  /**
   * Get media items used by a specific component
   */
  const getMediaForComponent = (componentName: string): MediaItem[] => {
    return Object.values(mediaData.media.images).filter(item => 
      item.components?.includes(componentName)
    );
  };

  /**
   * Get favicon collection for meta tags
   */
  const getFavicons = (): Record<string, ExtractedImage> => {
    return mediaData.media.extractedImages.favicon;
  };

  /**
   * Get all company logos (main logo + favicon variants)
   */
  const getLogos = (): (MediaItem | ExtractedImage)[] => {
    const logos: (MediaItem | ExtractedImage)[] = [];
    
    // Add main logo
    const mainLogo = getImage('logo');
    if (mainLogo) logos.push(mainLogo);

    // Add favicon variants
    Object.values(getFavicons()).forEach(favicon => {
      logos.push(favicon);
    });

    // Main logo is already in the primary images collection

    return logos;
  };

  return {
    // Raw data access
    mediaData,
    
    // Main images collection
    getImage,
    getAllImages,
    getMediaForComponent,
    
    // Extracted images
    getExtractedImages,
    getExtractedImage,
    
    // Assets
    getAssets,
    
    // Specialized getters
    getFavicons,
    getLogos,
    
    // Search functionality
    searchMedia,
  };
}

export default useMediaData;