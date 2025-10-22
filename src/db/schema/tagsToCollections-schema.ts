import { sqliteTable, text, integer, PrimaryKey, primaryKey } from "drizzle-orm/sqlite-core";
import { collections } from "./collections-schema";
import { tags } from "./tags-schema";
import { relations } from "drizzle-orm";

export const tagsToCollections = sqliteTable("tags_to_collections", {
    tagSlug: text("tag_slug").notNull().references(() => tags.tagSlug, { onDelete: "cascade" }),
    collctionId: integer("collection_id").notNull().references(() => collections.collectionId, { onDelete: "cascade" })
},
(table) => [
    primaryKey({ columns: [table.tagSlug, table.collctionId] })
]
);

export const tagsToCollectionsRelations = relations(tagsToCollections, ({ one }) => ({
    collection: one(collections, {
        fields: [tagsToCollections.collctionId],
        references: [collections.collectionId]
    }),
    tag: one(tags, {
        fields: [tagsToCollections.tagSlug],
        references: [tags.tagSlug]
    })
}));

export type TagsToCollection = typeof tagsToCollections.$inferSelect;