import { useHomepageData } from '@/hooks/useHomepageData';
import { ExternalLink } from '@/components/ui/ExternalLink';

export function NewsSection() {
  const { homepageData } = useHomepageData();

  if (!homepageData) return null;

  const { news } = homepageData;

  return (
    <section className="mb-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-red-600 text-center text-xl font-bold mb-4">
          {news.title}
        </h2>
        
        <div className="text-left w-full max-w-3xl">
          <ul className="space-y-2">
            {news.articles.map((article, index) => (
              <li key={index}>
                <ExternalLink
                  href={article.url}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  {article.title}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <hr className="border-blue-500 border-2 w-3/4 mx-auto mt-4" />
    </section>
  );
}