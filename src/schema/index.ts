import { z } from "zod";

export const signupSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Campo de senha precisa ter no mínimo 8 caracteres",
    })
    .max(80, {
      message: "Campo de senha suporta no máximo 80 caracteres",
    }),
  email: z.string().email({ message: "Digite um email valido" }),
});

export const signinSchema = z.object({
  email: z.string().email({ message: "Digite um email valido" }),
  password: z
    .string()
    .min(8, {
      message: "Campo de senha precisa ter no mínimo 8 caracteres",
    })
    .max(80, {
      message: "Campo de senha suporta no máximo 80 caracteres",
    }),
});

export const dataMediaSchema = z.object({
  title: z.string(),
  type: z.string(),
  size: z.number(),
  url: z.string(),
});
