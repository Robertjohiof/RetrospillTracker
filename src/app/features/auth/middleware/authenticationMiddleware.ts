import type { AppContext } from "@/worker"
import { extractSessionFromCookies, getSession } from "@features/auth/util/session";

export async function authenticationMiddleware({
    ctx,
    request,
                                               }:{
    ctx:AppContext,
    request:Request,
}) {
    ctx.user = null
    ctx.session = null

    try {
        const cookies = request.headers.get("cookie")
        if (!cookies) {
            return
        }

        const sessionId = extractSessionFromCookies(cookies)
        if (!sessionId) {
            return
        }

        const sessionResult = await getSession(sessionId)
        if (!sessionResult.success || !sessionResult.data) {
            return
        }

        const { session, user } = sessionResult.data

        ctx.user = user
        ctx.session = session
    } catch (error) {
        ctx.user = null
        ctx.session = null
    }
}