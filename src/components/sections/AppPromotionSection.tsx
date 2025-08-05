import React from 'react';
import { useHomepageData } from '@/hooks/useHomepageData';

export const AppPromotionSection: React.FC = () => {
  const { data: homepage } = useHomepageData();

  if (!homepage) return null;

  const { appPromotionSection } = homepage;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/src/assets/images/course-photo-12-652w.jpg"
              alt="Spring Meadows Golf Course"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {appPromotionSection.title}
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <strong>Live Now!</strong>
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              All Mobile access platform featuring On Course Pinpoint GPS, Easy Scoring, 
              Latest News/Events, Real Time Course Notifications & more!
            </p>
            <div className="mt-8">
              <img
                src={appPromotionSection.bannerImage}
                alt="Spring Meadows App Banner"
                className="w-full max-w-md h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};