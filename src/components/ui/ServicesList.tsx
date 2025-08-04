import React from 'react';
import { cn } from '@/utils/cn';
import type { Service } from '@/data/types';

interface ServicesListProps {
  services: Service[];
  layout?: 'list' | 'grid';
  showIcons?: boolean;
  iconType?: 'checkmark' | 'custom';
  className?: string;
}

export const ServicesList: React.FC<ServicesListProps> = ({
  services,
  layout = 'list',
  showIcons = true,
  iconType = 'checkmark',
  className
}) => {
  const CheckmarkIcon = () => (
    <svg 
      className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" 
      fill="currentColor" 
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path 
        fillRule="evenodd" 
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
        clipRule="evenodd" 
      />
    </svg>
  );

  if (layout === 'grid') {
    return (
      <div className={cn(
        'grid grid-cols-1 md:grid-cols-2 gap-6',
        className
      )}>
        {services.map((service) => (
          <div key={service.id} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            {showIcons && iconType === 'checkmark' && <CheckmarkIcon />}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              {service.description && (
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {services.map((service) => (
        <div key={service.id} className="flex items-start space-x-4">
          {showIcons && iconType === 'checkmark' && <CheckmarkIcon />}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {service.title}
            </h3>
            {service.description && (
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;