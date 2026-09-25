import { z } from 'zod';

const PHONE_REGEX = /^(?:\+251|0)?[79]\d{8}$/;

export const loginSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  phone: z.string().regex(PHONE_REGEX, 'Enter a valid Ethiopian phone number (e.g. 0912345678).'),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required.'),
    email: z.string().email('Enter a valid email address.'),
    phone: z.string().regex(PHONE_REGEX, 'Enter a valid Ethiopian phone number (e.g. 0912345678).'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const checkoutSchema = z
  .object({
    fulfillment: z.enum(['delivery', 'pickup']),
    address: z.string().optional(),
    phone: z.string().regex(PHONE_REGEX, 'Enter a valid Ethiopian phone number.'),
    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.fulfillment === 'delivery' && !data.address?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Delivery address is required.',
        path: ['address'],
      });
    }
  });