import { useMeetingsData } from '@/hooks/useMeetingsData';

export function MeetingsSchedule() {
  const { meetingsData } = useMeetingsData();

  if (!meetingsData) return null;

  return (
    <section className="mb-8">
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-400 border-collapse" style={{ width: '90%', margin: '0 auto' }}>
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-400 p-3 w-1/2 text-center font-bold">
                Board Meetings
              </th>
              <th className="border border-gray-400 p-3 w-1/2 text-center font-bold">
                General Meetings
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Description row */}
            <tr>
              <td className="border border-gray-400 p-3 text-center align-middle">
                {meetingsData.description.boardMeetings}
              </td>
              <td className="border border-gray-400 p-3 text-center align-middle">
                {meetingsData.description.generalMeetings}
              </td>
            </tr>
            
            {/* Schedule rows */}
            {meetingsData.schedule.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-400 p-3 text-center align-middle h-12">
                  {row.boardMeeting}
                </td>
                <td className="border border-gray-400 p-3 text-center align-middle h-12">
                  {row.generalMeeting}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}