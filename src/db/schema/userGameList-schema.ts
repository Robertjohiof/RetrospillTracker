import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { users } from "./user-schema";

export const userGameList = sqliteTable("user_games_list", {
    id: int().primaryKey({ autoIncrement: true }).notNull(),
    userId: text().notNull().references(() => users.id)
})