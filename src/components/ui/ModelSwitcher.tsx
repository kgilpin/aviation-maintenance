import type { AircraftModel } from '@/data/types';
import { resolveImagePath } from '@/utils/imageMap';

interface ModelSwitcherProps {
  models: AircraftModel[];
  activeModelId: string;
  onModelChange: (modelId: string) => void;
}

export function ModelSwitcher({ 
  models, 
  activeModelId, 
  onModelChange 
}: ModelSwitcherProps): JSX.Element {
  return (
    <div className="flex justify-center">
      <div className="flex space-x-1 bg-gray-900 rounded-lg p-1 border border-gray-700">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            disabled={model.status === 'development'}
            className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeModelId === model.id
                ? 'bg-blue-600 text-white shadow-lg'
                : model.status === 'development'
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
            aria-pressed={activeModelId === model.id}
            title={model.status === 'development' ? 'Coming soon' : `View ${model.name}`}
          >
            {/* Model Logo */}
            <div className="w-8 h-8 mr-3 flex items-center justify-center">
              <img
                src={resolveImagePath(model.logo)}
                alt={`${model.name} logo`}
                className={`max-w-full max-h-full object-contain ${
                  model.status === 'development' ? 'opacity-50' : ''
                }`}
                onError={(e) => {
                  // Fallback to text if logo fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'text-xs font-bold';
                  fallback.textContent = model.name.split(' ').pop()?.charAt(0) || 'M';
                  target.parentElement!.appendChild(fallback);
                }}
              />
            </div>

            {/* Model Name */}
            <span>{model.name}</span>

            {/* Status Indicator */}
            {model.status === 'certified' && (
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2" 
                   title="Certified" />
            )}
            {model.status === 'in-progress' && (
              <div className="w-2 h-2 bg-yellow-500 rounded-full ml-2" 
                   title="In Progress" />
            )}
            {model.status === 'development' && (
              <div className="w-2 h-2 bg-gray-500 rounded-full ml-2" 
                   title="In Development" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}