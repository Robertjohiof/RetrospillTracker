import { relations } from "drizzle-orm"
import { sqliteTable, text, integer, index, uniqueIndex } from "drizzle-orm/sqlite-core"
import { gamesToDevelopers } from "./gamesToDeveloper-schema"
import { gamesToGenres } from "./gamesToGenres-schema"


export const games = sqliteTable("games", {
    gameId: integer("game_id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    apiKey: text("api_key").notNull(),
    description: text("description"),
    story: text("story"),
    coverImageUrl: text("cover_image_url"),
},
(table) => [
    index("games_title_idx").on(table.title),
    uniqueIndex("games_slug_x").on(table.slug)
]
);

export const gamesRelations = relations(games, ({ many }) => ({
    gamesToDeveloper: many(gamesToDevelopers),
    gamesToGenre: many(gamesToGenres),
}));

export type Game = typeof games.$inferSelect;