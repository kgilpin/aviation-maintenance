import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { useContactForm } from "@/hooks/useContactForm";
import { useContactData } from "@/hooks/useContactData";

export const ContactSection: React.FC = () => {
  const { contactData, loading: contactLoading, error: contactError } = useContactData();
  const { formState, updateField, validateField, submitForm } = useContactForm();

  if (contactLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (contactError || !contactData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load contact form. Please try again later.</p>
      </div>
    );
  }

  const { form } = contactData;

  const handleFieldChange =
    (field: keyof typeof formState.values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
      updateField(field, value);
    };

  const handleFieldBlur = (field: keyof typeof formState.values) => () => {
    if (formState.touched[field]) {
      validateField(field);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{form.title || "Contact Us"}</h2>
          {form.description && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{form.description}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 text-blue-600 mt-1">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">123 Aviation Way, Airport City, AC 12345</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 text-blue-600 mt-1">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 text-blue-600 mt-1">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">contact@aviationmaintenance.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  required
                  value={formState.values.firstname}
                  onChange={handleFieldChange("firstname")}
                  onBlur={handleFieldBlur("firstname")}
                  error={formState.touched.firstname ? formState.errors.firstname : undefined}
                  placeholder="John"
                  fullWidth
                />

                <Input
                  label="Last Name"
                  type="text"
                  required
                  value={formState.values.lastname}
                  onChange={handleFieldChange("lastname")}
                  onBlur={handleFieldBlur("lastname")}
                  error={formState.touched.lastname ? formState.errors.lastname : undefined}
                  placeholder="Doe"
                  fullWidth
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                required
                value={formState.values.email}
                onChange={handleFieldChange("email")}
                onBlur={handleFieldBlur("email")}
                error={formState.touched.email ? formState.errors.email : undefined}
                placeholder="john@example.com"
                fullWidth
              />

              <Input
                label="Phone Number"
                type="tel"
                value={formState.values.phone}
                onChange={handleFieldChange("phone")}
                onBlur={handleFieldBlur("phone")}
                error={formState.touched.phone ? formState.errors.phone : undefined}
                placeholder="+1 (555) 123-4567"
                fullWidth
              />

              <Select
                label="Department"
                required
                value={formState.values.department}
                onChange={handleFieldChange("department")}
                onBlur={handleFieldBlur("department")}
                error={formState.touched.department ? formState.errors.department : undefined}
                placeholder="Select a department"
                fullWidth
                options={[
                  { value: "sales", label: "Sales" },
                  { value: "other", label: "Other" },
                ]}
              />

              <Textarea
                label="Message"
                required
                value={formState.values.message}
                onChange={handleFieldChange("message")}
                onBlur={handleFieldBlur("message")}
                error={formState.touched.message ? formState.errors.message : undefined}
                placeholder="Tell us about your aviation maintenance needs..."
                rows={4}
                fullWidth
              />

              <Checkbox
                required
                checked={formState.values.consent}
                onChange={handleFieldChange("consent")}
                onBlur={handleFieldBlur("consent")}
                error={formState.touched.consent ? formState.errors.consent : undefined}
              >
                I agree to the{" "}
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline">
                  privacy policy
                </a>{" "}
                and consent to being contacted about my inquiry.
              </Checkbox>

              {formState.submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{formState.submitError}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={formState.isSubmitting}
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? "Sending Message..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
