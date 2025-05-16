import { z } from "zod";

export const createDriverSchema = z.object({
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
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/\d/, "A senha deve conter pelo menos um número")
    .nonempty("A senha é obrigatória"),
  role: z.enum(["USER", "DRIVER"]).default("DRIVER"),
  licenseNumber: z
    .string()
    .regex(/^LD-\d{6}$/, "A licença deve estar no formato 'LD-123456' ")
    .min(8, "A licença deve ter pelo menos 8 caracteres")
    .max(8, "A licença deve ter no máximo 8 caracteres")
    .nonempty("A licença é obrigatória"),
});

export type DriverCreateInput = z.infer<typeof createDriverSchema>;
