import type { TechnicalSpecification } from '@/data/types';

interface SpecificationsTableProps {
  specifications: TechnicalSpecification[];
}

export function SpecificationsTable({ specifications }: SpecificationsTableProps): JSX.Element {
  // Split specifications into two columns for desktop layout
  const midPoint = Math.ceil(specifications.length / 2);
  const leftColumn = specifications.slice(0, midPoint);
  const rightColumn = specifications.slice(midPoint);

  const renderSpecificationCategory = (spec: TechnicalSpecification) => (
    <div key={spec.category} className="mb-8">
      <h3 className="text-xl font-semibold text-blue-400 mb-4 border-b border-gray-600 pb-2">
        {spec.category}
      </h3>
      <div className="space-y-3">
        {spec.items.map((item, index) => (
          <div key={index} className="flex justify-between items-start">
            <span className="text-gray-300 font-medium flex-1 mr-4">
              {item.label}:
            </span>
            <span className="text-white text-right">
              {item.value}
              {item.unit && (
                <span className="text-gray-400 text-sm ml-1">
                  {item.unit}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 bg-opacity-90 rounded-lg p-8 backdrop-blur-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div>
          {leftColumn.map(renderSpecificationCategory)}
        </div>

        {/* Right Column */}
        <div>
          {rightColumn.map(renderSpecificationCategory)}
        </div>
      </div>
    </div>
  );
}