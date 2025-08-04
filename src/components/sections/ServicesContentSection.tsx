import React from 'react';
import { cn } from '@/utils/cn';
import { ServicesList } from '@/components/ui/ServicesList';
import type { ServicesListSection } from '@/data/types';

interface ServicesContentSectionProps {
  content: ServicesListSection;
  className?: string;
}

export const ServicesContentSection: React.FC<ServicesContentSectionProps> = ({
  content,
  className
}) => {
  return (
    <section className={cn(
      'py-16 bg-white',
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content and Services List */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {content.heading}
              </h2>
              {content.subheading && (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {content.subheading}
                </p>
              )}
              {content.description && (
                <p className="text-gray-600 leading-relaxed">
                  {content.description}
                </p>
              )}
            </div>
            
            <div className="pt-4">
              <ServicesList 
                services={content.services} 
                layout="list"
                showIcons={true}
                iconType="checkmark"
                className="space-y-6"
              />
            </div>
          </div>

          {/* Image */}
          {content.image && (
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-xl">
                <img
                  src={content.image}
                  alt={content.imageAlt || 'Aircraft maintenance services'}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Optional overlay with stats or highlights */}
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">45+</div>
                  <div className="text-sm text-blue-100">Years Experience</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesContentSection;