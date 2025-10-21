import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const platforms = sqliteTable("platforms", {
    platformId: integer("platform_id").primaryKey(),
    name: text("name").notNull(),
    manufacturer: text("manufacturer"),
    slug: text("name").notNull().unique(),
    releaseYear: text("release_year"),
    apiKey: text("api_key"),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`)
});


export type Platform = typeof platforms.$inferSelect;