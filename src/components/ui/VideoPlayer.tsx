import React from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoplay = false,
  loop = false,
  muted = false,
  className = ''
}) => {
  return (
    <video
      src={src}
      poster={poster}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      playsInline
      className={`w-full h-full object-cover ${className}`}
      style={{ objectPosition: '50% 50%' }}
    >
      Your browser does not support the video tag.
    </video>
  );
};