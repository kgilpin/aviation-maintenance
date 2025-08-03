import React from 'react';
import { cn } from '@/utils/cn';
import type { Testimonial } from '@/data/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  className
}) => {
  return (
    <div className={cn(
      'bg-white rounded-lg shadow-md p-6 border border-gray-200',
      'hover:shadow-lg transition-shadow duration-200',
      className
    )}>
      {/* Quote */}
      <div className="mb-6">
        <svg className="h-8 w-8 text-primary mb-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
        <blockquote className="text-gray-700 text-lg italic leading-relaxed">
          "{testimonial.quote}"
        </blockquote>
      </div>

      {/* Highlights */}
      {testimonial.highlights && testimonial.highlights.length > 0 && (
        <div className="mb-6">
          <ul className="space-y-2">
            {testimonial.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-600">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Author Information */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">{testimonial.name}</p>
            {testimonial.credentials && (
              <p className="text-sm text-gray-500 mt-1">{testimonial.credentials}</p>
            )}
          </div>
          {testimonial.yearsAsCustomer && (
            <div className="text-right">
              <p className="text-sm font-medium text-primary">
                {testimonial.yearsAsCustomer}+ Years
              </p>
              <p className="text-xs text-gray-500">Customer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};