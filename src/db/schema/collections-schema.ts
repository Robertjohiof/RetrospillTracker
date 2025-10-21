import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { users } from "./users-schema";
import { relations, sql } from "drizzle-orm";
import { tagsToCollections } from "./tagsToCollections-schema";

export const collections = sqliteTable("collections", {
    collectionId: integer("collection_id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.userId, { onDelete: "cascade" }),
    createdAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    isBacklog: integer("is_backlog", { mode: 'boolean' }).notNull(),
    isPublic: integer("is_public", { mode: 'boolean' }).notNull(),
    name: text("name"),
    likes: integer("likes").default(0),
    description: text("description")
});

export const collectionsRelations = relations(collections, ({ one, many }) => ({
    user: one(users, {
       fields: [collections.userId],
       references: [users.userId] 
    }),
    tagsToCollection: many(tagsToCollections)
}));

export type Collection = typeof collections.$inferSelect;