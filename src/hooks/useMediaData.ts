import { useMemo } from "react";
import type { MediaData, MediaCategory, MediaItem, MediaCollection } from "@/data/types";
import mediaData from "@/data/media.json";

/**
 * Custom hook for type-safe access to media data
 * 
 * @returns MediaData object with all media assets organized by category
 */
export function useMediaData(): MediaData {
  return useMemo(() => mediaData as MediaData, []);
}

/**
 * Hook to get media items from a specific category
 * 
 * @param category - The media category to retrieve
 * @returns MediaCollection for the specified category
 */
export function useMediaCategory(category: MediaCategory): MediaCollection {
  const media = useMediaData();
  return useMemo(() => media.media[category], [media, category]);
}

/**
 * Hook to get a specific media item by category and key
 * 
 * @param category - The media category
 * @param key - The specific media item key
 * @returns MediaItem or undefined if not found
 */
export function useMediaItem(category: MediaCategory, key: string): MediaItem | undefined {
  const categoryData = useMediaCategory(category);
  return useMemo(() => categoryData[key], [categoryData, key]);
}

/**
 * Hook to get all images
 * 
 * @returns All image media items
 */
export function useImages(): MediaCollection {
  return useMediaCategory("images");
}

/**
 * Hook to get all videos
 * 
 * @returns All video media items
 */
export function useVideos(): MediaCollection {
  return useMediaCategory("videos");
}

/**
 * Hook to get all favicons
 * 
 * @returns All favicon media items
 */
export function useFavicons(): MediaCollection {
  return useMediaCategory("favicons");
}

/**
 * Hook to get all audio files
 * 
 * @returns All audio media items
 */
export function useAudio(): MediaCollection {
  return useMediaCategory("audio");
}

/**
 * Hook to get all documents
 * 
 * @returns All document media items
 */
export function useDocuments(): MediaCollection {
  return useMediaCategory("documents");
}

/**
 * Hook to get a specific image by key
 * 
 * @param key - The image key
 * @returns MediaItem or undefined if not found
 */
export function useImage(key: string): MediaItem | undefined {
  return useMediaItem("images", key);
}

/**
 * Hook to get a specific video by key
 * 
 * @param key - The video key
 * @returns MediaItem or undefined if not found
 */
export function useVideo(key: string): MediaItem | undefined {
  return useMediaItem("videos", key);
}