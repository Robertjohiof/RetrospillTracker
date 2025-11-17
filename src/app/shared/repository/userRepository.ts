import { User, users } from '@/db/schema';
import { db } from '@/db';
import {createErrorResponse, createSuccessResponse} from '../lib/response';
import { eq } from 'drizzle-orm';

export async function fetchAllUsers():Promise<Response> {
        const results = await db.query.users.findMany();

        return createSuccessResponse(results);
}

export async function fetchUserById(id: number):Promise<Response> {
        const results = await db.query.users.findMany({
            where: eq(users.userId, id),
        })

        if (results.length < 1) {
            return createErrorResponse("User not found", 404)
        }

        return createSuccessResponse(results);
}