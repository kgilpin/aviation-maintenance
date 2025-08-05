import React from 'react';
import { EventCard } from '@/components/ui/EventCard';
import { Button } from '@/components/ui/Button';
import { useEventsData } from '@/hooks/useEventsData';

export const UpcomingEventsSection: React.FC = () => {
  const { data: events } = useEventsData();

  if (!events) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for exciting golf events, leagues, and tournaments at Spring Meadows Golf Course.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {events.upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {events.featuredEvents.length > 0 && (
          <>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Featured Events
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {events.featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}

        <div className="text-center">
          <Button
            href="/upcoming-events"
            variant="primary"
            size="lg"
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};