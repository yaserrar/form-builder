import { z } from "zod";

export const fieldTypes = ["input", "textarea", "select"] as const;
export const inputTypes = ["text", "email", "password", "file"] as const;

export const formSchema = z.object({
  type: z.enum(fieldTypes),
  inputType: z.enum(inputTypes),
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
  options: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
});

export type FormSchema = z.infer<typeof formSchema>;
