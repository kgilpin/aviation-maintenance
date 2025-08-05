import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { ContactSection } from "@/components/sections/ContactSection";
import { useCompanyData } from "@/hooks/useCompanyData";

export const ContactUsPage: React.FC = () => {
  const { company } = useCompanyData();

  const pageTitle = "Contact Us";
  const pageDescription = "Get in touch with us.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* Structured Data for Contact Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: pageTitle,
            description: pageDescription,
            url: `${company?.seo.siteUrl || ""}/en/contact-us/`,
            mainEntity: {
              "@type": "Organization",
              name: company?.name || "Company name",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-555-123-4567",
                contactType: "customer service",
                availableLanguage: ["English"],
              },
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        {/* Simple header for now */}
        <header className="p-4 border-b border-gray-800">
          <h1 className="text-2xl font-bold">AURA AERO</h1>
        </header>

        {/* Simple contact form */}
        <main className="max-w-2xl mx-auto py-16 px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">CONTACT US</h1>
            <p className="text-gray-300">THE AURA AERO TEAM WILL RESPOND TO YOU</p>
          </div>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Lastname *"
              className="w-full bg-transparent border-b border-white/30 py-2 px-0 text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />
            <input
              type="text"
              placeholder="Firstname *"
              className="w-full bg-transparent border-b border-white/30 py-2 px-0 text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full bg-transparent border-b border-white/30 py-2 px-0 text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />
            <input
              type="email"
              placeholder="Email *"
              className="w-full bg-transparent border-b border-white/30 py-2 px-0 text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />
            <textarea
              placeholder="Your message *"
              rows={4}
              className="w-full bg-transparent border border-white/30 py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />
            
            <div className="flex items-start space-x-2">
              <input type="checkbox" className="mt-1" />
              <label className="text-sm text-gray-300">
                By checking this box, I agree to the collection and use of my data for the purposes stated in the{" "}
                <a href="/en/privacy-policy/" className="underline">privacy policy</a>
              </label>
            </div>

            <div className="text-center">
              <p className="mb-4">Send your message !</p>
              <select className="mb-4 bg-transparent border border-white/30 text-white p-2">
                <option value="Sales">Sales</option>
                <option value="Communication">Communication</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Other requests">Other requests</option>
              </select>
              <div>
                <button
                  type="submit"
                  className="bg-black/50 border border-white/30 text-white px-6 py-2 hover:border-white transition-colors"
                >
                  SEND
                </button>
              </div>
            </div>
          </form>
        </main>

        {/* Address section */}
        <section className="bg-black py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-8">Aura Aero</h2>
            <div className="space-y-4">
              <p>
                <a href="https://www.google.com/maps/search/Aura+a%C3%A9ro,+A%C3%A9roport+de+Toulouse-Francazal+135+avenue+du+Comminges+31270+CUGNAUX,+FRANCE/@43.5565585,1.3306793,11.95z" 
                   target="_blank" className="text-white hover:underline">
                  Aéroport de Toulouse-Francazal<br />
                  135 avenue du Comminges<br />
                  31270 CUGNAUX, FRANCE
                </a>
              </p>
              <p>
                <a href="https://aura-aero.com/wp-content/uploads/2024/02/PLAN-ACCÈS-AURA-AERO-2024-EN.pdf" 
                   target="_blank" className="underline">
                  Download access map
                </a>
              </p>
              <p>
                <a href="tel:+33582991268" className="text-white hover:underline">
                  05 82 99 12 68
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
