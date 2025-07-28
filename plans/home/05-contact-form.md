# Contact Form Section Plan

## Overview
Create a contact form section that allows visitors to get in touch with Eagle East Aviation directly from the homepage.

## Form Structure

### Section Heading
- **"Contact form"** - H2 heading above the form

### Form Fields
Based on the original form structure:

1. **Name** (required)
   - Text input field
   - Placeholder: "Name"

2. **Email** (required)
   - Email input field
   - Placeholder: "Email"
   - Email validation

3. **Phone Number** (optional)
   - Tel input field
   - Placeholder: "Phone number"

4. **Message** (required)
   - Textarea field
   - Placeholder: "Message"
   - Multiple rows for longer messages

5. **Submit Button**
   - "Send" button
   - Form submission handling

## Technical Implementation

### Template Structure
- Dedicated contact form section
- Proper form validation
- Error message handling
- Success confirmation

### Form Handling
- Server-side form processing (Eleventy compatible)
- Client-side validation for user experience
- Spam protection considerations
- Email delivery configuration

### Data Requirements
- `src/_data/contact.json` containing:
  - Form field configurations
  - Validation rules
  - Success/error messages
  - Contact email destination

## Styling Requirements
- Narrow page-width container for better form UX
- Consistent field styling and spacing
- Proper focus states for accessibility
- Mobile-friendly form layout
- Professional button styling matching site theme

## Form Processing Options

### Static Site Solutions
1. **Netlify Forms** - If hosting on Netlify
2. **Formspree** - Third-party form service
3. **EmailJS** - Client-side email sending
4. **Contact form service** - External service integration

### Form Fields Validation
- Required field indicators
- Email format validation
- Character limits for message field
- Real-time validation feedback

## Accessibility
- Proper form labels and associations
- Fieldset grouping if applicable
- Error message announcements
- Keyboard navigation support
- Clear focus indicators
- Screen reader friendly validation messages

## Security Considerations
- CSRF protection
- Input sanitization
- Rate limiting for spam prevention
- Honeypot fields for bot detection
- reCAPTCHA integration (optional)

## User Experience
- Clear field labels and placeholders
- Inline validation feedback
- Loading states during submission
- Success/error message display
- Form reset after successful submission