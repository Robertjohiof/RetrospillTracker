import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { users } from "./schema/users-schema";
import { collectionEntries, collections, developers, games, gamesToDevelopers, gamesToGenres, gamesToPlatforms, genres, platforms, playingStatus, reviews, roles } from "./schema";
import { dbCollections, dbCollectionsEntries, dbDevelopers, dbGames, dbGamesToDevelopers, dbGamesToGenres, dbGamesToPlatforms, dbGenres, dbPlatforms, dbRoles, dbStatuses, dbUsers } from "@/app/data/dbTestData";

export async function runCustomSeed(db: D1Database) {
    const ctx = drizzle(db);
    return await addData(ctx);
}

export async function addData(db: DrizzleD1Database) {
    await db.delete(collectionEntries);
    await db.delete(collections);
    await db.delete(playingStatus);
    await db.delete(reviews);
    await db.delete(gamesToDevelopers);
    await db.delete(gamesToGenres);
    await db.delete(gamesToPlatforms);
    await db.delete(genres);
    await db.delete(developers);
    await db.delete(platforms);

    await db.delete(games);
    await db.delete(users);
    await db.delete(roles);

    await db.insert(roles).values(dbRoles);

    for (const obj of dbUsers) {
        await db.insert(users).values(obj);
    }

    for (const obj of dbDevelopers) {
        await db.insert(developers).values(obj);
    }

    for (const obj of dbGenres) {
        await db.insert(genres).values(obj);
    }

    for (const obj of dbPlatforms) {
        await db.insert(platforms).values(obj);
    }

    for (const game of dbGames) {
        await db.insert(games).values(game);
    }

    await db.insert(playingStatus).values(dbStatuses);

    for (const obj of dbGamesToDevelopers) {
        await db.insert(gamesToDevelopers).values(obj);
    }

    for (const obj of dbGamesToGenres) {
        await db.insert(gamesToGenres).values(obj);
    }

    for (const obj of dbGamesToPlatforms) {
        await db.insert(gamesToPlatforms).values(obj);
    }

    for (const obj of dbCollections) {
        await db.insert(collections).values(obj);
    }

    for (const obj of dbCollectionsEntries) {
        await db.insert(collectionEntries).values(obj);
    }
 
 const result = await db.select().from(users).all();
  return { ok: true, result, count: result.length };
}