# Step 14: Create Contact Section Component

## Objective
Create the main contact form section component that brings together all the UI components and form logic.

## Actions Required

### 14.1 Create Contact Section Component
Create `src/components/sections/ContactSection.tsx`:

```typescript
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import { useContactForm } from '@/hooks/useContactForm';
import { useContactData } from '@/hooks/useContactData';
import { useCompanyData } from '@/hooks/useCompanyData';
import { cn } from '@/utils/cn';

const ContactSection: React.FC = () => {
  const { contactData, loading: contactLoading } = useContactData();
  const { company, loading: companyLoading } = useCompanyData();
  const { formState, updateField, validateField, submitForm } = useContactForm();

  const loading = contactLoading || companyLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!contactData || !company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Failed to load contact form</p>
        </div>
      </div>
    );
  }

  const { form, page } = contactData;
  const hasErrors = Object.keys(formState.errors).length > 0;

  return (
    <>
      <Helmet>
        <title>{page.seo.title}</title>
        <meta name="description" content={page.seo.description} />
        <meta name="keywords" content={page.seo.keywords.join(', ')} />
      </Helmet>

      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {form.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {form.description}
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
              aria-label={contactData.accessibility.formAriaLabel}
              noValidate
            >
              {/* Error Summary */}
              {hasErrors && formState.isSubmitted && (
                <div
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"
                  role="alert"
                  aria-live="polite"
                >
                  <h2 className="text-sm font-medium text-red-800 mb-2">
                    {contactData.accessibility.errorSummaryHeading}
                  </h2>
                  <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                    {Object.entries(formState.errors).map(([field, error]) => (
                      <li key={field}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                  name="firstname"
                  type="text"
                  label={form.fields.firstname.label}
                  placeholder={form.fields.firstname.placeholder}
                  value={formState.values.firstname}
                  error={formState.errors.firstname}
                  required={form.fields.firstname.required}
                  maxLength={form.fields.firstname.maxLength}
                  onChange={(value) => updateField('firstname', value)}
                  onBlur={() => validateField('firstname')}
                />

                <Input
                  name="lastname"
                  type="text"
                  label={form.fields.lastname.label}
                  placeholder={form.fields.lastname.placeholder}
                  value={formState.values.lastname}
                  error={formState.errors.lastname}
                  required={form.fields.lastname.required}
                  maxLength={form.fields.lastname.maxLength}
                  onChange={(value) => updateField('lastname', value)}
                  onBlur={() => validateField('lastname')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                  name="email"
                  type="email"
                  label={form.fields.email.label}
                  placeholder={form.fields.email.placeholder}
                  value={formState.values.email}
                  error={formState.errors.email}
                  required={form.fields.email.required}
                  maxLength={form.fields.email.maxLength}
                  onChange={(value) => updateField('email', value)}
                  onBlur={() => validateField('email')}
                />

                <Input
                  name="phone"
                  type="tel"
                  label={form.fields.phone.label}
                  placeholder={form.fields.phone.placeholder}
                  value={formState.values.phone}
                  error={formState.errors.phone}
                  required={form.fields.phone.required}
                  maxLength={form.fields.phone.maxLength}
                  onChange={(value) => updateField('phone', value)}
                  onBlur={() => validateField('phone')}
                />
              </div>

              {/* Department Selection */}
              <div className="mb-6">
                <Select
                  name="department"
                  label={form.fields.department.label}
                  placeholder={form.fields.department.placeholder}
                  value={formState.values.department}
                  error={formState.errors.department}
                  required={form.fields.department.required}
                  options={form.fields.department.options || []}
                  onChange={(value) => updateField('department', value)}
                  onBlur={() => validateField('department')}
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <Textarea
                  name="message"
                  label={form.fields.message.label}
                  placeholder={form.fields.message.placeholder}
                  value={formState.values.message}
                  error={formState.errors.message}
                  required={form.fields.message.required}
                  rows={form.fields.message.rows}
                  maxLength={form.fields.message.maxLength}
                  onChange={(value) => updateField('message', value)}
                  onBlur={() => validateField('message')}
                />
              </div>

              {/* Privacy Consent */}
              <div className="mb-8">
                <Checkbox
                  name="consent"
                  checked={formState.values.consent}
                  error={formState.errors.consent}
                  required={form.fields.consent.required}
                  onChange={(checked) => updateField('consent', checked)}
                  onBlur={() => validateField('consent')}
                >
                  <span className="text-sm text-gray-700">
                    {form.fields.consent.text?.split('privacy policy')[0]}
                    <a
                      href={form.fields.consent.links?.privacyPolicy.href}
                      target={form.fields.consent.links?.privacyPolicy.target}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {form.fields.consent.links?.privacyPolicy.text}
                    </a>
                    {form.fields.consent.text?.split('privacy policy')[1]}
                  </span>
                </Checkbox>
              </div>

              {/* Submit Section */}
              <div className="text-center">
                <div className="mb-4">
                  <p className="text-lg font-medium text-gray-900">
                    {form.submitMessage}
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={formState.isSubmitting}
                  disabled={formState.isSubmitting}
                  className="min-w-[200px]"
                >
                  {formState.isSubmitting ? form.submission.loadingText : form.submission.submitText}
                </Button>

                {formState.submitError && (
                  <p className="mt-4 text-sm text-red-600" role="alert">
                    {form.errorMessage}
                  </p>
                )}
              </div>

              {/* Required Fields Note */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  {contactData.accessibility.requiredFieldsNote}
                </p>
              </div>
            </form>
          </div>

          {/* Additional Contact Information */}
          <div className="mt-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {company.contact.departments.slice(0, 3).map((dept) => (
                <div key={dept.id} className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                  <a
                    href={`mailto:${company.contact.email[dept.id] || company.contact.email.general}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {company.contact.email[dept.id] || company.contact.email.general}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
