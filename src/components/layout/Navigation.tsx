import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import type { NavigationItem } from '@/data/types';

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  mobile?: boolean;
  onItemClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  className,
  mobile = false,
  onItemClick
}) => {
  return (
    <nav className={cn("navigation", className)} role="navigation">
      <ul className={cn(
        mobile ? "flex flex-col space-y-2" : "flex space-x-8"
      )}>
        {items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={onItemClick}
              className={cn(
                "text-gray-700 hover:text-primary transition-colors duration-200",
                "font-medium text-sm uppercase tracking-wide",
                mobile ? "block py-2 px-4 rounded-md hover:bg-gray-50" : "",
                item.isActive && "text-primary border-b-2 border-primary"
              )}
              aria-current={item.isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};