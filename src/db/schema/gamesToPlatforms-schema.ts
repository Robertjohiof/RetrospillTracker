import { sqliteTable, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { games } from "./games-schema";
import { platforms } from "./platforms-schema";
import { relations } from "drizzle-orm";

export const gamesToPlatforms = sqliteTable("games_to_platforms", {
    gameId: integer("game_id").notNull().references(() => games.gameId, { onDelete: "cascade" }),
    platformId: integer("platform_id").notNull().references(() => platforms.platformId, { onDelete: "cascade" })
},
(table) => [
    primaryKey({ columns: [table.gameId, table.platformId] })
]
);

export const gamesToPlatformsRelations = relations(gamesToPlatforms, ({ one }) => ({
    game: one(games, {
        fields: [gamesToPlatforms.gameId],
        references: [games.gameId]
    }),
    platform: one(platforms, {
        fields: [gamesToPlatforms.platformId],
        references: [platforms.platformId]
    })
}));

export type GamesToPlatforms = typeof gamesToPlatforms.$inferSelect;