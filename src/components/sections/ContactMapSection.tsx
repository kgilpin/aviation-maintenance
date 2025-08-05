import React from 'react';
import { useCompanyData } from '@/hooks/useCompanyData';

export const ContactMapSection: React.FC = () => {
  const { data: company } = useCompanyData();

  if (!company) return null;

  const { location, phone, hours } = company;
  const mapUrl = `https://www.google.com/maps?q=${location.coordinates.latitude},${location.coordinates.longitude}&z=13`;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Visit Us
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-700">{location.address}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                <a
                  href={`tel:${phone}`}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {phone}
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{hours.title}</h3>
                <div className="space-y-1">
                  {hours.schedule.map((item, index) => (
                    <div key={index} className="text-gray-700">
                      <span className="font-medium">{item.day}:</span> {item.hours}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
          
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.234567890123!2d${location.coordinates.longitude}!3d${location.coordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDUzJzU3LjMiTiA3MMKwMTknMzguNyJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Spring Meadows Golf Club Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};