import React from 'react';
import { cn } from '@/utils/cn';
import type { AboutHeroContent } from '@/data/types';

interface AboutHeroSectionProps {
  hero: AboutHeroContent;
  className?: string;
}

export const AboutHeroSection: React.FC<AboutHeroSectionProps> = ({
  hero,
  className
}) => {
  return (
    <section className={cn(
      'relative py-20 lg:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden',
      className
    )}>
      {/* Background Image with Overlay */}
      {hero.backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={hero.backgroundImage}
            alt="Yankee Aviation facility"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-700/80" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {hero.primaryHeading}
          </h1>
          
          {hero.secondaryHeading && (
            <h2 className="text-xl md:text-2xl font-semibold mb-8 text-blue-100">
              {hero.secondaryHeading}
            </h2>
          )}
          
          <p className="text-lg md:text-xl leading-relaxed text-blue-50 max-w-3xl mx-auto">
            {hero.description}
          </p>

          {hero.callToAction && (
            <div className="mt-10">
              <a
                href={hero.callToAction.link}
                className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-colors duration-300"
              >
                {hero.callToAction.text}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default AboutHeroSection;