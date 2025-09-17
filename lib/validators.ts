// lib/validators.ts
import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2).max(80),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9._-]+$/, "Only letters, numbers, . _ -"),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const LoginSchema = z.object({
  identifier: z.string().min(3), // email or username
  password: z.string().min(8),
});
