import {createErrorResponse, createSuccessResponse} from "@/app/shared/lib/response"
import {Session, sessions, users, User} from "@/db/schema";
import {getDatabase} from "@/db";
import type {SafeUser} from "@/db/schema/users-schema"
import {nanoid} from "nanoid";
import {SESSION_COOKIE_NAME, SESSION_DURATION} from "@/app/shared/config/sessionConstants";
import {and, eq, gt, lt} from "drizzle-orm";
import {Result} from "@/app/shared/types/result";
import {Errors} from "@/app/shared/types/errors";
import {ResultHandler} from "@/app/shared/lib/result";

export async function createSession(userId: number): Promise<Result<Session>> {
    try {
        const database = await getDatabase();
        const sessionId = nanoid();
        const expiresAt = new Date(Date.now() + SESSION_DURATION);

        const [session] = await database.insert(sessions).values({
            sessionId: sessionId,
            userId,
            expiresAt
        }).returning()

        return ResultHandler.success(session)
    } catch (error) {
        return ResultHandler.failure("Failed to create session", Errors.INTERNAL_SERVER_ERROR)
    }
}

export async function getSession(sessionId:string): Promise<Result<{ session: Session, user: SafeUser}|null>> {
    try {
        const database = await getDatabase();
        const response = await database.select({
            session: sessions,
            user: {
                userName: users.userName,
                slug: users.slug,
                email: users.email,
                firstName: users.firstName,
                lastName: users.lastName,
                profilePicture: users.profilePicture,
                profileBanner: users.profileBanner,
                biography: users.biography,
                userId: users.userId,
                isActive: users.isActive,
                lastLoginAt: users.lastLoginAt,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt,
                roleId: users.roleId,
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
            return ResultHandler.success(null)
        }

        const { session, user } = response[0];

        await database
            .update(users)
            .set({ lastLoginAt: new Date() })
            .where(eq(users.userId, user.userId))

        return ResultHandler.success({ session, user })
    } catch (error) {
        return ResultHandler.failure("Failed to get session", Errors.INTERNAL_SERVER_ERROR)
    }
}

export async function deleteSession(sessionId:string): Promise<Result<void>> {
    try{
        const database = await getDatabase();

        await database.delete(sessions).where(eq(sessions.sessionId, sessionId))

        return ResultHandler.success(undefined)
    } catch (error) {
        return ResultHandler.failure("Failed to delete session", Errors.INTERNAL_SERVER_ERROR)
    }
}

export async function cleanupExpiredSessions(): Promise<Result<number>> {
    try {
        const database = await getDatabase();

        const deleted = await database
            .delete(sessions)
            .where(lt(sessions.expiresAt, new Date()))
            .returning({ sessionId: sessions.sessionId });

        return ResultHandler.success(deleted.length)
    } catch (error) {
        return ResultHandler.failure("Failed to clean up sessions", Errors.INTERNAL_SERVER_ERROR)
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