import React from 'react';

export const LeaderSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              THE LEADER<br />
              <span className="text-blue-600">IN COMPREHENSIVE<br />AVIATION MAINTENANCE</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              For more than 44 years, we have been offering a wide variety of services 
              covering the needs of aircraft maintenance and repair.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Experience and reputation are our greatest assets.
            </p>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative">
            <img
              src="/images/20200531_191924_resized-scaled.jpg"
              alt="Aircraft maintenance work showing professional technicians servicing aircraft engines and components"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderSection;