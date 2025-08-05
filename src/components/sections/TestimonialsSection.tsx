import type { Testimonial } from '@/data/types';
import { TestimonialCard } from '@/components/ui/TestimonialCard';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps): JSX.Element {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        Testimonies
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}