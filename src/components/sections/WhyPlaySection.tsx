import React from 'react';
import { useHomepageData } from '@/hooks/useHomepageData';
import { Button } from '@/components/ui/Button';

export const WhyPlaySection: React.FC = () => {
  const { data: homepage } = useHomepageData();

  if (!homepage) return null;

  const { whyPlaySection, bookingSection } = homepage;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {whyPlaySection.title}
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {whyPlaySection.description}
            </p>
          </div>
          <Button
            href={bookingSection.url}
            variant="primary"
            size="lg"
          >
            {bookingSection.buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};