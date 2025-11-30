import {db} from "@/db";
import {and, eq} from "drizzle-orm";
import {collectionEntries, collections, users} from "@/db/schema";
import {createSuccessResponse} from "@/app/shared/lib/response";

export async function fetchCollectionsByUser(userId: number, isBacklog: boolean = false): Promise<Response> {

    const results = await db.query.collections.findMany({
        where: and(
            eq(users.userId, userId),
            eq(collections.isBacklog, isBacklog)
        ),
        with: {
            tagsToCollection: true,
            collectionEntries: {
                columns: {
                   gameId: true
                }
            }
        },
    });

    return createSuccessResponse(results);
}