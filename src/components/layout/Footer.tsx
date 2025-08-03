import React from 'react';
import { useCompanyData } from '@/hooks/useCompanyData';
import { useContactData } from '@/hooks/useContactData';
import { PhoneContact } from '@/components/ui/PhoneContact';

export const Footer: React.FC = () => {
  const company = useCompanyData();
  const contact = useContactData();

  return (
    <footer className="site-footer bg-gray-800 text-gray-300 py-12 mt-16" role="contentinfo">
      <div className="footer-container max-w-7xl mx-auto px-4">
        <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-700">
          {/* Company Information */}
          <div className="footer-company">
            <h3 className="footer-company-name text-xl font-bold mb-2 text-white">
              {company.name}
            </h3>
            <p className="footer-tagline italic mb-4 opacity-90">
              {company.tagline}
            </p>
            <address className="footer-address not-italic leading-relaxed opacity-80">
              {contact.location.name}<br />
              {contact.location.address}
            </address>
          </div>
          
          {/* Contact Information */}
          <div className="footer-contact">
            <h3 className="footer-heading text-lg font-semibold mb-4 text-white">
              Contact
            </h3>
            <PhoneContact style="contact" className="text-blue-400 hover:text-blue-300" />
          </div>
          
          {/* Services */}
          <div className="footer-services">
            <h3 className="footer-heading text-lg font-semibold mb-4 text-white">
              Services
            </h3>
            <ul className="footer-service-list space-y-1">
              {contact.services_available.map((service, index) => (
                <li key={index} className="opacity-80 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Social Media and Copyright */}
        <div className="footer-bottom flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Media */}
          <div className="social-media-footer">
            {contact.social?.facebook && (
              <a 
                href={contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>
          
          <div className="footer-copyright opacity-70 text-sm">
            <p>&copy; 2024 {company.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};