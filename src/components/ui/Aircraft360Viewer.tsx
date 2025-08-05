import { useState, useRef, useEffect, useCallback } from 'react';
import { resolveImagePath } from '@/utils/imageMap';

interface Aircraft360ViewerProps {
  images: string[];
  alt?: string;
  className?: string;
}

export function Aircraft360Viewer({ images, alt = 'Aircraft 360° view', className = '' }: Aircraft360ViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  // Preload all images for smooth rotation
  useEffect(() => {
    if (!images.length) return;

    const loadImages = async () => {
      const imagePromises = images.map((imagePath, index) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = resolveImagePath(imagePath);
          img.alt = `${alt} frame ${index + 1}`;
        });
      });

      try {
        const loaded = await Promise.all(imagePromises);
        setLoadedImages(loaded);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load 360° images:', error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [images, alt]);

  // Calculate frame based on drag position
  const calculateFrame = useCallback((deltaX: number) => {
    const sensitivity = 2; // Adjust sensitivity (higher = more sensitive)
    const frameDelta = Math.floor(deltaX / sensitivity);
    const newFrame = (frameRef.current - frameDelta) % images.length;
    return newFrame < 0 ? newFrame + images.length : newFrame;
  }, [images.length]);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    frameRef.current = currentFrame;
    e.preventDefault();
  }, [currentFrame]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart;
    const newFrame = calculateFrame(deltaX);
    setCurrentFrame(newFrame);
  }, [isDragging, dragStart, calculateFrame]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    frameRef.current = currentFrame;
    e.preventDefault();
  }, [currentFrame]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - dragStart;
    const newFrame = calculateFrame(deltaX);
    setCurrentFrame(newFrame);
  }, [isDragging, dragStart, calculateFrame]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse events
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - dragStart;
        const newFrame = calculateFrame(deltaX);
        setCurrentFrame(newFrame);
      };

      const handleGlobalMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, dragStart, calculateFrame]);

  if (isLoading) {
    return (
      <div className={`relative bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-600">Loading 360° view...</p>
        </div>
      </div>
    );
  }

  if (!loadedImages.length) {
    return (
      <div className={`relative bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-600">Unable to load 360° view</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-gray-100 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none' }}
    >
      <img
        src={loadedImages[currentFrame]?.src}
        alt={`${alt} - Frame ${currentFrame + 1}`}
        className="w-full h-full object-contain"
        draggable={false}
      />
      
      {/* Rotation indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Drag to rotate</span>
        </div>
      </div>
      
      {/* Frame indicator */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
        {currentFrame + 1} / {loadedImages.length}
      </div>
    </div>
  );
}