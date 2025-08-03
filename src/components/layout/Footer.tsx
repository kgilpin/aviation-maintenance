import React from 'react';
import { useContactData } from '@/hooks/useContactData';
import { useCompanyData } from '@/hooks/useCompanyData';

export const Footer: React.FC = () => {
  const contactData = useContactData();
  const companyData = useCompanyData();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${contactData.phone}`} className="hover:text-primary">
                  {contactData.phone}
                </a>
              </p>
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${contactData.email}`} className="hover:text-primary">
                  {contactData.email}
                </a>
              </p>
              <p className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {contactData.address.street}<br />
                  {contactData.address.gate && `${contactData.address.gate}, `}
                  {contactData.address.facility}<br />
                  {contactData.address.city}, {contactData.address.state} {contactData.address.zipCode}
                </span>
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <div className="space-y-1 text-sm">
              <p>Monday - Saturday: {contactData.hours.monday}</p>
              <p>Sunday: {contactData.hours.sunday}</p>
            </div>
          </div>

          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About {companyData.name}</h3>
            <p className="text-sm text-gray-300 mb-4">
              {companyData.businessType} serving the aviation community since {companyData.establishedYear}.
            </p>
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} {companyData.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};