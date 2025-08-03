import React from 'react';
import { Button } from '@/components/ui/Button';
import type { AmenitiesSection as AmenitiesSectionType } from '@/data/types';

interface AmenitiesSectionProps {
  data: AmenitiesSectionType;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ data }) => {
  return (
    <section className="amenities-section py-12 text-white">
      <div className="container max-w-2xl mx-auto text-center px-4">
        <div className="amenities-content">
          <ul className="amenities-list space-y-3 mb-12 text-left max-w-lg mx-auto">
            {data.items.map((item, index) => (
              <li 
                key={index} 
                className="amenities-item text-base leading-relaxed flex items-start"
              >
                <span className="text-white font-bold mr-3 mt-1 flex-shrink-0" aria-hidden="true">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="amenities-cta">
            <Button 
              href={data.cta.url}
              variant="primary"
              size="large"
              className="bg-white text-blue-600 hover:bg-gray-100 border-white hover:border-gray-100"
            >
              {data.cta.text}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};