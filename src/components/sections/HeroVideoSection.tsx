import { useRef, useEffect, useState } from 'react';
import { resolveImagePath } from '@/utils/imageMap';

interface HeroVideoSectionProps {
  video: string;
  videoPoster: string;
  headline: string;
  certification: string;
}

export function HeroVideoSection({ 
  video, 
  videoPoster, 
  headline, 
  certification 
}: HeroVideoSectionProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setHasError(true);
      console.warn('Hero video failed to load, falling back to poster image');
    };

    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      {!hasError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={resolveImagePath(videoPoster)}
          preload="metadata"
        >
          <source src={resolveImagePath(video)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Background Image */}
      {hasError && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${resolveImagePath(videoPoster)})` }}
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              {headline}
            </h1>

            {/* Certification Info */}
            <div className="text-lg md:text-xl lg:text-2xl text-gray-200 font-medium">
              {certification}
            </div>
          </div>
        </div>
      </div>

      {/* Video Loading Indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
            <p className="text-lg">Loading...</p>
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white animate-bounce">
          <p className="text-sm mb-2 opacity-70">Scroll to explore</p>
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
}