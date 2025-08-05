import { useState } from 'react';
import type { FeatureCard as FeatureCardType } from '@/data/types';
import { resolveImagePath } from '@/utils/imageMap';

interface FeatureCardProps {
  feature: FeatureCardType;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function FeatureCard({ feature, isExpanded, onToggle }: FeatureCardProps): JSX.Element {
  const [isInternalExpanded, setIsInternalExpanded] = useState(false);
  
  // Use external control if provided, otherwise use internal state
  const expanded = isExpanded !== undefined ? isExpanded : isInternalExpanded;
  const handleToggle = onToggle || (() => setIsInternalExpanded(!isInternalExpanded));

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-all duration-300">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 flex items-center justify-center">
          <img
            src={resolveImagePath(feature.icon)}
            alt={`${feature.title} icon`}
            className="w-12 h-12 text-white"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjNEY0RjRGIi8+CjxwYXRoIGQ9Ik0yNCAxNkMyMC42ODYgMTYgMTggMTguNjg2IDE4IDIyQzE4IDI1LjMxNCAyMC42ODYgMjggMjQgMjhDMjcuMzE0IDI4IDMwIDI1LjMxNCAzMCAyMkMzMCAxOC42ODYgMjcuMzE0IDE2IDI0IDE2WiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K';
            }}
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-center mb-3 text-white">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 text-center mb-4 text-sm">
        {feature.description}
      </p>

      {/* Expandable Details */}
      {feature.details && feature.details.length > 0 && (
        <>
          <button
            onClick={handleToggle}
            className="w-full text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 mb-2"
            aria-expanded={expanded}
            aria-controls={`feature-details-${feature.id}`}
          >
            {expanded ? 'Show Less' : 'Learn More'}
            <svg
              className={`w-4 h-4 ml-1 inline-block transition-transform duration-200 ${
                expanded ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            id={`feature-details-${feature.id}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="text-sm text-gray-400 space-y-1">
              {feature.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-400 mr-2 mt-1">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}