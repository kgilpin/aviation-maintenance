import React, { useState } from 'react';
import { cn } from '@/utils/cn';

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  className?: string;
  onSubmit?: (formData: ContactFormData) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  className,
  onSubmit
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [formState, setFormState] = useState<{
    isSubmitting: boolean;
    errors: Record<string, string>;
    isSuccess: boolean;
  }>({
    isSubmitting: false,
    errors: {},
    isSuccess: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formState.errors[name]) {
      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, [name]: '' }
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone is optional but validate format if provided
    if (formData.phone.trim() && !/^[\d\s\-\(\)\+\.]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(formData);
      }

      // Show success and reset form
      setFormState(prev => ({ ...prev, isSuccess: true, isSubmitting: false }));
      setFormData({ name: '', phone: '', email: '', message: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSuccess: false }));
      }, 5000);

    } catch (error) {
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: false,
        errors: { submit: 'Failed to send message. Please try again.' }
      }));
    }
  };

  return (
    <section className={cn('', className)}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading">
            Send Us a Message
          </h3>
          <p className="text-gray-600 font-body">
            Get in touch with our team for all your aircraft maintenance needs.
          </p>
        </div>

        {formState.isSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex">
              <svg className="h-5 w-5 text-green-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-green-800">Message Sent!</h4>
                <p className="text-sm text-green-700">Thank you for your message. We'll get back to you soon.</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field - Full Width */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-body">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={cn(
                "w-full px-4 py-3 border rounded-md font-body text-base transition-colors",
                "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                formState.errors.name 
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                  : "border-gray-300"
              )}
              placeholder="Your full name"
              aria-invalid={!!formState.errors.name}
              aria-describedby={formState.errors.name ? "name-error" : undefined}
            />
            {formState.errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                {formState.errors.name}
              </p>
            )}
          </div>

          {/* Phone and Email - Half Width Each */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 font-body">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={cn(
                  "w-full px-4 py-3 border rounded-md font-body text-base transition-colors",
                  "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                  formState.errors.phone 
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                    : "border-gray-300"
                )}
                placeholder="(555) 123-4567"
                aria-invalid={!!formState.errors.phone}
                aria-describedby={formState.errors.phone ? "phone-error" : undefined}
              />
              {formState.errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                  {formState.errors.phone}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-body">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={cn(
                  "w-full px-4 py-3 border rounded-md font-body text-base transition-colors",
                  "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                  formState.errors.email 
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                    : "border-gray-300"
                )}
                placeholder="your@email.com"
                aria-invalid={!!formState.errors.email}
                aria-describedby={formState.errors.email ? "email-error" : undefined}
              />
              {formState.errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                  {formState.errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Message Field - Full Width */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-body">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className={cn(
                "w-full px-4 py-3 border rounded-md font-body text-base transition-colors resize-y",
                "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                "border-gray-300 min-h-[120px]"
              )}
              placeholder="Tell us about your aircraft maintenance needs..."
            />
          </div>

          {/* Submit Button */}
          <div>
            {formState.errors.submit && (
              <p className="mb-4 text-sm text-red-600" role="alert">
                {formState.errors.submit}
              </p>
            )}
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className={cn(
                "w-full px-6 py-3 rounded-md font-medium font-body text-base transition-all",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                formState.isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
              )}
            >
              {formState.isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;