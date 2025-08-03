import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { cn } from '@/utils/cn';
import type { TestimonialsSection as TestimonialsSectionType } from '@/data/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TestimonialsSectionProps {
  testimonials: TestimonialsSectionType;
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  className
}) => {
  return (
    <section className={cn('py-20 bg-blue-900 text-white relative overflow-hidden', className)}>
      {/* Background overlay/texture */}
      <div className="absolute inset-0 bg-blue-900/90"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {testimonials.heading}
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          {testimonials.testimonials && testimonials.testimonials.length > 0 && (
            <div className="testimonials-swiper">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation={{
                  nextEl: '.swiper-button-next-custom',
                  prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{
                  el: '.swiper-pagination-custom',
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet-custom',
                  bulletActiveClass: 'swiper-pagination-bullet-active-custom',
                }}
                autoplay={{
                  delay: 8000,
                  disableOnInteraction: false,
                }}
                loop={testimonials.testimonials.length > 1}
                className="testimonials-carousel"
              >
                {testimonials.testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="py-8 max-w-4xl mx-auto">
                      <div className="mb-8">
                        <svg className="h-12 w-12 text-white/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                        <blockquote className="text-lg md:text-xl leading-relaxed text-white mb-8 text-left">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="text-lg text-blue-200 text-right mb-8">
                          <p className="font-semibold">— {testimonial.name}</p>
                          <p className="text-base">{testimonial.credentials || `${testimonial.yearsAsCustomer} years as customer`}</p>
                        </div>
                        
                        {testimonial.highlights && testimonial.highlights.length > 0 && (
                          <div className="mt-8">
                            <h4 className="text-lg font-semibold text-white mb-4">Key Benefits:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-100">
                              {testimonial.highlights.map((highlight, idx) => (
                                <div key={idx} className="flex items-start">
                                  <span className="w-2 h-2 bg-blue-300 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                  <span className="text-left leading-relaxed">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button 
                  className="swiper-button-prev-custom w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Custom Pagination */}
                <div className="swiper-pagination-custom flex space-x-2"></div>

                <button 
                  className="swiper-button-next-custom w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
                  aria-label="Next testimonial"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </section>
  );
};