import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { users } from "./users-schema";
import { games } from "./games-schema";
import { relations, sql } from "drizzle-orm";

export const reviews = sqliteTable("reviews", {
    reviewId: integer("review_id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.userId),
    gameId: integer("game_id").notNull().references(() => games.gameId, { onDelete: "cascade"}),
    title: text("title"),
    score: integer("score").notNull(),
    description: text("review_description"),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`)
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
    user: one(users, {
        fields: [reviews.userId],
        references: [users.userId]
    }),
    game: one(games, {
        fields: [reviews.gameId],
        references: [games.gameId]
    })
}))

export type Review = typeof reviews.$inferSelect;