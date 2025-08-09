import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { useContactData } from '@/hooks/useContactData';

export function Contact() {
  const { contactData, loading, error } = useContactData();

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (error || !contactData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center text-red-600">Error loading contact data</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>{contactData.seo.title}</title>
        <meta name="description" content={contactData.seo.description} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8 text-black">
          {contactData.title}
        </h1>
        
        <div className="space-y-8">
          {/* Mailing Address */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-black">
              Mailing Address
            </h2>
            <div className="ml-8 text-gray-700">
              <div>{contactData.mailingAddress.name}</div>
              <div>{contactData.mailingAddress.street}</div>
              <div>
                {contactData.mailingAddress.city}, {contactData.mailingAddress.state} {contactData.mailingAddress.zipCode}
              </div>
            </div>
          </section>

          {/* Phone */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-black">
              Answering Machine
            </h2>
            <div className="ml-8 text-gray-700">
              <div className="mb-2">
                <a 
                  href={`tel:${contactData.phone.number}`} 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {contactData.phone.number}
                </a>
              </div>
              <p className="text-sm leading-relaxed">
                {contactData.phone.note}
              </p>
            </div>
          </section>

          {/* Email */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-black">
              E-mail
            </h2>
            <div className="ml-8">
              <ul className="list-disc list-inside space-y-1">
                {contactData.emails.map((email, index) => (
                  <li key={index} className="text-gray-700">
                    <a 
                      href={`mailto:${email.address}`} 
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {email.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}