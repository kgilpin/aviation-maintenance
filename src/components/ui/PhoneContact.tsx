import React from 'react';
import { cn } from '@/utils/cn';
import { useContactData } from '@/hooks/useContactData';

interface PhoneContactProps {
  style?: 'contact' | 'navigation' | 'header';
  className?: string;
}

export const PhoneContact: React.FC<PhoneContactProps> = ({ 
  style = 'contact', 
  className 
}) => {
  const contact = useContactData();
  
  const styleClasses = {
    contact: 'text-blue-600 hover:text-blue-800 underline decoration-blue-600/30 hover:decoration-blue-800/50',
    navigation: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors',
    header: 'text-gray-700 hover:text-blue-600 transition-colors'
  };
  
  return (
    <a 
      href={`tel:${contact.phone.tel}`}
      className={cn('phone-contact', styleClasses[style], className)}
      aria-label={`Call ${contact.phone.display}`}
    >
      {contact.phone.display}
    </a>
  );
};