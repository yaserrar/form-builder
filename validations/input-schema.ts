import { inputTypes } from "@/lib/data";
import { z } from "zod";

export const inputSchema = z.object({
  type: z.enum(inputTypes),
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

export type InputSchema = z.infer<typeof inputSchema>;
