'use server'

import { dataMediaSchema } from "@/schema";
import { validateRequest } from "@/server/auth";
import { db } from "@/server/db/db";
import { midiaTable } from "@/server/db/schema";
import { generateId } from "lucia";
import { z } from "zod";

export async function saveFileToDb(values: z.infer<typeof dataMediaSchema>) {
  const validateValues = dataMediaSchema.safeParse(values);

  const { user } = await validateRequest();

  if (!validateValues.success) {
    return {
      error: "Erro ao validar os dados"
    }
  }

  const { title, type, size, url } = validateValues.data;

  const midiaId = generateId(15);


  if (!user) {
    return {
      error: 'Usuário não logado'
    };
  };

  const cdnUrl = process.env.CDN_URL! + url;

  await db.insert(midiaTable).values({
    id: midiaId,
    owner_id: user.id,
    title: title,
    url: cdnUrl,
    size: size,
    type: type,
  })

  return {
    success: 'Arquivo registrado com sucesso!'
  }
}