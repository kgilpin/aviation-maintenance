import type { FeatureCard as FeatureCardType } from '@/data/types';
import { FeatureCard } from '@/components/ui/FeatureCard';

interface FeaturesSectionProps {
  features: FeatureCardType[];
}

export function FeaturesSection({ features }: FeaturesSectionProps): JSX.Element {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </div>
  );
}