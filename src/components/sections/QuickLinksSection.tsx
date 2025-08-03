import React from 'react';
import { Link } from 'react-router-dom';
import type { QuickLink } from '@/data/types';

interface QuickLinksSectionProps {
  quickLinks: QuickLink[];
}

export const QuickLinksSection: React.FC<QuickLinksSectionProps> = ({ quickLinks }) => {
  return (
    <section className="w-full" role="navigation" aria-label="Quick navigation links">
      <div className="flex w-full">
        {quickLinks.map((link, index) => (
          <Link
            key={index}
            to={link.link}
            className="flex-1 relative group overflow-hidden bg-gray-900 hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            aria-label={`Navigate to ${link.title} page`}
          >
            {/* Background Image */}
            <div className="relative h-48 md:h-64 lg:h-72">
              <img
                src={link.image}
                alt={link.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-opacity duration-300" />
              
              {/* Link Title */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold tracking-wider uppercase transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                  {link.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickLinksSection;