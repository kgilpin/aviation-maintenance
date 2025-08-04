import React from 'react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import type { CallToActionSection } from '@/data/types';

interface CallToActionCardProps {
  cta: CallToActionSection;
  layout?: 'card' | 'section' | 'banner';
  className?: string;
}

export const CallToActionCard: React.FC<CallToActionCardProps> = ({
  cta,
  layout = 'section',
  className
}) => {
  if (layout === 'card') {
    return (
      <div className={cn(
        'bg-white rounded-lg shadow-lg p-8 text-center',
        className
      )}>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {cta.heading}
        </h3>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          {cta.description}
        </p>
        <Button
          href={cta.buttonLink}
          size="lg"
          variant="primary"
          className="inline-flex items-center"
        >
          {cta.buttonText}
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    );
  }

  if (layout === 'banner') {
    return (
      <div className={cn(
        'relative bg-blue-600 text-white overflow-hidden',
        className
      )}>
        {cta.backgroundImage && (
          <div className="absolute inset-0">
            <img
              src={cta.backgroundImage}
              alt={cta.imageAlt || ''}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-blue-600 bg-opacity-80" />
          </div>
        )}
        
        <div className="relative py-12 px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">
            {cta.heading}
          </h3>
          <p className="text-xl mb-6 leading-relaxed max-w-3xl mx-auto">
            {cta.description}
          </p>
          <Button
            href={cta.buttonLink}
            size="lg"
            variant="outline"
            className="!bg-white !text-blue-600 !border-white hover:!bg-blue-50 hover:!text-blue-700 font-semibold"
          >
            {cta.buttonText}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    );
  }

  // Default section layout
  return (
    <div className={cn(
      'relative py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white overflow-hidden',
      className
    )}>
      {cta.backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={cta.backgroundImage}
            alt={cta.imageAlt || ''}
            className="w-full h-full object-cover"
            style={{ objectPosition: '0% 90%' }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,47,81,0.72)' }} />
        </div>
      )}
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {cta.heading}
        </h2>
        <p className="text-xl leading-relaxed mb-8 text-blue-100">
          {cta.description}
        </p>
        <Button
          href={cta.buttonLink}
          size="lg"
          variant="outline"
          className="!bg-white !text-blue-600 !border-white hover:!bg-blue-50 hover:!text-blue-700 font-semibold shadow-lg"
        >
          {cta.buttonText}
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default CallToActionCard;