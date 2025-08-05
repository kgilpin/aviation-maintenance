import type { AircraftModel } from '@/data/types';
import { resolveImagePath } from '@/utils/imageMap';
import { Aircraft360Viewer } from './Aircraft360Viewer';

interface AircraftViewerProps {
  model: AircraftModel;
  className?: string;
}

export function AircraftViewer({ 
  model, 
  className = ''
}: AircraftViewerProps): JSX.Element {
  const hasViewer360 = model.images.viewer360.length > 0;
  const fallbackImageSrc = resolveImagePath('/images/INTEGRAL-R-HANGAR-DARK_Website.png');

  if (hasViewer360) {
    return (
      <Aircraft360Viewer
        images={model.images.viewer360}
        alt={`${model.name} 360° view`}
        className={`aspect-video ${className}`}
      />
    );
  }

  // Fallback to static image if no 360° images available
  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden aspect-video ${className}`}>
      <img
        src={fallbackImageSrc}
        alt={`${model.name} aircraft`}
        className="w-full h-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
          <p className="text-sm">360° view coming soon</p>
        </div>
      </div>
    </div>
  );
}