import { z } from "zod";

export const expenseSchema = z.object({
  amount: z.number().positive(),
  category: z.string().min(2),
  description: z.string().optional(),
  date: z.string()
});