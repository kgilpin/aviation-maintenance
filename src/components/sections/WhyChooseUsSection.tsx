import React from 'react';
import { cn } from '@/utils/cn';
import { CallToActionCard } from '@/components/ui/CallToActionCard';
import type { CallToActionSection } from '@/data/types';

interface WhyChooseUsSectionProps {
  callToAction: CallToActionSection;
  layout?: 'section' | 'banner' | 'card';
  className?: string;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  callToAction,
  layout = 'section',
  className
}) => {
  return (
    <section className={cn(
      'relative',
      className
    )}>
      <CallToActionCard 
        cta={callToAction} 
        layout={layout}
      />
    </section>
  );
};

export default WhyChooseUsSection;