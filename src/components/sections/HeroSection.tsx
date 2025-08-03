import React from 'react';
import type { HeroSection as HeroSectionType } from '@/data/types';

interface HeroSectionProps {
  data: HeroSectionType;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  return (
    <section className="hero-section relative h-[60vh] min-h-[350px] max-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="hero-background absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${data.background.image})`,
          filter: data.background.blur ? 'blur(3px)' : 'none'
        }}
        aria-hidden="true"
      />
      
      {/* Overlay */}
      <div 
        className="hero-overlay absolute inset-0 bg-gradient-to-br from-blue-600/40 to-blue-800/30"
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="hero-content relative z-10 text-center text-white max-w-4xl mx-auto px-8">
        <div className="hero-content-inner">
          <h1 className="hero-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {data.heading}
          </h1>
          {data.description && (
            <p className="hero-description text-lg md:text-xl mt-6 opacity-90 drop-shadow-md">
              {data.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};