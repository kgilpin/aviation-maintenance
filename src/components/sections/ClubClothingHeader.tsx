import { useClubClothingData } from '@/hooks/useClubClothingData';
import { ExternalLink } from '@/components/ui/ExternalLink';

export function ClubClothingHeader() {
  const { clubClothingData } = useClubClothingData();

  if (!clubClothingData) return null;

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-6">
        {clubClothingData.title}
      </h1>
      
      <div className="space-y-4 mb-6">
        {clubClothingData.description.map((paragraph, index) => (
          <p key={index} className="text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mb-8">
        <ExternalLink
          href={clubClothingData.orderFormLink.href}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {clubClothingData.orderFormLink.label}
        </ExternalLink>
      </div>
    </header>
  );
}