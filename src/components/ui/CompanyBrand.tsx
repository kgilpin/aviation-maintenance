import React from 'react';
import { cn } from '@/utils/cn';
import { useCompanyData } from '@/hooks/useCompanyData';

interface CompanyBrandProps {
  className?: string;
  showLocation?: boolean;
}

export const CompanyBrand: React.FC<CompanyBrandProps> = ({ 
  className, 
  showLocation = true 
}) => {
  const company = useCompanyData();
  
  return (
    <div className={cn('company-brand-header', className)}>
      <h1 className="company-name text-2xl font-bold text-gray-900">
        {company.name}
      </h1>
      {showLocation && (
        <p className="company-location text-sm text-gray-600 mt-1">
          {company.location}
        </p>
      )}
    </div>
  );
};