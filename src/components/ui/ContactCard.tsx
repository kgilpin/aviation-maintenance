import React from 'react';
import { cn } from '@/utils/cn';

interface ContactCardProps {
  type: 'phone' | 'email' | 'address' | 'hours';
  title: string;
  content: string | string[];
  icon?: React.ReactNode;
  href?: string;
  className?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  type,
  title,
  content,
  icon,
  href,
  className
}) => {
  const cardContent = (
    <div className={cn(
      'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200',
      'border border-gray-200',
      href && 'cursor-pointer hover:border-primary',
      className
    )}>
      <div className="flex items-start space-x-4">
        {icon && (
          <div className="flex-shrink-0 text-primary">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          {Array.isArray(content) ? (
            <div className="space-y-1">
              {content.map((line, index) => (
                <p key={index} className="text-gray-600">
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">{content}</p>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return type === 'email' ? (
      <a href={`mailto:${href}`} className="block">
        {cardContent}
      </a>
    ) : type === 'phone' ? (
      <a href={`tel:${href.replace(/[^\d+]/g, '')}`} className="block">
        {cardContent}
      </a>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
};