import type { TechnicalSpecification } from '@/data/types';
import { SpecificationsTable } from '@/components/ui/SpecificationsTable';
import { resolveImagePath } from '@/utils/imageMap';

interface SpecificationsSectionProps {
  specifications: TechnicalSpecification[];
  backgroundImage: string;
}

export function SpecificationsSection({ 
  specifications, 
  backgroundImage 
}: SpecificationsSectionProps): JSX.Element {
  return (
    <div className="relative py-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${resolveImagePath(backgroundImage)})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Technical Specifications
          </h2>
          
          <SpecificationsTable specifications={specifications} />
        </div>
      </div>
    </div>
  );
}