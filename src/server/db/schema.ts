import { pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";

export const pgTable = pgTableCreator((name) => `midia-library_${name}`);

export const userTable = pgTable("user", {
 id: text("id").primaryKey(),
 username: text("username").notNull(),
 password: text("password").notNull(),
});

export const sessionTable = pgTable("session", {
 id: text("id").primaryKey(),
 userId: text("user_id")
  .notNull()
  .references(() => userTable.id),
 expiresAt: timestamp("expires_at", {
  withTimezone: true,
  mode: "date",
 }).notNull(),
});
