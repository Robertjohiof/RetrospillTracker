import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { games } from "./games-schema";
import { collections } from "./collections-schema";
import { playingStatus } from "./playingStatus-schema";
import { relations, sql } from "drizzle-orm";

export const collectionEntries = sqliteTable("collection_entries", {
    entryId: integer("entry_id").primaryKey(),
    gameId: integer("game_id").notNull().references(() => games.gameId, { onDelete: "cascade" }),
    collectionId: integer("collection_id").notNull().references(() => collections.collectionId, {onDelete: "cascade"}),
    statusId: integer("status").references(() => playingStatus.statusId),
    score: integer("score"),
    priority: integer("priority"),
    playTime: integer("play_time"),
    finishedAt: text("finished_at")
});


export const collectionEntriesRelations = relations(collectionEntries, ({ one }) => ({
    collection: one(collections, {
       fields: [collectionEntries.collectionId],
       references: [collections.collectionId] 
    }),
    game: one(games, {
        fields: [collectionEntries.gameId],
        references: [games.gameId]
    }),
    status: one(playingStatus, {
        fields: [collectionEntries.statusId],
        references: [playingStatus.statusId]
    })
}))


export type CollectionEntry = typeof collectionEntries.$inferSelect;