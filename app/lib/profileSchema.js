import { z } from "zod";

export const profileSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(15, "Max 15 characters"),
  code: z.string().regex(/^\d{12}$/, "Trainer code must be exactly 12 digits"),
  team: z.enum(["valor", "mystic", "instinct"], {
    required_error: "Select your team",
  }),
  level: z
    .string()
    .min(1, "Level is required")
    .refine((val) => Number(val) >= 1 && Number(val) <= 50, {
      message: "Level must be between 1 and 50",
    }),
  tags: z.array(z.string()).optional(),
  message: z.string().max(200, "Max 200 characters").optional(),
});
