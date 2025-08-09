import { useHomepageData } from '@/hooks/useHomepageData';

export function ClubClothingCallout() {
  const { homepageData } = useHomepageData();

  if (!homepageData) return null;

  const { clubClothing } = homepageData;

  return (
    <section className="mb-8">
      <div className="text-center">
        <p className="text-2xl font-bold mb-2">
          <span className="text-red-500">!! NEW !! </span>
          <span className="text-teal-600">Club Logo Clothing - See Order Form in Left Menu Bar </span>
          <span className="text-red-500">!! NEW !!</span>
        </p>
        
        <p className="text-2xl">
          {clubClothing.description}
        </p>
      </div>
      
      <hr className="border-blue-500 border-2 w-3/4 mx-auto mt-4" />
    </section>
  );
}