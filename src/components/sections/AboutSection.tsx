import React from 'react';
import { cn } from '@/utils/cn';
import type { AboutContent, Company } from '@/data/types';

interface AboutSectionProps {
  about: AboutContent;
  company: Company;
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  about,
  company,
  className
}) => {
  return (
    <section className={cn('py-20 bg-blue-900 text-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          WHO WE ARE
        </h2>

        {/* Description */}
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl leading-relaxed text-blue-100">
            Established in 1977, our company is Plymouth's premier aircraft maintenance facility. We are 
            continuing number 44 years in the business as an experienced team dedicated to our clients 
            and their aircraft.
          </p>
        </div>
      </div>
    </section>
  );
};