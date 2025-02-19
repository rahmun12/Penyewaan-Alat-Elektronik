import { z } from "zod";

export const registerValidation = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().min(3, { message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be less than 20 characters" }),
});
