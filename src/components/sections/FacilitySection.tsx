import type { FacilityInfo } from '@/data/types';
import { ExternalLink } from '@/components/ui/ExternalLink';

interface FacilitySectionProps {
  facility: FacilityInfo;
}

export function FacilitySection({ facility }: FacilitySectionProps) {
  const processDescriptionWithLinks = (description: string, links: FacilityInfo['links']) => {
    if (!links || links.length === 0) return description;

    let processedDescription = description;
    
    // Replace link text with actual links in the description
    links.forEach(link => {
      const linkRegex = new RegExp(`\\b${link.label}\\b`, 'gi');
      if (link.external) {
        processedDescription = processedDescription.replace(
          linkRegex, 
          `<external-link href="${link.href}" target="${link.target || '_blank'}">${link.label}</external-link>`
        );
      } else {
        processedDescription = processedDescription.replace(
          linkRegex,
          `<internal-link href="${link.href}">${link.label}</internal-link>`
        );
      }
    });

    return processedDescription;
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{facility.title}</h2>
      
      <div className="prose max-w-none">
        {/* Render description with inline links */}
        <div 
          dangerouslySetInnerHTML={{
            __html: processDescriptionWithLinks(facility.description, facility.links)
              .replace(
                /<external-link href="([^"]*)" target="([^"]*)">(.*?)<\/external-link>/g,
                '<a href="$1" target="$2" rel="noopener noreferrer" class="text-blue-600 hover:underline">$3</a>'
              )
              .replace(
                /<internal-link href="([^"]*)">(.*?)<\/internal-link>/g,
                '<a href="$1" class="text-blue-600 hover:underline">$2</a>'
              )
          }}
        />

        {/* Render restrictions if any */}
        {facility.restrictions && facility.restrictions.length > 0 && (
          <div className="mt-4">
            {facility.restrictions.map((restriction, index) => (
              <p key={index} className="mt-2">{restriction}</p>
            ))}
          </div>
        )}

        {/* Render specifications if any */}
        {facility.specifications && facility.specifications.length > 0 && (
          <div className="mt-4">
            <ul className="list-disc pl-6">
              {facility.specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Render standalone links for PDF documents */}
        {facility.links && facility.links.some(link => link.href.endsWith('.pdf')) && (
          <div className="mt-4">
            <p>
              For a list of calibers allowed on the indoor range, click this link:{' '}
              {facility.links
                .filter(link => link.href.endsWith('.pdf'))
                .map((link, index) => (
                  <ExternalLink
                    key={index}
                    href={link.href}
                    target={link.target || '_blank'}
                    className="text-blue-600 hover:underline"
                  >
                    {link.label}
                  </ExternalLink>
                ))}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}