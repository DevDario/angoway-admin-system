import { z } from "zod";

export const createBusSchema = z.object({
  matricula: z
    .string()
    .max(11, "A matrícula deve ter no máximo 11 caracteres")
    .min(11, "A matrícula deve ter no mínimo 11 caracteres")
    .nonempty("Você precisa informar a matrícula"),
  rota: z.string().nonempty("Você precisa informar uma rota"),
  capacidade: z.string(
    z
      .number()
      .int()
      .max(50, "A capacidade deve ser de no máximo 50 assentos")
      .min(20, "A capacidade deve ser de no mínimo 20 assentos")
      .positive()
  ),
  // .number()
  // .int("Apenas valores inteiros são válidos")
  // .max(50, "A capacidade máxima é 50")
  // .nonnegative("O valor deve ser positivo")
  motorista: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .nonempty("Você precisa informar o nome do motorista"),
});

export type DriverCreateInput = z.infer<typeof createBusSchema>;
