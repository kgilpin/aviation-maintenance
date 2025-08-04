import React from 'react';
import { cn } from '@/utils/cn';
import { useCompanyData } from '@/hooks/useCompanyData';
import logo from '@/assets/images/Transparent-Logo.png';

interface CompanyBrandProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const CompanyBrand: React.FC<CompanyBrandProps> = ({
  size = 'md',
  showText = true,
  className
}) => {
  const companyData = useCompanyData();

  const logoSizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <img
        src={logo}
        alt={companyData.name}
        className={cn('w-auto', logoSizes[size])}
        width={123}
        height={117}
      />
      {showText && (
        <div>
          <h1 className={cn('font-bold text-gray-900', textSizes[size])}>
            {companyData.name}
          </h1>
          <p className="text-sm text-gray-600">
            Since {companyData.establishedYear}
          </p>
        </div>
      )}
    </div>
  );
};