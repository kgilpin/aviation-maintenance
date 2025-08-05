import React from 'react';
import { cn } from '@/utils/cn';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className,
  id,
  children,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn('space-y-1', fullWidth && 'w-full')}>
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id={checkboxId}
          className={cn(
            'mt-0.5 h-4 w-4 rounded border transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            error 
              ? 'border-red-300 text-red-600 focus:ring-red-500' 
              : 'border-gray-300 text-blue-600 focus:ring-blue-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        
        {(label || children) && (
          <label 
            htmlFor={checkboxId}
            className="flex-1 text-sm text-gray-700 cursor-pointer"
          >
            {label || children}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={cn(
          'text-xs ml-6',
          error ? 'text-red-600' : 'text-gray-500'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};