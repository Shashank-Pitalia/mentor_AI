import { z } from "zod";

export const registerSchema = z.object({
  userName: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
});

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(3, "Username or email must be at least 3 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
});

export const googleLoginSchema = z.object({
  token: z.string().min(1, "Google token is required"),
});