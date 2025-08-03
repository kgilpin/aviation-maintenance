import React from 'react';
import { cn } from '@/utils/cn';

interface SimpleAboutHeroProps {
  className?: string;
}

export const SimpleAboutHero: React.FC<SimpleAboutHeroProps> = ({
  className
}) => {
  return (
    <section className={cn(
      'relative py-16 bg-gradient-to-r from-blue-400 to-blue-600 text-white',
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            ABOUT
          </h1>
        </div>
      </div>
    </section>
  );
};

export default SimpleAboutHero;