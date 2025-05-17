import { z } from "zod";

export const createRouteSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
        .nonempty("O nome é obrigatório"),
    origin: z
        .string()
        .min(3, "A origem deve ter pelo menos 3 caracteres")
        .nonempty("A origem é obrigatória"),
    destination: z
        .string()
        .min(3, "O destino deve ter pelo menos 3 caracteres")
        .nonempty("O destino é obrigatório"),
    status: z.enum(["active", "inactive"], {
        errorMap: () => ({ message: "O status deve ser 'active' ou 'inactive'" }),
    }),
});

export type RouteCreateInput = z.infer<typeof createRouteSchema>;
