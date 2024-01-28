"use server";
import { signinSchema } from "@/schema";
import { lucia } from "@/server/auth";
import { db } from "@/server/db/db";
import { userTable } from "@/server/db/schema";
import { error, log } from "console";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { z } from "zod";

export async function login(values: z.infer<typeof signinSchema>) {
 const validateValues = signinSchema.safeParse(values);

 if (!validateValues.success) {
  return {
   error: "Não foi possível realizar login",
  };
 }

 const { email, password } = validateValues.data;

 const existUser = await db.query.userTable.findFirst({
  where: eq(userTable.email, email),
 });

 if (!existUser) {
  return {
   error: "Usuário ou senha incorretos",
  };
 }

 const validPassword = await new Argon2id().verify(
  existUser.password,
  password
 );
 if (!validPassword) {
  return {
   error: "Usuário ou senha incorretos",
  };
 }

 const session = await lucia.createSession(existUser.id, {});
 const sessionCookie = lucia.createSessionCookie(session.id);
 cookies().set(
  sessionCookie.name,
  sessionCookie.value,
  sessionCookie.attributes
 );
 return redirect("/authorized");
}
