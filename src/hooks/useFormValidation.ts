import { safeValidateLogin, safeValidateRegister, type LoginFormData, type RegisterFormData } from '@/schemas/auth.schema';
import { useState } from 'react';

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult<T> {
  success: boolean;
  data: T | null;
  error: ValidationError[] | null;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateLogin = (data: unknown): ValidationResult<LoginFormData> => {
    const result = safeValidateLogin(data);
    updateErrors(result.error);
    return result;
  };

  const validateRegister = (data: unknown): ValidationResult<RegisterFormData> => {
    const result = safeValidateRegister(data);
    updateErrors(result.error);
    return result;
  };

  const updateErrors = (validationErrors: ValidationError[] | null) => {
    if (!validationErrors) {
      setErrors({});
      return;
    }

    const newErrors: Record<string, string> = {};
    validationErrors.forEach(err => {
      newErrors[err.field] = err.message;
    });
    setErrors(newErrors);
  };

  const clearErrors = () => {
    setErrors({});
  };

  const getFieldError = (field: string): string | undefined => {
    return errors[field];
  };

  const hasErrors = (): boolean => {
    return Object.keys(errors).length > 0;
  };

  const isFieldValid = (field: string): boolean => {
    return !errors[field];
  };

  return {
    errors,
    validateLogin,
    validateRegister,
    clearErrors,
    getFieldError,
    hasErrors,
    isFieldValid,
  };
}
