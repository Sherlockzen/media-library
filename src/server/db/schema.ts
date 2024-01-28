import {
  integer,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const pgTable = pgTableCreator((name) => `midia-library_${name}`);

export const roleEnum = pgEnum("role", ["ADMIN", "USER"]);

export type databaseUser = typeof userTable._.inferSelect;

export const userTable = pgTable("user", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: roleEnum("role").default("USER"),
  quota: integer("quota").default(1000),
  used_quota: integer("used_quota").default(0),
});

export const userRelations = relations(userTable, ({ many }) => ({
  midias: many(midiaTable),
}));

export const midiaTable = pgTable("midia", {
  id: text("id").primaryKey(),
  owner_id: text("owner_id").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  size: integer("size").notNull(),
  type: text("type").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const midiasRelations = relations(midiaTable, ({ one }) => ({
  owner: one(userTable, {
    fields: [midiaTable.owner_id],
    references: [userTable.id],
  }),
}));

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
