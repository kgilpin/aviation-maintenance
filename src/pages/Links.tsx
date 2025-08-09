import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { useLinksData } from '@/hooks/useLinksData';

export function Links() {
  const { linksData, loading, error } = useLinksData();

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (error || !linksData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center text-red-600">Error loading links data</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>{linksData.seo.title}</title>
        <meta name="description" content={linksData.seo.description} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-12">
          {linksData.categories.map((category, categoryIndex) => (
            <section key={categoryIndex}>
              <h1 className="text-2xl font-bold mb-6 text-black">
                {category.title}
              </h1>
              
              <ul className="space-y-4 ml-4">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <div className="flex flex-col">
                      <ExternalLink
                        href={link.href}
                        className="text-blue-600 hover:text-blue-800 underline text-base"
                      >
                        {link.label}
                      </ExternalLink>
                      {link.description && (
                        <p className="mt-2 text-gray-700 text-sm leading-relaxed ml-4">
                          {link.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Add horizontal divider after each category except the last */}
              {categoryIndex < linksData.categories.length - 1 && (
                <hr className="mt-8 border-t-4 border-blue-500 w-1/2" />
              )}
            </section>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}