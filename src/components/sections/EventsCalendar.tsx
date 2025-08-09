import { useEventsData } from '@/hooks/useEventsData';

export function EventsCalendar() {
  const { eventsData } = useEventsData();

  if (!eventsData) return null;

  return (
    <section className="mb-8">
      <h1 className="text-center text-2xl font-bold mb-6">
        <span className="text-black">Event Calendar</span>
      </h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-400 border-collapse" style={{ width: '90%', margin: '0 auto' }}>
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-400 p-2 w-1/4 text-center font-bold">
                Date
              </th>
              <th className="border border-gray-400 p-2 w-1/4 text-center font-bold">
                Time
              </th>
              <th className="border border-gray-400 p-2 w-1/2 text-center font-bold">
                Event
              </th>
            </tr>
          </thead>
          <tbody>
            {eventsData.events.map((event, index) => (
              <tr key={index}>
                <td className="border border-gray-400 p-2 text-center align-middle">
                  {event.date.includes('Aug 20, 2024') ? (
                    <s>{event.date}</s>
                  ) : (
                    <div className="whitespace-pre-line">{event.date}</div>
                  )}
                </td>
                <td className="border border-gray-400 p-2 text-center align-middle">
                  <div className="whitespace-pre-line">{event.time}</div>
                </td>
                <td className="border border-gray-400 p-2 text-center align-middle">
                  {event.date.includes('Aug 20, 2024') ? (
                    <p className="italic">{event.title}</p>
                  ) : (
                    <div className="whitespace-pre-line">{event.title}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}