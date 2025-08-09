import { useRodData } from '@/hooks/useRodData';
import { ExternalLink } from '@/components/ui/ExternalLink';

export function RodFishingShows() {
  const { rodData } = useRodData();

  if (!rodData) return null;

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6">
        {rodData.fishingShows.title}
      </h2>
      
      <ul className="space-y-2">
        {rodData.fishingShows.links.map((link, index) => (
          <li key={index}>
            <ExternalLink
              href={link.href}
              target="_blank"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {link.label}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </div>
  );
}