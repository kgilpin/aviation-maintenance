import React, { useState, useEffect } from 'react';
import { useTestimonialsData } from '@/hooks/useTestimonialsData';

export const TestimonialSection: React.FC = () => {
  const { data: testimonials } = useTestimonialsData();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!testimonials?.testimonials.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === testimonials.testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials?.testimonials.length) return null;

  const currentTestimonial = testimonials.testimonials[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="relative">
            <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
              "{currentTestimonial.quote}"
            </blockquote>
            <cite className="text-lg italic opacity-90">
              — {currentTestimonial.author}
            </cite>
          </div>
          
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={goToPrevious}
              className="text-white hover:text-blue-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex space-x-2">
              {testimonials.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-white' : 'bg-blue-400 hover:bg-blue-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={goToNext}
              className="text-white hover:text-blue-200 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};