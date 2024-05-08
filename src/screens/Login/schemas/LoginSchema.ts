import z from 'zod';

const LoginSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Minimum is 3 characters!')
      .max(50, 'Maximum characters exceeded!')
      .refine(s => !s.includes(' '), 'Space is not allowed!'),
    password: z
      .string()
      .min(8, 'Minimum is 8 characters!')
      .refine(s => !s.includes(' '), 'Space is not allowed!')
  })

export default LoginSchema;