```

### 14.2 Create Success Message Component
Create `src/components/sections/ContactSuccess.tsx`:

```typescript
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/ui/Button';
import { useContactData } from '@/hooks/useContactData';

const ContactSuccess: React.FC = () => {
  const { contactData } = useContactData();

  if (!contactData) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Thank You - Contact Sent</title>
        <meta name="description" content="Your contact message has been successfully sent to Aura Aero." />
      </Helmet>

      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Thank You!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            {contactData.form.successMessage}
          </p>

          {/* Actions */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button variant="primary" size="lg">
              <Link to="/">Return to Home</Link>
            </Button>
            
            <Button variant="outline" size="lg">
              <Link to="/contact-us">Send Another Message</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSuccess;
```

## Component Features

### ContactSection Component
- **Responsive Layout:** Mobile-first design with grid layouts
- **Form Validation:** Real-time validation with error display
- **Accessibility:** ARIA labels, error announcements, focus management
- **Loading States:** Spinner during data loading and form submission
- **SEO Integration:** Dynamic meta tags via React Helmet
- **Error Handling:** Comprehensive error display and user feedback

### Contact Success Component
- **Success Feedback:** Clear confirmation of form submission
- **Navigation Options:** Links back to home or contact form
- **Visual Design:** Success icon and positive color scheme
- **SEO Friendly:** Proper meta tags for thank you page

## Form Interaction Flow

### 1. Initial Load
- Load contact data and company information
- Display loading spinner while data loads
- Initialize empty form state

### 2. User Input
- Real-time field updates as user types
- Field validation on blur events
- Character counting for text areas
- Required field indicators

### 3. Form Submission
- Full form validation before submission
- Loading state during submission
- Success redirect or error display
- Accessibility announcements

### 4. Error Handling
- Field-level error messages
- Form-level error summary
- Screen reader announcements
- Focus management for errors

## Styling Strategy

### Layout Design
- **Container:** Centered with max width for readability
- **Cards:** White background with shadow for form prominence
- **Grid System:** Responsive 1-2 column layout for form fields
- **Spacing:** Consistent vertical rhythm throughout

### Visual Hierarchy
- **Headers:** Large, bold text for section titles
- **Form Labels:** Clear, medium-weight text
- **Help Text:** Smaller, muted text for guidance
- **Errors:** Red accent color for immediate attention

### Interactive Elements
- **Focus States:** Blue ring indicators
- **Hover Effects:** Subtle color transitions
- **Loading States:** Spinner animations
- **Success States:** Green accent colors

## Deliverables
- `src/components/sections/ContactSection.tsx` - Main contact form
- `src/components/sections/ContactSuccess.tsx` - Thank you page
- Comprehensive form validation and error handling
- Responsive design implementation
- Accessibility features throughout
- SEO optimization with meta tags

## Next Step
Proceed to Step 15: Create Contact Page Component