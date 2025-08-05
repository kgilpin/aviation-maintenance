import React from 'react';
import { useCompanyData } from '@/hooks/useCompanyData';

export const Footer: React.FC = () => {
  const { data: company } = useCompanyData();

  if (!company) return null;

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{company.name}</h3>
            <p className="text-gray-300 mb-2">{company.location.address}</p>
            <p className="text-gray-300">
              Phone: <a href={`tel:${company.phone}`} className="hover:text-white">{company.phone}</a>
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white flex items-center"
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/rates" className="hover:text-white">Rates</a></li>
              <li><a href="/course-information" className="hover:text-white">Course Information</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="/membership" className="hover:text-white">Membership</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            {company.name} | Designed by{' '}
            <a 
              href="http://clubprophet.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Club Prophet
            </a>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};