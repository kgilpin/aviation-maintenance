import React from 'react';
import { cn } from '@/utils/cn';
import type { CompanyHistoryContent } from '@/data/types';

interface CompanyHistorySectionProps {
  history: CompanyHistoryContent;
  className?: string;
}

export const CompanyHistorySection: React.FC<CompanyHistorySectionProps> = ({
  history,
  className
}) => {
  return (
    <section className={cn('py-20 bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              {history.heading}
            </h2>
            
            {/* Description paragraphs */}
            <div className="space-y-6 mb-8">
              {history.description.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Highlights */}
            {history.highlights && history.highlights.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Highlights
                </h3>
                <ul className="space-y-3">
                  {history.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Timeline */}
            {history.timeline && history.timeline.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Company Timeline
                </h3>
                <div className="space-y-4">
                  {history.timeline.map((event, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {event.year}
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-gray-700 font-medium">{event.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Image */}
          {history.image && (
            <div className="order-first lg:order-last">
              <img
                src={history.image}
                alt={history.imageAlt || 'Company history image'}
                className="w-full h-96 lg:h-[600px] object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanyHistorySection;