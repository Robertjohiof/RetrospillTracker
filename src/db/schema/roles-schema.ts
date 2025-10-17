import { sql, relations } from "drizzle-orm";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

import { users } from "./user-schema";

export const roles = sqliteTable("roles", {
  id: int("id").primaryKey({ autoIncrement: true}),
  roleName: text("role_name").notNull().unique()
});

export const rolesRelations = relations(roles, ({ many }) => ({
    users: many(users)
}));

 
export type Role = typeof roles.$inferSelect;
