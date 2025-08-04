# ContactForm Component

## Purpose
Create a lead capture form component that matches the Gravity Forms structure from the crawled contact page, providing name, phone, email, and message fields for customer inquiries.

## Component Location
`src/components/sections/ContactForm.tsx`

## Component Specification

### Props Interface
```typescript
interface ContactFormProps {
  className?: string;
  onSubmit?: (formData: ContactFormData) => void;
}

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}
```

### Form Fields (matching crawled structure)

#### Field Layout
From the crawled HTML, the form has this structure:
1. **Name** (required) - Full width
2. **Phone** (optional) - Left half
3. **Email** (required) - Right half  
4. **Message** (optional) - Full width

#### Field Specifications
```typescript
// Form fields matching crawled implementation
const formFields = {
  name: {
    label: "Name",
    type: "text",
    required: true,
    className: "full-width"
  },
  phone: {
    label: "Phone", 
    type: "tel",
    required: false,
    className: "half-width left"
  },
  email: {
    label: "Email",
    type: "email", 
    required: true,
    className: "half-width right"
  },
  message: {
    label: "Message",
    type: "textarea",
    required: false,
    rows: 10,
    className: "full-width"
  }
}
```

### Visual Design

#### Form Styling
- **Container**: White background with subtle shadow
- **Fields**: Clean, modern input styling consistent with site theme
- **Labels**: Bold labels above each field
- **Required indicators**: Red asterisk (*) for required fields
- **Grid layout**: Responsive 2-column layout for phone/email

#### Button Styling  
- **Submit button**: Blue primary button matching site theme
- **Text**: "Send Message" or "Submit"
- **States**: Normal, hover, active, disabled
- **Loading state**: Spinner during form submission

### Layout Structure
```
<section className="contact-form-section">
  <div className="form-container">
    <div className="form-header">
      <h3>Send Us a Message</h3>
      <p>Get in touch with our team...</p>
    </div>
    
    <form className="contact-form">
      <div className="form-grid">
        <!-- Name field (full width) -->
        <div className="field-group full">
          <label>Name *</label>
          <input type="text" required />
        </div>
        
        <!-- Phone & Email (half width each) -->
        <div className="field-row">
          <div className="field-group half">
            <label>Phone</label>
            <input type="tel" />
          </div>
          <div className="field-group half">
            <label>Email *</label>
            <input type="email" required />
          </div>
        </div>
        
        <!-- Message field (full width) -->
        <div className="field-group full">
          <label>Message</label>
          <textarea rows="10"></textarea>
        </div>
        
        <div className="form-actions">
          <button type="submit">Send Message</button>
        </div>
      </div>
    </form>
  </div>
</section>
```

### Functionality Requirements

#### Form Validation
- **Client-side validation**: Required fields, email format, phone format
- **Real-time validation**: Show errors as user types (debounced)
- **Error messages**: Clear, actionable error text
- **Success state**: Confirmation message after successful submission

#### Form Submission
- **Data handling**: Collect form data into ContactFormData interface
- **Loading state**: Disable form and show loading indicator during submission
- **Error handling**: Display server errors gracefully
- **Success handling**: Show confirmation and clear form

#### Form State Management
```typescript
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
```

### Accessibility Features
- **Form labels**: Proper label association with form controls
- **ARIA attributes**: aria-required, aria-invalid, aria-describedby
- **Error announcements**: Screen reader announcements for validation errors
- **Keyboard navigation**: Tab order and focus management
- **Focus indicators**: Clear focus rings for keyboard users

### Styling Implementation

#### Responsive Design
- **Mobile**: Single column layout, full-width fields
- **Tablet**: Maintain 2-column for phone/email, stack others
- **Desktop**: Full 2-column layout as designed

#### Input Styling
```css
/* Input field styling */
.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-md 
         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
         font-body text-base transition-colors;
}

/* Textarea styling */  
.form-textarea {
  @apply w-full px-4 py-3 border border-gray-300 rounded-md
         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
         font-body text-base resize-y min-h-[120px] transition-colors;
}

/* Label styling */
.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2 font-body;
}
```

### Integration Points

#### With ContactPage
The form will be used alongside the ContactSection component:
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  <!-- Contact Information (existing ContactSection) -->
  <ContactSection contact={contactData} />
  
  <!-- Contact Form (new component) -->
  <ContactForm onSubmit={handleFormSubmit} />
</div>
```

#### Data Submission
Since this is a frontend-only implementation, the form will:
1. Validate data client-side
2. Show success message (simulated)
3. Log form data to console for demonstration
4. Clear form after "successful" submission

**Note**: Actual form submission will require backend integration (not in scope for this phase).

### Dependencies
- React state management (useState)
- Form validation library (optional - can use native HTML5 validation)
- `@/utils/cn` for className utility
- Tailwind CSS for styling

### Testing Considerations
- **Form validation**: Test all validation scenarios
- **Responsive layout**: Test form layout on different screen sizes  
- **Accessibility**: Test with keyboard navigation and screen readers
- **Error states**: Test error handling and display
- **Success flow**: Test successful form submission flow