import { z } from "zod";

const fieldTypes = ["input", "textarea", "select"] as const;

const formSchema = z.object({
  type: z.enum(fieldTypes),
  name: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  label: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  placeholder: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
});

const FormSchema = z.infer<typeof formSchema>;
