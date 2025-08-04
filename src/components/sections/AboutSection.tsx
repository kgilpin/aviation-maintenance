import React from 'react';
import { cn } from '@/utils/cn';
import type { AboutContent, Company } from '@/data/types';
import aboutImage from '@/assets/images/about.jpg';

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
  // Use about data if provided, otherwise fall back to company data
  const content = about || {
    heading: "WHO WE ARE",
    description: [company.description],
    highlights: company.specialties,
    image: aboutImage,
    imageAlt: "Yankee Aviation team and facility"
  };

  return (
    <section className={cn('py-20 bg-blue-900 text-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          {content.heading}
        </h2>

        {/* Description */}
        <div className="max-w-4xl mx-auto">
          {content.description.map((paragraph, index) => (
            <p key={index} className="text-xl md:text-2xl leading-relaxed text-blue-100 mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {content.highlights && content.highlights.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {content.highlights.map((highlight, index) => (
              <div key={index} className="bg-blue-800/50 p-4 rounded-lg">
                <p className="text-blue-100">{highlight}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};