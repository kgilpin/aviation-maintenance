# Step 16: Create Custom Hooks

## Objective
Create custom React hooks for data management, form handling, and state management to provide clean, reusable logic throughout the application.

## Actions Required

### 16.1 Create Company Data Hook
Create `src/hooks/useCompanyData.ts`:

```typescript
import { useState, useEffect } from 'react';
import { CompanyData, UseCompanyDataReturn } from '@/data/types';

export const useCompanyData = (): UseCompanyDataReturn => {
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Import JSON data
        const companyDataModule = await import('@/data/company.json');
        const companyData = companyDataModule.default as CompanyData;

        setCompany(companyData);
      } catch (err) {
        setError('Failed to load company data');
        console.error('Error loading company data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCompanyData();
  }, []);

  return { company, loading, error };
};
```

### 16.2 Create Navigation Data Hook
Create `src/hooks/useNavigationData.ts`:

```typescript
import { useState, useEffect } from 'react';
import { NavigationData, UseNavigationDataReturn } from '@/data/types';

export const useNavigationData = (): UseNavigationDataReturn => {
  const [navigation, setNavigation] = useState<NavigationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNavigationData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Import JSON data
        const navigationDataModule = await import('@/data/navigation.json');
        const navigationData = navigationDataModule.default as NavigationData;

        setNavigation(navigationData);
      } catch (err) {
        setError('Failed to load navigation data');
        console.error('Error loading navigation data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNavigationData();
  }, []);

  return { navigation, loading, error };
};
```

### 16.3 Create Contact Data Hook
Create `src/hooks/useContactData.ts`:

```typescript
import { useState, useEffect } from 'react';
import { ContactData, UseContactDataReturn } from '@/data/types';

export const useContactData = (): UseContactDataReturn => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContactData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Import JSON data
        const contactDataModule = await import('@/data/contact.json');
        const contactData = contactDataModule.default as ContactData;

        setContactData(contactData);
      } catch (err) {
        setError('Failed to load contact data');
        console.error('Error loading contact data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContactData();
  }, []);

  return { contactData, loading, error };
};
```

### 16.4 Create Contact Form Hook
Create `src/hooks/useContactForm.ts`:

```typescript
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FormValues, 
  FormErrors, 
  FormState, 
  UseContactFormReturn 
} from '@/data/types';
import { validateField, validateForm } from '@/data/validation';

const initialValues: FormValues = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  message: '',
  department: '',
  consent: false
};

const initialTouched = {
  firstname: false,
  lastname: false,
  phone: false,
  email: false,
  message: false,
  department: false,
  consent: false
};

export const useContactForm = (): UseContactFormReturn => {
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: initialTouched,
    isSubmitting: false,
    isSubmitted: false,
    submitError: null
  });

  const updateField = useCallback((
    field: keyof FormValues, 
    value: string | boolean
  ) => {
    setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [field]: value
      },
      // Clear field error when user starts typing
      errors: {
        ...prev.errors,
        [field]: undefined
      }
    }));
  }, []);

  const validateFieldCallback = useCallback((field: keyof FormValues) => {
    const value = formState.values[field];
    const error = validateField(field, value);
    
    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [field]: true
      },
      errors: {
        ...prev.errors,
        [field]: error
      }
    }));
  }, [formState.values]);

  const validateFormCallback = useCallback((): boolean => {
    const errors = validateForm(formState.values);
    const hasErrors = Object.keys(errors).length > 0;

    setFormState(prev => ({
      ...prev,
      errors,
      touched: Object.keys(initialTouched).reduce((acc, key) => ({
        ...acc,
        [key]: true
      }), {} as Record<keyof FormValues, boolean>)
    }));

    return !hasErrors;
  }, [formState.values]);

  const submitForm = useCallback(async () => {
    try {
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: true, 
        isSubmitted: true,
        submitError: null 
      }));

      // Validate form before submission
      const isValid = validateFormCallback();
      if (!isValid) {
        setFormState(prev => ({ ...prev, isSubmitting: false }));
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For now, just log the form data and redirect
      console.log('Form submitted:', formState.values);

      // In a real application, you would send the data to your API:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formState.values)
      // });
      //
      // if (!response.ok) {
      //   throw new Error('Failed to submit form');
      // }

      // Reset form and redirect to success page
      setFormState({
        values: initialValues,
        errors: {},
        touched: initialTouched,
        isSubmitting: false,
        isSubmitted: false,
        submitError: null
      });

      navigate('/contact-us/thank-you');
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: error instanceof Error ? error.message : 'An error occurred'
      }));
    }
  }, [formState.values, validateFormCallback, navigate]);

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: initialTouched,
      isSubmitting: false,
      isSubmitted: false,
      submitError: null
    });
  }, []);

  return {
    formState,
    updateField,
    validateField: validateFieldCallback,
    validateForm: validateFormCallback,
    submitForm,
    resetForm
  };
};
```

