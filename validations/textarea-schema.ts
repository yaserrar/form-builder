import { z } from "zod";

export const textareaSchema = z.object({
  name: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  label: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  placeholder: z.string({ required_error: "Field is required" }),
  min: z.number().nullable(),
  max: z.number().nullable(),
});

export type TextareaSchema = z.infer<typeof textareaSchema>;
