import {createErrorResponse, createSuccessResponse, Errors, Result} from "@/app/shared/lib/response"
import {Session, sessions, users, User} from "@/db/schema";
import {getDatabase} from "@/db";
import type {SafeUser} from "@/db/schema/users-schema"
import {nanoid} from "nanoid";
import {SESSION_COOKIE_NAME, SESSION_DURATION} from "@/app/shared/config/sessionConstants";
import {and, eq, gt, lt} from "drizzle-orm";

export async function createSession(userId: number): Promise<Response> {
    try {
        const database = await getDatabase();
        const sessionId = nanoid();
        const expiresAt = new Date(Date.now() + SESSION_DURATION);

        const [session] = await database.insert(sessions).values({
            sessionId: sessionId,
            userId,
            expiresAt
        }).returning()

        return createSuccessResponse<Session>(session)
    } catch (error) {
        return createErrorResponse(error.message, error.status)
    }
}

export async function getSession(sessionId:string): Promise<Response> {
    try {
        const database = await getDatabase();
        const response = await database.select({
            session: sessions,
            user: {
                userId: users.userId,
                userName: users.userName,
                slug: users.slug,
                email: users.email,
                isActive: users.isActive,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt
            },
        }).from(sessions)
            .innerJoin(users, eq(sessions.userId, users.userId))
            .where(
                and(
                    eq(sessions.sessionId, sessionId),
                    gt(sessions.expiresAt, new Date()),
                    eq(users.isActive, true)
                )
            )
            .limit(1);

        if(response.length === 0) {
            return createSuccessResponse<null>(null)
        }

        const { session, user } = response[0];

        await database
            .update(users)
            .set({ lastLoginAt: new Date() })
            .where(eq(users.userId, user.userId))

        return createSuccessResponse<{session: Session, user: Partial<SafeUser>}>({ session, user })
    } catch (error) {
        return createErrorResponse("Failed to get session", error.status)
    }
}

export async function deleteSession(sessionId:string): Promise<Response> {
    try{
        const database = await getDatabase();

        await database.delete(sessions).where(eq(sessions.sessionId, sessionId))

        return createSuccessResponse<undefined>(undefined)
    } catch (error) {
        return createErrorResponse("Failed to delete session", error.status)
    }
}

export async function cleanupExpiredSessions(): Promise<Response> {
    try {
        const database = await getDatabase();

        const deleted = await database
            .delete(sessions)
            .where(lt(sessions.expiresAt, new Date()))
            .returning({ sessionId: sessions.sessionId });

        return createSuccessResponse<number>(deleted.length)
    } catch (error) {
        return createErrorResponse("Failed to clean up sessions", error.status)
    }
}

export function getSessionCookieOptions(){
    return{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_DURATION / 1000,
        path: "/",
    }
}

export function extractSessionFromCookies(cookieHeader: string): string | null {
    const cookies = cookieHeader.split(";").map((cookie)=>cookie.trim())

    for (const cookie of cookies) {
        const [name, value] = cookie.split("=")
        if (name === SESSION_COOKIE_NAME){
            return decodeURIComponent(value)
        }
    }

    return null;
}

export function setSessionCookie(sessionId:string):string{
    const options = getSessionCookieOptions();

    const baseCookie = [
        `${SESSION_COOKIE_NAME}=${encodeURIComponent(sessionId)}`,
        `Max-Age=${options.maxAge}`,
        `Path=${options.path}`,
        `SameSite=${options.sameSite}`
    ]

    if (options.httpOnly) baseCookie.push("HttpOnly")
    if (options.secure) baseCookie.push("Secure")

    return baseCookie.join(";")
}

export function clearSessionCookie(): string {
    const options = getSessionCookieOptions();

    const baseCookie = [
        `${SESSION_COOKIE_NAME}=; Max-Age=0`,
        `Path=${options.path}`,
        `SameSite=${options.sameSite}`,
    ]

    if (options.httpOnly) baseCookie.push("HttpOnly")
    if (options.secure) baseCookie.push("Secure")

    return baseCookie.join(";")
}