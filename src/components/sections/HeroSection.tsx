import React from 'react';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { useHomepageData } from '@/hooks/useHomepageData';
import { resolveImageUrl } from '@/utils/imageResolver';

export const HeroSection: React.FC = () => {
  const { data: homepage } = useHomepageData();

  if (!homepage) return null;

  const { hero } = homepage;

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VideoPlayer
          src={hero.video.src}
          poster={resolveImageUrl(hero.video.poster, 'hero')}
          autoplay={hero.video.autoplay}
          loop={hero.video.loop}
          muted={hero.video.muted}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
      
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2">
            Welcome to
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
            {hero.title}
          </h1>
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Maine's Premier Public Golf Course
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 text-lg font-semibold rounded-md hover:bg-gray-100 transition-colors">
              Book A Tee Time
            </button>
          </div>
          
          {/* CTA Buttons */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="/upcoming-events"
                className="bg-blue-600 text-white px-6 py-4 rounded-md hover:bg-blue-700 transition-colors font-semibold text-center"
              >
                Upcoming Events
              </a>
              <a 
                href="https://sc.cps.golf/SpringMeadowsWebstore"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-4 rounded-md hover:bg-blue-700 transition-colors font-semibold text-center"
              >
                Gift Cards
              </a>
              <a 
                href="/latest-news"
                className="bg-blue-600 text-white px-6 py-4 rounded-md hover:bg-blue-700 transition-colors font-semibold text-center"
              >
                Latest News
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};