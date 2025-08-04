import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface GoogleMapsEmbedProps {
  embedUrl: string;
  width?: string | number;
  height?: string | number;
  title?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const GoogleMapsEmbed: React.FC<GoogleMapsEmbedProps> = ({
  embedUrl,
  width = "100%",
  height = 400,
  title = "Google Maps",
  className,
  loading = 'lazy'
}) => {
  const [hasError, setHasError] = useState(false);

  const handleIframeError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={cn("w-full bg-gray-100 rounded-lg p-6 text-center", className)}>
        <div className="text-gray-600">
          <svg 
            className="mx-auto h-12 w-12 mb-4 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          <h3 className="font-medium text-gray-900 mb-2">Map Unavailable</h3>
          <p className="text-sm mb-4">
            We're located at 246 South Meadow Road, Gate 3<br />
            Plymouth Municipal Airport, Plymouth, MA 02360
          </p>
          <a 
            href="https://goo.gl/maps/77wH5wiK7ibGjvUo8"
            className="inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Maps →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <iframe
        src={embedUrl}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading={loading}
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="w-full rounded-lg shadow-sm"
        onError={handleIframeError}
        aria-label="Interactive map showing Yankee Aviation Services location at Plymouth Municipal Airport"
      />
    </div>
  );
};

export default GoogleMapsEmbed;