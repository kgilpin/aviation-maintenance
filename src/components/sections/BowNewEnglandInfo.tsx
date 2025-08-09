import { useBowData } from '@/hooks/useBowData';
import { ExternalLink } from '@/components/ui/ExternalLink';

export function BowNewEnglandInfo() {
  const { bowData } = useBowData();

  if (!bowData) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{bowData.newEnglandInfo.title}</h2>
      
      <div className="text-center space-y-2 mb-6">
        {bowData.newEnglandInfo.presentationPrompts.map((prompt, index) => (
          <p key={index} className="italic">{prompt}</p>
        ))}
      </div>

      <div className="mt-8">
        <ul className="space-y-2">
          {bowData.newEnglandInfo.links.map((link, index) => (
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
    </div>
  );
}