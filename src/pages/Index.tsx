import { MainLayout } from '@/components/layout/MainLayout';
import { HeroSection } from '@/components/sections/HeroSection';
import { MembershipCallout } from '@/components/sections/MembershipCallout';
import { ClubClothingCallout } from '@/components/sections/ClubClothingCallout';
import { NewsSection } from '@/components/sections/NewsSection';
import { EventsCalendar } from '@/components/sections/EventsCalendar';

export function Index() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <HeroSection />
        <MembershipCallout />
        <ClubClothingCallout />
        <NewsSection />
        <EventsCalendar />
      </div>
    </MainLayout>
  );
}