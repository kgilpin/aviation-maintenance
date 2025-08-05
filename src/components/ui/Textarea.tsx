import React from 'react';
import { cn } from '@/utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className,
  id,
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn('space-y-1', fullWidth && 'w-full')}>
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      <textarea
        id={textareaId}
        className={cn(
          'block w-full rounded-md border px-3 py-2 text-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'resize-vertical min-h-[80px]',
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
          className
        )}
        {...props}
      />
      
      {(error || helperText) && (
        <p className={cn(
          'text-xs',
          error ? 'text-red-600' : 'text-gray-500'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};