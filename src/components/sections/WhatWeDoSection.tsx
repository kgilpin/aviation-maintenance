import React from 'react';
import { cn } from '@/utils/cn';
import aircraftImage from '@/assets/images/what-we-do-aircraft.jpg';

interface WhatWeDoSectionProps {
  className?: string;
}

export const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({
  className
}) => {
  const services = [
    "Annual inspection of single-engine and multi-engine aircraft, including experimental aircraft",
    "Engine overhaul",
    "Aircraft ferrying service for out-of-town and out-of-state customers", 
    "Certification of \"experimental\" amateur-built aircrafts"
  ];

  return (
    <section className={cn('py-20 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Aircraft Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                src={aircraftImage}
                alt="Aircraft maintenance services"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              A WIDE RANGE OF<br />
              <span className="text-blue-600">COST-EFFECTIVE</span><br />
              AIRCRAFT MAINTENANCE SERVICES
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Since 1977, we have been providing assistance with aviation maintenance for our clients. 
              Our specialty services include:
            </p>

            {/* Services List */}
            <div className="space-y-6">
              {services.map((service, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed font-medium flex-1">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};