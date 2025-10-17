// src/db/schema/user-schema.ts
import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { roles } from "./roles-schema";


export const users = sqliteTable("users", {
  id: text().primaryKey().unique(),
  name: text().notNull(),
  email: text().notNull().unique(),
  profilePicture: text("profile_picture"),
  biography: text(),
  isActive: int({ mode: 'boolean' }).notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  roleId: int("role_id")
    .notNull()
    .references(() => roles.id)
});

export const userRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  })
}))



export type User = typeof users.$inferSelect;