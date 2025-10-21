import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { games } from "./games-schema";
import { genres } from "./genres-schema";
import { relations } from "drizzle-orm";

export const gamesToGenres = sqliteTable("games_to_genres", {
    gameId: integer("game_id").primaryKey().references(() => games.gameId, { onDelete: "cascade" }),
    genreId: integer("genre_id").primaryKey().references(() => genres.genreId, { onDelete: "cascade" }),
});

export const gamesToGenresRelations = relations(gamesToGenres, ({ one }) => ({
    game: one(games, {
        fields: [gamesToGenres.gameId],
        references: [games.gameId]
    }),
    genre: one(genres, {
        fields: [gamesToGenres.genreId],
        references: [genres.genreId]
    })
}));

export type GamesToGenres = typeof gamesToGenres.$inferSelect;