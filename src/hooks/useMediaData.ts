import { useMemo } from 'react';
import mediaData from '@/data/media.json';
import type { MediaData, MediaItem, MediaCollection } from '@/data/types';

/**
 * Custom hook for accessing media data with type safety
 * Provides methods to retrieve media items by type and key
 */
export const useMediaData = () => {
  const typedMediaData = mediaData as MediaData;

  const getMediaItem = useMemo(() => {
    return (category: keyof MediaData['media'], key: string): MediaItem | null => {
      const categoryData = typedMediaData.media[category];
      if (!categoryData || !categoryData[key]) {
        console.warn(`Media item not found: ${category}.${key}`);
        return null;
      }
      return categoryData[key];
    };
  }, [typedMediaData]);

  const getMediaByCategory = useMemo(() => {
    return (category: keyof MediaData['media']): MediaCollection => {
      return typedMediaData.media[category] || {};
    };
  }, [typedMediaData]);

  const getAllImages = useMemo(() => {
    return () => getMediaByCategory('images');
  }, [getMediaByCategory]);

  const getAllVideos = useMemo(() => {
    return () => getMediaByCategory('videos');
  }, [getMediaByCategory]);

  const getAllAudio = useMemo(() => {
    return () => getMediaByCategory('audio');
  }, [getMediaByCategory]);

  const getAllDocuments = useMemo(() => {
    return () => getMediaByCategory('documents');
  }, [getMediaByCategory]);

  const getAllFavicons = useMemo(() => {
    return () => getMediaByCategory('favicons');
  }, [getMediaByCategory]);

  const getImagePath = useMemo(() => {
    return (key: string): string => {
      const image = getMediaItem('images', key);
      if (!image) {
        console.warn(`Image not found: ${key}`);
        return '';
      }
      return image.path;
    };
  }, [getMediaItem]);

  const getVideoPath = useMemo(() => {
    return (key: string): string => {
      const video = getMediaItem('videos', key);
      if (!video) {
        console.warn(`Video not found: ${key}`);
        return '';
      }
      return video.path;
    };
  }, [getMediaItem]);

  const getAudioPath = useMemo(() => {
    return (key: string): string => {
      const audio = getMediaItem('audio', key);
      if (!audio) {
        console.warn(`Audio not found: ${key}`);
        return '';
      }
      return audio.path;
    };
  }, [getMediaItem]);

  const getDocumentPath = useMemo(() => {
    return (key: string): string => {
      const document = getMediaItem('documents', key);
      if (!document) {
        console.warn(`Document not found: ${key}`);
        return '';
      }
      return document.path;
    };
  }, [getMediaItem]);

  const getFaviconPath = useMemo(() => {
    return (key: string): string => {
      const favicon = getMediaItem('favicons', key);
      if (!favicon) {
        console.warn(`Favicon not found: ${key}`);
        return '';
      }
      return favicon.path;
    };
  }, [getMediaItem]);

  // Helper to get media with description and usage info
  const getMediaWithMetadata = useMemo(() => {
    return (category: keyof MediaData['media'], key: string) => {
      return getMediaItem(category, key);
    };
  }, [getMediaItem]);

  return {
    // Core data access
    mediaData: typedMediaData,
    getMediaItem,
    getMediaByCategory,
    getMediaWithMetadata,

    // Category-specific getters
    getAllImages,
    getAllVideos,
    getAllAudio,
    getAllDocuments,
    getAllFavicons,

    // Path getters for easy access
    getImagePath,
    getVideoPath,
    getAudioPath,
    getDocumentPath,
    getFaviconPath,
  };
};