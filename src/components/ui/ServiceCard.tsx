import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  services?: string[];
  href?: string;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  imageAlt,
  services,
  href,
  className
}) => {
  const cardContent = (
    <div className={cn(
      'bg-white rounded-lg shadow-md overflow-hidden',
      'hover:shadow-lg transition-shadow duration-200',
      'border border-gray-200',
      href && 'cursor-pointer hover:border-primary',
      className
    )}>
      {/* Image */}
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Services List */}
        {services && services.length > 0 && (
          <ul className="space-y-2">
            {services.map((service, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-sm text-gray-700">{service}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Call to Action */}
        {href && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <span className="text-primary font-medium hover:text-primary-dark transition-colors">
              Learn More →
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};