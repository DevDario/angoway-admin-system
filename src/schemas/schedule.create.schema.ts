import { z } from "zod";

export const createScheduleSchema = z.object({
  route: z.string(z.number().positive()).optional(),
  departureLocation: z.string().optional(),
  arrivalLocation: z.string().optional(),
  departureTime: z.string(z.date()).nonempty("Campo Obrigatório"),
  arrivalTime: z.string(z.date()).nonempty("Campo Obrigatório"),
  status: z.enum(["active", "inactive"], {
    errorMap: () => ({ message: "O status deve ser 'active' ou 'inactive'" }),
  }),
  distanceKM: z.string(z.number().nonnegative("O valor deve ser positivo")),
  estimatedDurationMinutes: z.string(z.number()),
});

export type ScheduleEditInput = z.infer<typeof createScheduleSchema>;
