import { relations } from "drizzle-orm";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { gamesToDeveloper } from "./gamesToDeveloper-schema";

export const developer = sqliteTable("developers", {
    id: int().primaryKey().notNull(),
    name: text().notNull(),
});

export const developersRelations = relations(developer, ({ many }) => ({
    gamesToDeveloper: many(gamesToDeveloper)
}));

