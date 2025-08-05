import type { Testimonial } from '@/data/types';
import { resolveImagePath } from '@/utils/imageMap';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps): JSX.Element {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-gray-600 transition-all duration-300">
      {/* Company Logo */}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-4 overflow-hidden">
          <img
            src={resolveImagePath(testimonial.logo)}
            alt={`${testimonial.company} logo`}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              // Fallback to company initials if logo fails to load
              const target = e.target as HTMLImageElement;
              const initials = testimonial.company
                .split(' ')
                .map(word => word.charAt(0))
                .join('')
                .substring(0, 2)
                .toUpperCase();
              target.style.display = 'none';
              target.parentElement!.innerHTML = `<div class="text-gray-800 font-bold text-lg">${initials}</div>`;
            }}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white">
            {testimonial.company}
          </h3>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-300 text-lg italic leading-relaxed mb-6">
        "{testimonial.quote}"
      </blockquote>

      {/* Author Attribution */}
      <footer className="border-t border-gray-700 pt-4">
        <div className="text-sm">
          <p className="text-white font-semibold">
            {testimonial.author.name}
          </p>
          <p className="text-gray-400">
            {testimonial.author.title}
          </p>
        </div>
      </footer>
    </div>
  );
}