import React from 'react';
import type { Event } from '@/data/types';

interface EventCardProps {
  event: Event;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, className = '' }) => {
  const handleClick = () => {
    if (event.external) {
      window.open(event.url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = event.url;
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <h3 className="text-xl font-semibold mb-2 text-gray-900">
        {event.title}
      </h3>
      <p className="text-gray-600 mb-4">
        {event.description}
      </p>
      {event.date && event.time && (
        <div className="text-sm text-gray-500 mb-2">
          <span className="font-medium">{event.date}</span> at <span className="font-medium">{event.time}</span>
        </div>
      )}
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
          event.type === 'weekly' ? 'bg-blue-100 text-blue-800' :
          event.type === 'ongoing' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </span>
        {event.external && (
          <span className="text-xs text-gray-400">External Link</span>
        )}
      </div>
    </div>
  );
};