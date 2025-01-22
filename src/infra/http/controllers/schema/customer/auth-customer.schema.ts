import { z } from 'zod';

export const AuthCustomerSchema = z.object({
  email: z
    .string({
      message: 'E-mail do cliente é obrigatório!',
    })
    .email({
      message:
        'E-mail do cliente deve estar no formato válido (mail@mail.com)!',
    }),
  password: z.string({
    message: 'Senha do cliente é obrigatório!',
  }),
});

export type TAuthCustomerSchema = z.infer<typeof AuthCustomerSchema>;