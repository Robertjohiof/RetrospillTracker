import { User, users } from '@/db/schema';
import { db } from '@/db';
import { createSuccessResponse } from '../lib/response';
import { eq } from 'drizzle-orm';

export async function fetchAllUsers():Promise<Response> {
        const results = await db.select().from(users);
        
        return createSuccessResponse(results);
}

export async function fetchUserById(id: number):Promise<Response> {
        const results = await db.select().from(users).where(eq(users.userId, id));

        return createSuccessResponse(results);
}