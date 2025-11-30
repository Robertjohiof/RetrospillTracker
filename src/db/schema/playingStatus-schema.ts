import { relations } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { collectionEntries } from "./collectionEntries-schema";

export const playingStatus = sqliteTable("playing_status", {
    statusId: integer("status_id").primaryKey(),
    status: text("status").notNull().unique()
});

export const playingStatusRelations = relations(playingStatus, ({ many }) => ({
    collectionEntry: many(collectionEntries)
}));

export type PlayingStatus = typeof playingStatus.$inferSelect;