import type { FormValues, FormErrors, ValidationRules } from '@/data/types';

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