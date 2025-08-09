import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { usePreviousEventsData } from '@/hooks/usePreviousEventsData';

export function PreviousEvents() {
  const { previousEventsData, loading, error } = usePreviousEventsData();

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (error || !previousEventsData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center text-red-600">Error loading previous events data</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>{previousEventsData.seo.title}</title>
        <meta name="description" content={previousEventsData.seo.description} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-black">
          {previousEventsData.title}
        </h1>
        
        <p className="mb-8 text-gray-700">
          {previousEventsData.description}
        </p>

        {previousEventsData.events.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No previous events are currently available.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {previousEventsData.events.map((event) => (
              <div key={event.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Event Image */}
                  {event.image && (
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={event.image.src}
                          alt={event.image.alt}
                          width={event.image.width}
                          height={event.image.height}
                          className="border-2 border-gray-400 rounded"
                          style={{ 
                            width: event.image.width ? `${event.image.width}px` : 'auto',
                            height: event.image.height ? `${event.image.height}px` : 'auto'
                          }}
                        />
                        {event.status === 'unavailable' && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">Currently Unavailable</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Event Details */}
                  <div className="flex-1">
                    <div className="mb-2">
                      <h2 className="text-xl font-semibold text-black mb-1">
                        {event.title}
                      </h2>
                      <p className="text-sm text-gray-600 font-medium">
                        {event.date}
                      </p>
                    </div>

                    <p className="text-gray-700 mb-4">
                      {event.description}
                    </p>

                    {/* Event Status and Link */}
                    {event.status === 'unavailable' ? (
                      <div className="text-red-600 text-sm">
                        <p>⚠️ Event content is currently unavailable</p>
                        {event.link && (
                          <p className="text-gray-500">
                            Originally linked to: {event.link.href}
                          </p>
                        )}
                      </div>
                    ) : event.link ? (
                      <a
                        href={event.link.href}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 underline"
                        target={event.link.external ? '_blank' : '_self'}
                        rel={event.link.external ? 'noopener noreferrer' : undefined}
                      >
                        {event.link.label}
                        {event.link.external && (
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        )}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Future Events Notice */}
        <div className="mt-12 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <p className="text-blue-800">
            <strong>Note:</strong> This archive represents past club activities. 
            For current and upcoming events, please check our regular meeting schedule 
            and announcements.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}