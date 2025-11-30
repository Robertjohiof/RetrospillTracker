import { sqliteTable, integer, text, index } from "drizzle-orm/sqlite-core";
import { users } from "./users-schema";
import { relations, sql } from "drizzle-orm";
import { tagsToCollections } from "./tagsToCollections-schema";
import {collectionEntries} from "@/db/schema/collectionEntries-schema";

export const collections = sqliteTable("collections", {
    collectionId: integer("collection_id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.userId, { onDelete: "cascade" }),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    isBacklog: integer("is_backlog", { mode: 'boolean' }).notNull(),
    isPublic: integer("is_public", { mode: 'boolean' }).notNull(),
    name: text("name"),
    likes: integer("likes").default(0),
    description: text("description")
}, 
(table) => [
    index("collection_id").on(table.collectionId)
]
);

export const collectionsRelations = relations(collections, ({ one, many }) => ({
    user: one(users, {
       fields: [collections.userId],
       references: [users.userId] 
    }),
    tagsToCollection: many(tagsToCollections),
    collectionEntries: many(collectionEntries),
}));

export type Collection = typeof collections.$inferSelect;