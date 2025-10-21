// src/db/schema/user-schema.ts
import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { roles } from "./roles-schema";
import { collections } from "./collections-schema";
import { sessions } from "./sessions-schema";
import { reviews } from "./reviews-schema";


export const users = sqliteTable("users", {
  userId: integer("user_id").primaryKey(),
  userName: text("user_name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profilePicture: text("profile_picture"),
  profileBanner: text("profile_banner"),
  biography: text("biography"),
  isActive: integer({ mode: 'boolean' }).notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  roleId: integer("role_id")
    .notNull()
    .references(() => roles.id)
});

export const userRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),

  collections: many(collections),
  reviews: many(reviews),
  sessions: many(sessions)
}))



export type User = typeof users.$inferSelect;