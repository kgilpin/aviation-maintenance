import React from 'react';
import { cn } from '@/utils/cn';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundOverlay?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  backgroundOverlay = 'bg-blue-600/30',
  className,
  titleClassName,
  subtitleClassName
}) => {
  return (
    <section className={cn(
      'relative py-16 bg-gradient-to-r from-blue-400 to-blue-600 text-white',
      className
    )}>
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className={cn('absolute inset-0', backgroundOverlay)} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className={cn(
            'text-4xl md:text-5xl font-bold tracking-wide font-heading',
            titleClassName
          )}>
            {title}
          </h1>
          {subtitle && (
            <p className={cn(
              'text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mt-4',
              subtitleClassName
            )}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;