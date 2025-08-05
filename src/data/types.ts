// Media data type definitions

export interface MediaItem {
  path: string;
  description: string;
  usage: string;
  type: 'image' | 'video' | 'audio' | 'document';
  format: string;
  size?: string;
  source: string;
}

export interface MediaCollection {
  [key: string]: MediaItem;
}

export interface MediaData {
  media: {
    images?: MediaCollection;
    videos?: MediaCollection;
    audio?: MediaCollection;
    documents?: MediaCollection;
    favicons?: MediaCollection;
  };
}

// Specific media type interfaces
export interface ImageMediaItem extends MediaItem {
  type: 'image';
  alt?: string;
  width?: number;
  height?: number;
}

export interface VideoMediaItem extends MediaItem {
  type: 'video';
  duration?: number;
  poster?: string;
}

export interface AudioMediaItem extends MediaItem {
  type: 'audio';
  duration?: number;
}

export interface DocumentMediaItem extends MediaItem {
  type: 'document';
  mimeType?: string;
  fileSize?: string;
}