import { useRodData } from '@/hooks/useRodData';
import { ExternalLink } from '@/components/ui/ExternalLink';

export function RodLeadRegulation() {
  const { rodData } = useRodData();

  if (!rodData) return null;

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold text-red-600 mb-2">
        {rodData.leadRegulation.effectiveDate}
      </h2>
      
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        {rodData.leadRegulation.title}
      </h1>
      
      <div className="text-red-600 mb-6">
        {rodData.leadRegulation.content.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="space-y-2 mb-8">
        {rodData.leadRegulation.links.map((link, index) => (
          <div key={index}>
            <ExternalLink
              href={link.href}
              target="_blank"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {link.label}
            </ExternalLink>
          </div>
        ))}
      </div>
    </div>
  );
}