import React from 'react';
import { useHomepageData } from '@/hooks/useHomepageData';

export const PremierCourseSection: React.FC = () => {
  const { data: homepage } = useHomepageData();

  if (!homepage) return null;

  const { premierCourseSection } = homepage;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={premierCourseSection.image}
              alt={premierCourseSection.description}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {premierCourseSection.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Experience the beauty and challenge of Spring Meadows Golf Course, 
              where pristine fairways meet perfectly maintained greens in the 
              heart of Maine's stunning landscape.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};