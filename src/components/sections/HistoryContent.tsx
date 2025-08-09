import { useHistoryData } from '@/hooks/useHistoryData';
import { ExternalLink } from '@/components/ui/ExternalLink';

export function HistoryContent() {
  const { historyData } = useHistoryData();

  if (!historyData) return null;

  return (
    <section className="space-y-6">
      {/* Main content paragraphs */}
      <div className="prose max-w-none space-y-4">
        {historyData.content.map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Footer information */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 italic mb-2">
          {historyData.footer.source}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          {historyData.footer.contactNote}
        </p>

        {/* External link */}
        <div className="mt-6">
          <ExternalLink
            href={historyData.externalLink.href}
            className="text-blue-600 hover:underline"
          >
            {historyData.externalLink.label}
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}