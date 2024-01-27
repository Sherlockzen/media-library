import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "./db/db";
import { sessionTable, userTable } from "./db/schema";

export const adapter = new DrizzlePostgreSQLAdapter(
 db,
 sessionTable,
 userTable
);

export const lucia = new Lucia(adapter, {
 sessionCookie: {
  // this sets cookies with super long expiration
  // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
  expires: false,
  attributes: {
   // set to `true` when using HTTPS
   secure: process.env.NODE_ENV === "production",
  },
 },
});

// IMPORTANT!
declare module "lucia" {
 interface Register {
  Lucia: typeof lucia;
  DatabaseUserAttributes: DatabaseUserAttributes;
 }
}

interface DatabaseUserAttributes {
 username: string;
}
