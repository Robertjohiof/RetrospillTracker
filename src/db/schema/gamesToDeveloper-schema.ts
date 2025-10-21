import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { games } from "./games-schema";
import { developers } from "./developers-schema";
import { relations } from "drizzle-orm";

export const gamesToDevelopers = sqliteTable("games_to_developers", {
    gameId: integer().primaryKey().references(() => games.gameId),
    developerId: integer().primaryKey().notNull().references(() => developers.developerId),
},
(table) => [
    primaryKey({ columns: [table.gameId, table.developerId] })
]);

export const gamesToDevelopersRelations = relations(gamesToDevelopers, ({ one }) => ({
    game: one(games, {
        fields: [gamesToDevelopers.gameId],
        references: [games.gameId]
    }),
    developer: one(developers, {
        fields: [gamesToDevelopers.developerId],
        references: [developers.developerId]
    })
}));

export type GamesToDeveloper = typeof gamesToDevelopers.$inferSelect;