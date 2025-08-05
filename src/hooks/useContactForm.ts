import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { 
  FormValues, 
  FormState, 
  UseContactFormReturn 
} from '@/data/types';
import { validateField, validateForm } from '@/utils/validation';

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