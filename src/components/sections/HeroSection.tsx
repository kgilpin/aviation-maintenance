import React from 'react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import { resolveImagePath } from '@/utils/imageMap';
import type { HeroContent } from '@/data/types';

interface HeroSectionProps {
  hero: HeroContent;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  hero,
  className
}) => {
  return (
    <>
      {/* Full-width Sky Background Hero */}
      <section className={cn(
        'relative bg-blue-400 text-white',
        'h-screen flex items-center justify-center',
        className
      )}>
        {/* Background Sky Image */}
        {hero.backgroundImage && (
          <div className="absolute inset-0">
            <img
              src={resolveImagePath(hero.backgroundImage)}
              alt="Sky background"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Hero Content Overlay */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          {/* Small header text */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 text-shadow-lg tracking-widest uppercase">
            {hero.primaryHeading}
          </h2>
          
          {/* Large main heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 text-shadow-lg leading-none tracking-tight uppercase">
            {hero.secondaryHeading}
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl lg:text-4xl text-white mb-12 text-shadow-md font-light">
            {hero.description}
          </p>
          
          {/* Call to Action Button */}
          {hero.callToAction && (
            <Button
              variant="outline"
              size="lg"
              href={hero.callToAction.link}
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-900 font-medium px-8 py-3 uppercase tracking-widest transition-all duration-300"
            >
              {hero.callToAction.text}
            </Button>
          )}
        </div>
      </section>
    </>
  );
};