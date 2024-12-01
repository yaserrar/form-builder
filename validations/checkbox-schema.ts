import { z } from "zod";

export const checkboxSchema = z.object({
  name: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  label: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
});

export type CheckboxSchema = z.infer<typeof checkboxSchema>;
