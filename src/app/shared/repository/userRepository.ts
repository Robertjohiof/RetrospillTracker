import { User, users } from '@/db/schema';
import { db } from '@/db';
import { createSuccessResponse } from '../lib/response';

export async function fetchAllUsers():Promise<Response> {
        const results = await db.select().from(users);
        
        return createSuccessResponse(results);
}