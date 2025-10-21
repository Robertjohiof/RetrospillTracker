import { randomUUID } from "crypto";
import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users-schema";

export const sessions = sqliteTable("sessions", {
    sessionId: text("session_id").primaryKey().$defaultFn(randomUUID),
    userId: integer("user_id").notNull().references(() => users.userId, {onDelete: "cascade"}),
    ipAddress: text("ip_address"),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
    expiresAt: integer("expires_at", { mode: "timestamp" }),
    revoked: integer("revoked", { mode: "boolean" })
}
, (table) => [
    uniqueIndex("session_idx").on(table.sessionId)
]
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.userId]
    })
}));

export type Session = typeof sessions.$inferSelect;