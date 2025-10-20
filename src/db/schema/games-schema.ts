import { relations } from "drizzle-orm"
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core"
import { gamesToDeveloper } from "./gamesToDeveloper-schema"


export const games = sqliteTable("games", {
    id: int().primaryKey({ autoIncrement: true }).notNull(),
    name: text().notNull(),
})

export const gamesRelations = relations(games, ({ many }) => ({
    gamesToDeveloper: many(gamesToDeveloper)
}))

export type Game = typeof games.$inferSelect;