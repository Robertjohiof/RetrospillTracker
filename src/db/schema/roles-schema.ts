import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

import { users } from "./users-schema";

export const roles = sqliteTable("roles", {
  id: integer("id").primaryKey(),
  roleName: text("role_name").notNull().unique()
});

export const rolesRelations = relations(roles, ({ many }) => ({
    users: many(users)
}));

 
export type Role = typeof roles.$inferSelect;
