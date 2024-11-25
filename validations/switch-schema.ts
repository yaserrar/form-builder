import { z } from "zod";

export const switchSchema = z.object({
  name: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  label: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
});

export type SwitchSchema = z.infer<typeof switchSchema>;
