import { randomUUID } from "crypto";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users-schema";

export const sessions = sqliteTable("sessions", {
    sessionId: text("session_id").primaryKey().$defaultFn(randomUUID),
    userId: integer("user_id").notNull().references(() => users.userId, {onDelete: "cascade"}),
    ipAddress: text("ip_address"),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
    expiresAt: text("expires_at"),
    revoked: integer("revoked", { mode: "boolean" })
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.userId]
    })
}))

export type Session = typeof sessions.$inferSelect;