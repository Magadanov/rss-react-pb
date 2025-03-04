import { z } from 'zod';

const ALLOWED_IMG_TYPES = ['image/png', 'image/jpeg'];
const MAX_IMG_FILE_SIZE = 2 * 1024 * 1024;

export const zodSchemaUncontrolled = z
  .object({
    name: z
      .string({ required_error: 'Required' })
      .regex(/^[A-Z]/, 'Must start with uppercase'),
    age: z
      .string({ required_error: 'Required' })
      .regex(/^[1-9]\d*$/, { message: 'Age must be a positive number' }),
    email: z.string({ required_error: 'Required' }).email('Invalid email'),
    password: z
      .string({ required_error: 'Required' })
      .regex(/[!@#$%^&*]/, 'Must contain 1 special character')
      .regex(/\d/, 'Must contain 1 number')
      .regex(/[a-z]/, 'Must contain 1 lowercase letter')
      .regex(/[A-Z]/, 'Must contain 1 uppercase letter')
      .min(8, 'At least 8 characters'),
    confirmPassword: z.string({ required_error: 'Required' }),
    picture: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_IMG_FILE_SIZE, {
        message: 'File size must be less than 2MB',
      })
      .refine((file) => ALLOWED_IMG_TYPES.includes(file.type), {
        message: 'Only PNG and JPEG are allowed',
      })
      .refine((file) => file.size, {
        message: 'Required',
      }),
    country: z.string({ required_error: 'Required' }),
    isAgreed: z.string({ required_error: 'Required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const zodSchemaHook = z
  .object({
    name: z
      .string({ required_error: 'Required' })
      .regex(/^[A-Z]/, 'Must start with uppercase'),
    age: z
      .number({ required_error: 'Required' })
      .nonnegative('Age must be a positive number'),
    gender: z.enum(['F', 'M'], { required_error: 'Required' }),
    email: z.string({ required_error: 'Required' }).email('Invalid email'),
    password: z
      .string({ required_error: 'Required' })
      .regex(/[!@#$%^&*]/, 'Must contain 1 special character')
      .regex(/\d/, 'Must contain 1 number')
      .regex(/[a-z]/, 'Must contain 1 lowercase letter')
      .regex(/[A-Z]/, 'Must contain 1 uppercase letter')
      .min(8, 'At least 8 characters'),
    confirmPassword: z.string({ required_error: 'Required' }),
    picture: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_IMG_FILE_SIZE, {
        message: 'File size must be less than 2MB',
      })
      .refine((file) => ALLOWED_IMG_TYPES.includes(file.type), {
        message: 'Only PNG and JPEG are allowed',
      })
      .refine((file) => file.size, {
        message: 'Required',
      }),
    country: z.string({ required_error: 'Required' }),
    isAgreed: z.boolean({ required_error: 'Required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
