import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { BowHeader } from '@/components/sections/BowHeader';
import { BowRangeInfo } from '@/components/sections/BowRangeInfo';
import { BowNewEnglandInfo } from '@/components/sections/BowNewEnglandInfo';
import { useBowData } from '@/hooks/useBowData';

export function TheBow() {
  const { bowData, loading, error } = useBowData();

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </MainLayout>
    );
  }

  if (!bowData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <p>No bow data available.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>{bowData.seo.title}</title>
        <meta name="description" content={bowData.seo.description} />
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-8">
        <BowHeader />
        <BowRangeInfo />
        <BowNewEnglandInfo />
      </div>
    </MainLayout>
  );
}