import { relations, sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { gamesToGenres } from "./gamesToGenres-schema";

export const genres = sqliteTable("genres", {
    genreId: integer("genre_id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    apiKey: text("api_key"),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`)
});

export const genresRelations = relations(genres, ({ many }) => ({
    gamesToGenre: many(gamesToGenres)
}));

export type Genre = typeof genres.$inferSelect;