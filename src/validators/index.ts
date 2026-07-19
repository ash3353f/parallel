// Zod Schemas & Validation Definitions
import { z } from "zod";

export const genericResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});

export type GenericResponse = z.infer<typeof genericResponseSchema>;
