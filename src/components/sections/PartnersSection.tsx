import React from 'react';
import type { PartnersSection as PartnersSectionType } from '@/data/types';

interface PartnersSectionProps {
  data: PartnersSectionType;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ data }) => {
  return (
    <section className="partners-section py-12 bg-white/10">
      <div className="container max-w-2xl mx-auto px-4">
        {data.heading && (
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            {data.heading}
          </h2>
        )}
        
        <div className="partners-grid grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
          {data.logos.map((partner, index) => (
            <div key={index} className="partner-item text-center">
              {partner.url ? (
                <a 
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-opacity duration-300 hover:opacity-100"
                >
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    className="partner-logo max-w-[120px] max-h-[60px] w-auto h-auto mx-auto filter brightness-0 invert opacity-95 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="partner-logo max-w-[120px] max-h-[60px] w-auto h-auto mx-auto filter brightness-0 invert opacity-95"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};