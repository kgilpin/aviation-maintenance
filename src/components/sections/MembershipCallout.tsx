import { useHomepageData } from '@/hooks/useHomepageData';

export function MembershipCallout() {
  const { homepageData } = useHomepageData();

  if (!homepageData) return null;

  const { membershipCallout } = homepageData;

  return (
    <section className="mb-8">
      <hr className="border-blue-500 border-2 w-3/4 mx-auto mb-4" />
      
      <div className="text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-4">
          {membershipCallout.title}
        </h2>
        
        <p className="mb-2">
          The Wayland Rod & Gun Club is currently welcoming{' '}
          <a href="membership.html" target="view_frame" className="text-blue-600 hover:underline">
            Membership
          </a>{' '}
          applications.
        </p>
        
        <p>
          {membershipCallout.meetingInfo}
        </p>
      </div>
      
      <hr className="border-blue-500 border-2 w-3/4 mx-auto mt-4" />
    </section>
  );
}