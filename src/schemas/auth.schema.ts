import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
  username: z.string()
    .min(1, 'Tên đăng nhập không được để trống')
    .max(50, 'Tên đăng nhập không được quá 50 ký tự'),
  password: z.string()
    .min(1, 'Mật khẩu không được để trống')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(100, 'Mật khẩu không được quá 100 ký tự'),
});

// Register Schema (matches UserCreate from OpenAPI)
export const registerSchema = z.object({
  email: z.string()
    .min(1, 'Email không được để trống')
    .email('Email không hợp lệ')
    .max(100, 'Email không được quá 100 ký tự'),
  username: z.string()
    .min(1, 'Tên đăng nhập không được để trống')
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
    .max(50, 'Tên đăng nhập không được quá 50 ký tự')
    .regex(/^[a-zA-Z0-9_]+$/, 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới'),
  password: z.string()
    .min(1, 'Mật khẩu không được để trống')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(100, 'Mật khẩu không được quá 100 ký tự'),
  full_name: z.string()
    .min(1, 'Họ và tên không được để trống')
    .max(100, 'Họ và tên không được quá 100 ký tự')
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng')
    .nullable()
    .optional(),
});

// Confirm Password Schema (for register form)
export const confirmPasswordSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

// Types derived from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ConfirmPasswordData = z.infer<typeof confirmPasswordSchema>;

// Validation functions
export const validateLogin = (data: unknown): LoginFormData => {
  return loginSchema.parse(data);
};

export const validateRegister = (data: unknown): RegisterFormData => {
  return registerSchema.parse(data);
};

export const validateConfirmPassword = (data: unknown): ConfirmPasswordData => {
  return confirmPasswordSchema.parse(data);
};

// Safe validation functions (return success/error instead of throwing)
export const safeValidateLogin = (data: unknown) => {
  try {
    const result = loginSchema.parse(data);
    return { success: true, data: result, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: null, 
        error: error.issues.map((err: z.ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      };
    }
    console.error('Validation error:', error);
    return { 
      success: false, 
      data: null, 
      error: [{ field: 'unknown', message: 'Lỗi validation không xác định' }]
    };
  }
};

export const safeValidateRegister = (data: unknown) => {
  try {
    const result = registerSchema.parse(data);
    return { success: true, data: result, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: null, 
        error: error.issues.map((err: z.ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      };
    }
    console.error('Validation error:', error);
    return { 
      success: false, 
      data: null, 
      error: [{ field: 'unknown', message: 'Lỗi validation không xác định' }]
    };
  }
};
