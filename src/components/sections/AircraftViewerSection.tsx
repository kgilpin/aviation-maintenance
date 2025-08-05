import { useState } from 'react';
import type { AircraftModel } from '@/data/types';
import { ModelSwitcher } from '@/components/ui/ModelSwitcher';
import { AircraftViewer } from '@/components/ui/AircraftViewer';

interface AircraftViewerSectionProps {
  models: AircraftModel[];
  defaultModelId?: string;
}

export function AircraftViewerSection({ 
  models, 
  defaultModelId 
}: AircraftViewerSectionProps): JSX.Element {
  const [activeModelId, setActiveModelId] = useState<string>(
    defaultModelId || models[0]?.id || ''
  );

  const activeModel = models.find(model => model.id === activeModelId);

  const handleModelChange = (modelId: string) => {
    setActiveModelId(modelId);
  };

  if (!activeModel) {
    return (
      <div className="container mx-auto px-4 text-center py-20">
        <p className="text-gray-400">No aircraft models available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        {/* Model Switcher */}
        <div className="mb-12">
          <ModelSwitcher
            models={models}
            activeModelId={activeModelId}
            onModelChange={handleModelChange}
          />
        </div>

        {/* Aircraft Viewer */}
        <div className="mb-8">
          <AircraftViewer
            model={activeModel}
            className="w-full max-w-4xl mx-auto"
          />
        </div>

        {/* Model Info */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {activeModel.name}
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            {activeModel.description}
          </p>
          
          {/* Certification Status */}
          <div className="inline-flex items-center px-6 py-3 bg-gray-900 rounded-lg border border-gray-700">
            <div className={`w-3 h-3 rounded-full mr-3 ${
              activeModel.status === 'certified' ? 'bg-green-500' : 
              activeModel.status === 'in-progress' ? 'bg-yellow-500' : 
              'bg-gray-500'
            }`} />
            <span className="text-gray-300 text-sm">
              {activeModel.certification.details}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}