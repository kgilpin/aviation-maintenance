import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { useGunData } from '@/hooks/useGunData';

export function TheGun() {
  const { gunData, loading, error } = useGunData();

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (error || !gunData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center text-red-600">Error loading gun data</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>{gunData.seo.title}</title>
        <meta name="description" content={gunData.seo.description} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto p-6">
        {/* Title and Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4 text-black">
            {gunData.title}
          </h1>
          <h2 className="text-lg text-gray-700 italic mb-4">
            {gunData.subtitle}
          </h2>
          <hr className="w-3/5 mx-auto border-t-2 border-gray-400 mb-8" />
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {gunData.categories.map((category, categoryIndex) => (
            <section key={categoryIndex}>
              <h1 className="text-xl font-bold mb-4 text-black">
                {category.title}
              </h1>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <ExternalLink
                      href={link.href}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {link.label}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
              
              {/* Add horizontal divider after each category except the last */}
              {categoryIndex < gunData.categories.length - 1 && (
                <hr className="mt-8 border-t-4 border-blue-500 w-1/2" />
              )}
            </section>
          ))}

          {/* Member Presentation Section */}
          <section className="border-t-4 border-amber-600 pt-8">
            <div className="text-left mb-4">
              <p className="text-gray-700 mb-4">
                {gunData.memberPresentation.introduction}
              </p>
            </div>

            <div className="space-y-2 mb-6">
              {gunData.memberPresentation.topics.map((topic, index) => (
                <p key={index} className="text-center text-gray-700">
                  {topic}
                </p>
              ))}
            </div>

            <p className="font-bold text-center text-black">
              {gunData.memberPresentation.contact}
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}