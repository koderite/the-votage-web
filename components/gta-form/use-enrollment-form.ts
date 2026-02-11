import { useState, FormEvent } from 'react';

export interface EnrollmentFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  selectedClasses: string[];
}

export interface UseEnrollmentFormReturn {
  formData: EnrollmentFormData;
  isSubmitted: boolean;
  isSubmitting: boolean;
  errors: Partial<Record<keyof EnrollmentFormData, string>>;
  updateField: <K extends keyof EnrollmentFormData>(field: K, value: EnrollmentFormData[K]) => void;
  validate: () => boolean;
  reset: () => void;
  handleSubmit: (onSubmit: (data: EnrollmentFormData) => Promise<void>) => (e: FormEvent) => void;
}

export function useEnrollmentForm(): UseEnrollmentFormReturn {
  const [formData, setFormData] = useState<EnrollmentFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    selectedClasses: [],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof EnrollmentFormData, string>>>({});

  const updateField = <K extends keyof EnrollmentFormData>(
    field: K,
    value: EnrollmentFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EnrollmentFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      selectedClasses: [],
    });
    setIsSubmitted(false);
    setIsSubmitting(false);
    setErrors({});
  };

  const handleSubmit = (onSubmit: (data: EnrollmentFormData) => Promise<void>) => {
    return async (e: FormEvent) => {
      e.preventDefault();

      if (!validate()) {
        return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit(formData);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
  };

  return {
    formData,
    isSubmitted,
    isSubmitting,
    errors,
    updateField,
    validate,
    reset,
    handleSubmit,
  };
}
