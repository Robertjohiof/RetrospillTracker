import {sql, relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { gamesToDevelopers } from "./gamesToDeveloper-schema";

export const developers = sqliteTable("developers", {
    developerId: integer("developer_id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const developersRelations = relations(developers, ({ many }) => ({
    gamesToDeveloper: many(gamesToDevelopers)
}));

