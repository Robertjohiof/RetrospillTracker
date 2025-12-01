// src/db/schema/user-schema.ts
import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";
import { roles } from "./roles-schema";
import { collections } from "./collections-schema";
import { sessions } from "./sessions-schema";
import { reviews } from "./reviews-schema";


export const users = sqliteTable("users", {
  userId: integer("user_id").primaryKey(),
  userName: text("user_name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profilePicture: text("profile_picture"),
  profileBanner: text("profile_banner"),
  biography: text("biography"),
  isActive: integer("is_active", { mode: 'boolean' }).notNull(),
        lastLoginAt: integer("last_login_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdateFn(
        () => new Date()
    ),
  roleId: integer("role_id")
    .notNull()
    .references(() => roles.id)
},

(table) => [
  uniqueIndex("user_idx").on(table.userId),
  uniqueIndex("user_slugx").on(table.slug)
]);

export const userRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),

  collections: many(collections),
  reviews: many(reviews),
  sessions: many(sessions)
}))


export type CreateUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type SafeUser = Omit<User, "passwordHash">