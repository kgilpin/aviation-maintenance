import React from 'react';
import { cn } from '@/utils/cn';
import { ContactCard } from '@/components/ui/ContactCard';
import type { Contact } from '@/data/types';

interface ContactSectionProps {
  contact: Contact;
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  className
}) => {
  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contact us today to discuss your aircraft maintenance needs. We're here to help keep you flying safely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-6">
            
            {/* Contact Cards */}
            <ContactCard
              type="phone"
              title="Call Us"
              content={contact.phone}
              href={contact.phone}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />
            
            <ContactCard
              type="email"
              title="Email Us"
              content={contact.email}
              href={contact.email}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
            
            <ContactCard
              type="address"
              title="Visit Us"
              content={[
                contact.address.street,
                `${contact.address.gate}, ${contact.address.facility}`,
                `${contact.address.city}, ${contact.address.state} ${contact.address.zipCode}`
              ]}
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${contact.address.street}, ${contact.address.city}, ${contact.address.state}`
              )}`}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
            
            <ContactCard
              type="hours"
              title="Business Hours"
              content={[
                `Monday - Saturday: ${contact.hours.monday}`,
                `Sunday: ${contact.hours.sunday}`
              ]}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>

          {/* Google Maps */}
          <div>
            <div className="h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={contact.googleMaps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yankee Aviation Location - Plymouth Municipal Airport"
                className="w-full h-full"
              />
            </div>
            
            {/* Map Caption */}
            <p className="text-sm text-gray-600 mt-4 text-center">
              Located at Plymouth Municipal Airport - Gate 3, just off Route 3 in historic Plymouth, MA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};