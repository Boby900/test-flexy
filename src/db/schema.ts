import { pgTable, serial, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

export const userTable = pgTable("user", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey().notNull(),
    email: text("email").unique(),
    password: text("password"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
  });
  
  export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  });


export const ipFailureTable = pgTable("ip", {
    id: serial('id').primaryKey(),
    reason: text("reason"), // Reason for failure
    ip_address: text("ip_address").notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  });



  export type User = InferSelectModel<typeof userTable>;
  export type Session = InferSelectModel<typeof sessionTable>;
