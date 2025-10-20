import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { games } from "./games-schema";
import { developer } from "./developer-schema";

export const gamesToDeveloper = sqliteTable("gamesToDeveloper", {
    gamesId: int().primaryKey({ autoIncrement: true }).notNull().references(() => games.id),
    developerId: int().primaryKey({ autoIncrement: true }).notNull().references(() => developer.id),
});