import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { useCMPData } from '@/hooks/useCMPData';
import cmpImage from '@/assets/images/cmp.png';

export function CMP() {
  const { cmpData, loading, error } = useCMPData();

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (error || !cmpData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center text-red-600">Error loading CMP data</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>{cmpData.seo.title}</title>
        <meta name="description" content={cmpData.seo.description} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-center text-2xl font-bold font-verdana mb-8 text-black">
          {cmpData.title}
        </h1>
        
        <div className="text-center mb-8">
          <img 
            src={cmpImage} 
            alt={cmpData.certificate.alt}
            className="mx-auto border-4 border-gray-600 max-w-full h-auto"
            style={{ border: '5px solid #555' }}
          />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed">
            {cmpData.description}
          </p>
        </div>
      </div>
    </MainLayout>
  );
}