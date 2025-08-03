import React from 'react';
import type { GallerySection as GallerySectionType } from '@/data/types';

interface GallerySectionProps {
  data: GallerySectionType;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ data }) => {
  return (
    <section className="gallery-section py-16 bg-white/10">
      <div className="container max-w-6xl mx-auto px-4">
        {data.heading && (
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            {data.heading}
          </h2>
        )}
        
        <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {data.images.map((image, index) => (
            <div 
              key={index}
              className="gallery-item aspect-square overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};