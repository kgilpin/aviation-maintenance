# Step 5: Create TypeScript Interfaces

## Objective
Create comprehensive TypeScript interfaces for all data structures to ensure type safety throughout the application.

## Actions Required

### 5.1 Create Main Types File
Create `src/data/types.ts` with all necessary interfaces:

```typescript
// ====================
// Company Data Types
// ====================

export interface CompanyLogo {
  main: string;
  favicon: string;
  alt: string;
}

export interface CompanyBranding {
  backgroundImage: string;
  themeColor: string;
  backgroundColor: string;
}

export interface CompanyPWA {
  manifest: string;
  appleTouchIcon: string;
  favicon16: string;
  favicon32: string;
  safariPinnedTab: string;
}

export interface ContactDepartment {
  id: string;
  name: string;
  description: string;
}

export interface CompanyContact {
  email: Record<string, string>;
  departments: ContactDepartment[];
}

export interface SocialMediaLink {
  username: string;
  url: string;
}

export interface CompanySocialMedia {
  facebook: SocialMediaLink;
  twitter: SocialMediaLink;
  linkedin: SocialMediaLink;
}

export interface CompanySEO {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  keywords: string[];
}

export interface CompanyData {
  name: string;
  fullName: string;
  description: string;
  tagline: string;
  logo: CompanyLogo;
  branding: CompanyBranding;
  pwa: CompanyPWA;
  contact: CompanyContact;
  socialMedia: CompanySocialMedia;
  seo: CompanySEO;
}

// ====================
// Navigation Data Types
// ====================

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
  description?: string;
  children?: NavigationItem[];
}

export interface Language {
  code: string;
  label: string;
  flag: string;
  isDefault: boolean;
}

export interface MobileNavigation {
  breakpoint: string;
  hamburgerLabel: string;
  closeLabel: string;
}

export interface BreadcrumbConfig {
  separator: string;
  homeLabel: string;
  showOnPages: string[];
  customLabels: Record<string, string>;
}

export interface NavigationData {
  main: NavigationItem[];
  footer: NavigationItem[];
  languages: Language[];
  mobile: MobileNavigation;
  breadcrumbs: BreadcrumbConfig;
}

// ====================
// Form Data Types
// ====================

export type FormFieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';

export interface FormFieldOption {
  value: string;
  label: string;
  description?: string;
}

export interface FormFieldLink {
  text: string;
  href: string;
  target?: string;
}

export interface FormField {
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  maxLength?: number;
  rows?: number;
  options?: FormFieldOption[];
  validation: Record<string, string>;
  text?: string;
  links?: Record<string, FormFieldLink>;
}

export interface FormSubmission {
  method: string;
  action: string;
  successRedirect: string;
  loadingText: string;
  submitText: string;
}

export interface FormAccessibility {
  formAriaLabel: string;
  requiredFieldsNote: string;
  errorSummaryHeading: string;
  skipToContent: string;
}

export interface RecaptchaConfig {
  enabled: boolean;
  siteKey: string;
  action: string;
}

export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface ContactPageData {
  title: string;
  description: string;
  seo: PageSEO;
}

export interface ContactFormData {
  title: string;
  description: string;
  submitMessage: string;
  successMessage: string;
  errorMessage: string;
  fields: Record<string, FormField>;
  submission: FormSubmission;
}

export interface ContactData {
  page: ContactPageData;
  form: ContactFormData;
  accessibility: FormAccessibility;
  recaptcha: RecaptchaConfig;
}

// ====================
// Form State Types
// ====================

export interface FormValues {
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  message: string;
  department: string;
  consent: boolean;
}

export interface FormErrors {
  lastname?: string;
  firstname?: string;
  phone?: string;
  email?: string;
  message?: string;
  department?: string;
  consent?: string;
  general?: string;
}

export interface FormState {
  values: FormValues;
  errors: FormErrors;
  touched: Record<keyof FormValues, boolean>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string | null;
}

// ====================
// Component Props Types
// ====================

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface InputProps {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
}

export interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
}

export interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  options: FormFieldOption[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
}

export interface CheckboxProps {
  name: string;
  label?: string;
  checked: boolean;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  className?: string;
}

// ====================
// Layout Types
// ====================

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface HeaderProps {
  navigation: NavigationData;
  company: CompanyData;
  currentPath?: string;
}

export interface FooterProps {
  navigation: NavigationData;
  company: CompanyData;
}

// ====================
// Hook Return Types
// ====================

export interface UseContactFormReturn {
  formState: FormState;
  updateField: (field: keyof FormValues, value: string | boolean) => void;
  validateField: (field: keyof FormValues) => void;
  validateForm: () => boolean;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}

export interface UseCompanyDataReturn {
  company: CompanyData | null;
  loading: boolean;
  error: string | null;
}

export interface UseContactDataReturn {
  contactData: ContactData | null;
  loading: boolean;
  error: string | null;
}

export interface UseNavigationDataReturn {
  navigation: NavigationData | null;
  loading: boolean;
  error: string | null;
}

// ====================
// Utility Types
// ====================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export type ValidationRules = Record<keyof FormValues, ValidationRule>;

// ====================
// Image Handling Types
// ====================

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export type ImageMap = Record<string, string>;
```

### 5.2 Create Utility Types File
Create `src/data/validation.ts` for validation utilities:

```typescript
import { FormValues, FormErrors, ValidationRules } from './types';

export const validationRules: ValidationRules = {
  lastname: {
    required: true,
    maxLength: 400
  },
  firstname: {
    required: true,
    maxLength: 400
  },
  phone: {
    maxLength: 400,
    pattern: /^[\+]?[1-9][\d]{0,15}$/
  },
  email: {
    required: true,
    maxLength: 400,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  message: {
    required: true,
    maxLength: 2000
  },
  department: {
    required: true
  },
  consent: {
    required: true
  }
};

export const validateField = (
  field: keyof FormValues,
  value: string | boolean,
  rules: ValidationRules
): string | null => {
  const rule = rules[field];
  if (!rule) return null;

  if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return `${field} is required`;
  }

  if (typeof value === 'string') {
    if (rule.maxLength && value.length > rule.maxLength) {
      return `${field} must be less than ${rule.maxLength} characters`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return `Please enter a valid ${field}`;
    }
  }

  if (rule.custom) {
    return rule.custom(value);
  }

  return null;
};

export const validateForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  Object.keys(values).forEach((key) => {
    const field = key as keyof FormValues;
    const error = validateField(field, values[field], validationRules);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};
```

## Benefits of Type Safety

### 1. Compile-time Error Detection
- Catches typos in property names
- Ensures required properties are provided
- Validates data structure consistency

### 2. Enhanced IDE Support
- Autocomplete for object properties
- Inline documentation
- Refactoring safety

### 3. Runtime Safety
- Clear interfaces for data validation
- Consistent data structure expectations
- Better error handling

### 4. Documentation
- Self-documenting code through interfaces
- Clear API contracts between components
- Easier onboarding for new developers

## Deliverables
- `src/data/types.ts` created with comprehensive interfaces
- `src/data/validation.ts` created with validation utilities
- Type safety established for all data structures
- Foundation for type-safe component development

## Next Step
Proceed to Step 6: Create Layout Components