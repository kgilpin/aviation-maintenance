import { useHomepageData } from '@/hooks/useHomepageData';

export function HeroSection() {
  const { homepageData } = useHomepageData();

  if (!homepageData) return null;

  const { hero } = homepageData;

  return (
    <section className="mb-8">
      <h1 className="text-3xl font-bold text-center mb-6 font-sans" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
        {hero.title}
      </h1>
      
      <div className="prose max-w-none">
        <p className="mb-4">
          {hero.description}
        </p>
        
        <p className="whitespace-pre-line">
          {hero.mission}
        </p>
      </div>
    </section>
  );
}