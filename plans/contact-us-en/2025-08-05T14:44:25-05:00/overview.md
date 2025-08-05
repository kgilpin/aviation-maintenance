# Contact Us Page Cloning Plan

**Timestamp:** 2025-08-05T14:44:25-05:00  
**Target Page:** `/en/contact-us/` from Aura Aero website  
**Project Architecture:** React + TypeScript + Vite + Tailwind CSS

## Executive Summary

This plan outlines the step-by-step process to clone the English "Contact Us" page from the crawled Aura Aero website content into our React-based site structure. The page features a contact form with field validation, privacy policy integration, and professional styling.

## Analysis of Crawled Content

### Page Structure Identified
- **Header:** Main navigation with logo and menu items
- **Main Content:** Contact form section with title, description, and form fields
- **Form Elements:** 
  - Personal info fields (firstname, lastname, phone, email)
  - Message textarea
  - Privacy policy consent checkbox  
  - Department selection dropdown
  - Submit button
- **Footer:** (Standard site footer)

### Key Features to Replicate
1. Responsive contact form layout
2. Field validation (required fields marked with *)
3. Privacy policy consent integration
4. Department selection dropdown
5. Professional styling with Aura Aero branding
6. Accessibility features (ARIA labels, semantic HTML)

## Implementation Strategy

### Phase 1: Foundation Architecture
1. Set up proper directory structure following CLAUDE.md guidelines
2. Integrate existing assets from `src/assets/` (logos, favicons, backgrounds)
3. Create TypeScript interfaces for form data and asset management
4. Establish routing for the contact page

### Phase 2: Component Development  
1. **Layout Components** - Header, Footer, Navigation (reusable)
2. **Page Component** - ContactUsPage main component
3. **Form Components** - ContactForm, FormField, SubmitButton
4. **UI Components** - Input, Textarea, Select, Checkbox, Button

### Phase 3: Data Management
1. Create contact page data JSON file
2. Integrate existing media assets (`src/assets/images/`, `src/assets/favicons/`)
3. Implement custom hooks for form state management and asset resolution
4. Add form validation logic
5. Implement form submission handling

### Phase 4: Styling & Polish
1. Apply Tailwind CSS styling to match original design
2. Ensure responsive design across all breakpoints
3. Add proper focus states and accessibility features
4. Implement loading states and error handling

## File Structure Plan

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Main site header (reusable)
│   │   ├── Footer.tsx           # Main site footer (reusable) 
│   │   └── Layout.tsx           # Page layout wrapper (reusable)
│   ├── sections/
│   │   └── ContactSection.tsx   # Main contact form section
│   └── ui/
│       ├── Button.tsx           # Reusable button component
│       ├── Input.tsx            # Form input component
│       ├── Textarea.tsx         # Form textarea component
│       ├── Select.tsx           # Form select component
│       └── Checkbox.tsx         # Form checkbox component
├── data/
│   ├── types.ts                 # TypeScript interfaces
│   ├── company.json             # Company information
│   ├── contact.json             # Contact page specific data
│   └── navigation.json          # Site navigation structure
├── hooks/
│   ├── useContactForm.ts        # Contact form state management
│   ├── useCompanyData.ts        # Company data access
│   └── useContactData.ts        # Contact page data access
├── pages/
│   └── ContactUsPage.tsx        # Main contact page component
└── utils/
    ├── validation.ts            # Form validation utilities
    └── formSubmission.ts        # Form submission logic
```

## Component Reusability Strategy

### Reusable Components to Create
- **Header:** Will be used across all pages
- **Footer:** Will be used across all pages  
- **Layout:** Wrapper component for consistent page structure
- **Button:** Various button styles used throughout site
- **Form Components:** Input, Textarea, Select, Checkbox for forms

### Page-Specific Components
- **ContactSection:** Main contact form layout
- **ContactUsPage:** Page wrapper component

## Content Extraction

### Text Content to Preserve
- Page title: "Contact us"
- Form description: "THE AURA AERO TEAM WILL RESPOND TO YOU"
- Field labels and placeholders (firstname, lastname, email, etc.)
- Privacy policy consent text
- Department options: Sales, Communication, Human Resources, Other requests
- Submit button text: "SEND"

### Styling Elements to Replicate
- Professional color scheme (black, white, accent colors)
- Typography hierarchy
- Form field styling and focus states
- Button hover effects
- Responsive layout behavior

## Technical Considerations

### Form Validation
- Required field validation (firstname, lastname, email, message, consent)
- Email format validation
- Character limits (400 for text fields, 2000 for message)
- Real-time validation feedback

### Accessibility Features
- ARIA labels for form fields
- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Focus management

### Responsive Design
- Mobile-first approach using Tailwind breakpoints
- Flexible form layout that adapts to screen sizes
- Touch-friendly form elements on mobile devices

## Data Refactoring Opportunities

### Company Information
Extract repeating company data into `src/data/company.json`:
- Company name
- Logo information
- Social media links
- Contact information

### Navigation Structure  
Extract site navigation into `src/data/navigation.json`:
- Menu items
- Language switching options
- Mobile navigation structure

### Contact Page Data
Create `src/data/contact.json` for:
- Page title and descriptions
- Form field configurations
- Department options
- Privacy policy links

## Implementation Sequence

1. **Setup** (Step 1)
2. **Data Files** (Steps 2-4) 
3. **TypeScript Interfaces** (Step 5)
4. **Layout Components** (Steps 6-8)
5. **UI Components** (Steps 9-13)
6. **Contact Section** (Step 14)
7. **Contact Page** (Step 15)
8. **Hooks** (Steps 16-18)
9. **Integration** (Step 19)
10. **Testing & Polish** (Step 20)

## Success Criteria

- [ ] Page renders correctly at all breakpoints
- [ ] Form validation works as expected
- [ ] All required fields enforced
- [ ] Privacy policy consent required
- [ ] Department selection functional
- [ ] Styling matches original design
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] TypeScript compilation without errors
- [ ] Components properly reusable across site

This plan provides a comprehensive roadmap for faithfully replicating the Contact Us page while establishing a solid foundation for the broader site architecture.