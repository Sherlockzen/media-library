"use server";

import { signupSchema } from "@/schema";
import { lucia } from "@/server/auth";
import { db } from "@/server/db/db";
import { userTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";
import { z } from "zod";

export async function signup(values: z.infer<typeof signupSchema>) {
  const validateValues = signupSchema.safeParse(values);

  if (!validateValues.success) {
    return {
      error: "Erro ao cadastrar usuario",
    };
  }

  const { email, password } = validateValues.data;

  const hashedPassword = await new Argon2id().hash(password);

  const existUser = await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  });

  if (existUser) {
    return {
      error: "Usuario ja existe",
    };
  }

  const userId = generateId(15);

  await db.insert(userTable).values({
    id: userId,
    password: hashedPassword,
    email: email,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return { success: 'Usuario criado com successo' };
}
