import { z } from "zod";

export const signupSchema = z.object({
 name: z
  .string()
  .min(3, {
   message: "Campo usuário precisa ter no mínimo 3 caracteres",
  })
  .max(30, {
   message: "Campo usuário pode ter no máximo 30 caracteres",
  }),
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
 id: z.string(),
 owner_id: z.string(),
 title: z.string(),
 url: z.string(),
 size: z.number(),
 type: z.string(),
 created_at: z.string(),
 updated_at: z.string(),
});
