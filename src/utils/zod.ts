import { z } from 'zod';

const ALLOWED_IMG_TYPES = ['image/png', 'image/jpeg'];
const MAX_IMG_FILE_SIZE = 2 * 1024 * 1024;

export const zodSchemaUncontrolled = z
  .object({
    name: z
      .string()
      .regex(/^[A-Z]/, 'Must start with uppercase')
      .min(1, 'Required'),
    age: z
      .string()
      .regex(/^[1-9]\d*$/, { message: 'Age must be a positive number' })
      .min(1, 'Required'),
    email: z.string().email('Invalid email').min(1, 'Required'),
    password: z
      .string()
      .regex(/[!@#$%^&*]/, 'Must contain 1 special character')
      .regex(/\d/, 'Must contain 1 number')
      .regex(/[a-z]/, 'Must contain 1 lowercase letter')
      .regex(/[A-Z]/, 'Must contain 1 uppercase letter')
      .min(8, 'At least 8 characters')
      .min(1, 'Required'),
    confirmPassword: z.string().min(1, 'Required'),
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
    country: z.string().min(1, 'Required'),
    isAgreed: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
