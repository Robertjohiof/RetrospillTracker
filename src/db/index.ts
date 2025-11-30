// src/db/index.ts
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import {createRemoteAdapter, queryRemoteD1} from "@/db/lib/d1-proxy-server";
import * as schema from "./schema";

const USE_REMOTE_PROXY = process.env.USE_REMOTE_DB === 'true';


let dbInstance: DrizzleD1Database<typeof schema> | null = null;

async function getWorkerEnv(): Promise<D1Database> {
    try {
        const { env } = await import("cloudflare:workers");

        if (!env || !env.DB) {
            throw new Error("D1 database instance not found in worker environment");
        }

        return env.DB as D1Database;

    } catch (error) {
        throw new Error(
            "Failed to get D1 database instance from worker environment"
        );
    }
}

export async function getDatabase(): Promise<DrizzleD1Database<typeof schema>> {
    if (dbInstance) {
        return dbInstance;
    }
    if (USE_REMOTE_PROXY) {
        dbInstance = drizzle(createRemoteAdapter(), { schema });
    }
    else {
        dbInstance = drizzle(await getWorkerEnv(), { schema });
    }

    return dbInstance;
}

export type Database = DrizzleD1Database<typeof schema>;
export const db = await getDatabase();