### 16.5 Create Form Validation Utilities
Create `src/utils/validation.ts`:

```typescript
import { FormValues, FormErrors, ValidationRules } from '@/data/types';

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
  value: string | boolean
): string | null => {
  const rule = validationRules[field];
  if (!rule) return null;

  // Required validation
  if (rule.required) {
    if (typeof value === 'boolean' && !value) {
      return getErrorMessage(field, 'required');
    }
    if (typeof value === 'string' && (!value || value.trim() === '')) {
      return getErrorMessage(field, 'required');
    }
  }

  // String-specific validations
  if (typeof value === 'string' && value) {
    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return getErrorMessage(field, 'maxLength', rule.maxLength);
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return getErrorMessage(field, 'pattern');
    }
  }

  // Custom validation
  if (rule.custom) {
    return rule.custom(value);
  }

  return null;
};

export const validateForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  Object.keys(values).forEach((key) => {
    const field = key as keyof FormValues;
    const error = validateField(field, values[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

const getErrorMessage = (
  field: keyof FormValues, 
  type: string, 
  value?: number
): string => {
  const fieldLabels: Record<keyof FormValues, string> = {
    firstname: 'First name',
    lastname: 'Last name',
    phone: 'Phone number',
    email: 'Email address',
    message: 'Message',
    department: 'Department',
    consent: 'Privacy consent'
  };

  const label = fieldLabels[field];

  switch (type) {
    case 'required':
      return field === 'consent' 
        ? 'You must agree to the privacy policy to continue'
        : `${label} is required`;
    case 'maxLength':
      return `${label} must be less than ${value} characters`;
    case 'pattern':
      return field === 'email' 
        ? 'Please enter a valid email address'
        : `Please enter a valid ${label.toLowerCase()}`;
    default:
      return `Invalid ${label.toLowerCase()}`;
  }
};
```

## Hook Architecture Benefits

### 1. Data Hooks
- **Centralized Loading:** All data loading logic in one place
- **Error Handling:** Consistent error states across components
- **Caching:** Future enhancement opportunity for data caching
- **TypeScript Safety:** Full type safety for all data operations

### 2. Form Hook
- **State Management:** Complex form state handled in one place
- **Validation Logic:** Reusable validation across different forms
- **Submission Handling:** Consistent form submission pattern
- **Error Recovery:** Proper error handling and user feedback

### 3. Validation Utilities
- **Reusable Rules:** Validation rules can be used independently
- **Consistent Messages:** Standardized error messages
- **Type Safety:** TypeScript ensures correct field validation
- **Extensible:** Easy to add new validation rules

## Performance Optimizations

### 1. Callback Memoization
- `useCallback` prevents unnecessary re-renders
- Form field updates don't trigger full form re-validation
- Validation only runs when needed

### 2. Lazy Data Loading
- JSON imports are async and tree-shakeable
- Data only loads when hooks are used
- Error boundaries can handle loading failures

### 3. State Updates
- Minimal state updates reduce re-renders
- Field-level error clearing improves UX
- Touched state prevents premature validation

## Testing Strategy

### Unit Tests
```typescript
// Example test structure
describe('useContactForm', () => {
  it('should validate required fields', () => {
    // Test validation logic
  });

  it('should submit form successfully', () => {
    // Test form submission
  });

  it('should handle submission errors', () => {
    // Test error handling
  });
});
```

### Integration Tests
```typescript
// Example integration test
describe('Contact Form Integration', () => {
  it('should complete full form flow', () => {
    // Test entire user journey
  });
});
```

## Deliverables
- `src/hooks/useCompanyData.ts` - Company data management
- `src/hooks/useNavigationData.ts` - Navigation data management  
- `src/hooks/useContactData.ts` - Contact page data management
- `src/hooks/useContactForm.ts` - Form state and submission logic
- `src/utils/validation.ts` - Form validation utilities
- Type-safe data loading and error handling
- Reusable form logic for future forms
- Performance-optimized state management

## Next Step
Proceed to Step 19: Integration and Testing