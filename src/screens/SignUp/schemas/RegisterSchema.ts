import z from 'zod';

const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Minimum is 3 characters!')
      .max(50, 'Maximum characters exceeded!')
      .refine(s => !s.includes(' '), 'Space is not allowed!'),
    email: z
      .string()
      .email()
      .min(1, 'Email is required!')
      .refine(s => !s.includes(' '), 'Space is not allowed!'),
    password: z
      .string()
      .min(8, 'Minimum is 8 characters!')
      .refine(s => !s.includes(' '), 'Space is not allowed!'),
    confirmPassword: z
      .string()
      .min(8, 'Minimum is 8 characters!')
      .refine(s => !s.includes(' '), 'Space is not allowed!'),
  })
  .refine(value => value.password === value.confirmPassword, {
    message: 'Password is not match!',
    path: ['confirmPassword'],
  });

export default RegisterSchema;
