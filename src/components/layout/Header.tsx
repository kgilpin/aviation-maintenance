import React from 'react';
import { useCompanyData } from '@/hooks/useCompanyData';

export const Header: React.FC = () => {
  const { data: company } = useCompanyData();

  if (!company) return null;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img
              src="/src/assets/images/Copy_of_SpringMeadowsLogo-240w.png"
              alt={company.name}
              className="h-12 w-auto"
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Questions? Call Us!</span>
            </div>
            <a
              href={`tel:${company.phone}`}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              {company.phone}
            </a>
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
              aria-label="Facebook"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};