import type { Benefit } from '@/data/types';
import { resolveImagePath } from '@/utils/imageMap';

interface BenefitCardProps {
  benefit: Benefit;
}

export function BenefitCard({ benefit }: BenefitCardProps): JSX.Element {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
      {/* Icon */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 flex items-center justify-center mr-4">
          <img
            src={resolveImagePath(benefit.icon)}
            alt={`${benefit.title} icon`}
            className="w-8 h-8"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjNEY0RjRGIi8+CjxwYXRoIGQ9Ik0xNiAxMkMxNC4zNDMgMTIgMTMgMTMuMzQzIDEzIDE1QzEzIDE2LjY1NyAxNC4zNDMgMTggMTYgMThDMTcuNjU3IDE4IDE5IDE2LjY1NyAxOSAxNUMxOSAxMy4zNDMgMTcuNjU3IDEyIDE2IDEyWiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K';
            }}
          />
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-white">
          {benefit.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-300 leading-relaxed">
        {benefit.description}
      </p>
    </div>
  );
}