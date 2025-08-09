import { useClubClothingData } from '@/hooks/useClubClothingData';
import { resolveImagePath } from '@/utils/imageResolver';

export function ClubClothingGallery() {
  const { clubClothingData } = useClubClothingData();

  if (!clubClothingData) return null;

  // Group items in pairs to match the original layout
  const itemPairs = [];
  for (let i = 0; i < clubClothingData.items.length; i += 2) {
    itemPairs.push(clubClothingData.items.slice(i, i + 2));
  }

  return (
    <section className="space-y-8">
      {itemPairs.map((pair, pairIndex) => (
        <div key={pairIndex} className="space-y-4">
          {/* Images */}
          <div className="flex justify-center items-start gap-8">
            {pair.map((item) => (
              <div key={item.id} className="text-center">
                <img
                  src={resolveImagePath(item.image)}
                  alt={item.alt}
                  className="mx-auto"
                  style={{
                    width: `${item.dimensions.width}px`,
                    height: `${item.dimensions.height}px`
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Labels */}
          <div className="flex justify-center items-center gap-8">
            {pair.map((item) => (
              <div 
                key={`${item.id}-label`} 
                className="text-center"
                style={{
                  width: `${item.dimensions.width}px`
                }}
              >
                <p className="text-sm font-medium text-gray-800">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}