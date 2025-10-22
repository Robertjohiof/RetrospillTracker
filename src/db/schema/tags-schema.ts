import { relations } from "drizzle-orm";
import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { tagsToCollections } from "./tagsToCollections-schema";

export const tags = sqliteTable("tags", {
    tagSlug: text("tag_slug").primaryKey().notNull(),
    tagName: text("tag_name")
},
(table) => [
    uniqueIndex("tag_slugx").on(table.tagSlug)
]
);

export const tagsRelations = relations(tags, ({ many }) => ({
    tagsToCollection: many(tagsToCollections)
}));

export type Tag = typeof tags.$inferSelect;