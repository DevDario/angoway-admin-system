import { z } from "zod";

export const editDriverSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .nonempty("O nome é obrigatório"),
  email: z.string().email("Email inválido").nonempty("O email é obrigatório"),
  number: z
    .string()
    .min(9, "O número deve ter pelo menos 9 dígitos")
    .max(9, "O número deve ter no máximo 9 dígitos")
    .regex(
      /^(?:\+244|244)?9[1-9]\d{7}$/,
      "Formato de telefone inválido (deve ser 9xx xxx xxx)"
    )
    .nonempty("O número é obrigatório"),
  licenseNumber: z
    .string()
    .regex(/^LD-\d{6}$/, "A licença deve estar no formato 'LD-123456' ")
    .min(9, "A licença deve ter pelo menos 8 caracteres")
    .max(9, "A licença deve ter no máximo 8 caracteres")
    .nonempty("A licença é obrigatória"),
  experienceTime: z
    .string(
      z
        .number()
        .min(1, "A experiência deve ser maior ou igual a 1 Ano")
        .nonnegative("O valor deve ser positivo")
        .default(1)
    )
    .nonempty("A experiência é obrigatória"),
});

export type DriverEditInput = z.infer<typeof editDriverSchema>;
