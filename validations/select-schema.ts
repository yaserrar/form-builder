import { inputTypes } from "@/lib/data";
import { z } from "zod";

export const selectSchema = z.object({
  type: z.enum(inputTypes),
  name: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  label: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Field is required" }),
  placeholder: z.string({ required_error: "Field is required" }),
});

export type SelectSchema = z.infer<typeof selectSchema>;
