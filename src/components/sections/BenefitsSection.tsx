import type { Benefit } from '@/data/types';
import { BenefitCard } from '@/components/ui/BenefitCard';

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export function BenefitsSection({ benefits }: BenefitsSectionProps): JSX.Element {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} benefit={benefit} />
        ))}
      </div>
    </div>
  );
}