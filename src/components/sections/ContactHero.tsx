import React from 'react';
import { cn } from '@/utils/cn';
import contactHeroBg from '@/assets/images/contact-hero-bg.jpg';

interface ContactHeroProps {
  className?: string;
}

export const ContactHero: React.FC<ContactHeroProps> = ({
  className
}) => {
  return (
    <section className={cn(
      'relative py-16 bg-gradient-to-r from-blue-400 to-blue-600 text-white',
      className
    )}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${contactHeroBg})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-blue-600/40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide font-heading text-shadow-lg">
            CONTACT
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;