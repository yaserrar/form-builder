import { z } from "zod";

export const fieldTypes = ["input", "textarea", "select"] as const;
export const inputTypes = ["text", "email", "password", "file"] as const;

export const inputSchema = z.object({
  type: z.enum(inputTypes),
  name: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  label: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  placeholder: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  min: z.number().nullable(),
  max: z.number().nullable(),
});

export type InputSchema = z.infer<typeof inputSchema>;

export const textareaSchema = z.object({
  name: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  label: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  placeholder: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  min: z.number().nullable(),
  max: z.number().nullable(),
});

export type TextareaSchema = z.infer<typeof textareaSchema>;
