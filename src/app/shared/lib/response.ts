import {clearSessionCookie, setSessionCookie} from "@features/auth/util/session";
import {Errors} from "@/app/shared/types/errors";

const baseHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
}

export interface pagination{
    limit: number;
    page: number;
    pages: number;
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}



export function createSuccessResponse<T>(data:T, pagination?:pagination):Response {
    const response = {
        success: true,
        data,
        pagination,
    }
    return new Response(JSON.stringify(response), {
        status: 200,
        headers: baseHeaders,
    });
}

export function createErrorResponse(errorMessage:string, status:number):Response{
    const errorResponse={
        success: false,
        errorMessage
    }
    return new Response(JSON.stringify(errorResponse), {
        status,
        headers: baseHeaders,
    })
}

export function createCookieResponse(sessionId: string): Response {
    const cookie = setSessionCookie(sessionId);

    return new Response(null, {
        status: 200,
        headers: {
            "Set-Cookie": cookie,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    })
}

export function removeCookieResponse(): Response{
    const cookie = clearSessionCookie()
    return new Response(null, {
        status: 200,
        headers: {
            "Set-Cookie": cookie,
        }
    })
}

export function createAuthenticationResponse() {
    return new Response(
        JSON.stringify({
            success: false,
            error: {
                code: Errors.UNAUTHORIZED,
                message: "Authentication required",
            },
        }),
        {
            status: 401,
            headers: { "Content-Type": "application/json" },
        }
    );
}

export function createAuthorizationResponse() {
    return new Response(
        JSON.stringify({
            success: false,
            error: {
                code: Errors.FORBIDDEN,
                message: "Insufficient permissions",
            },
        }),
        {
            status: 403,
            headers: { "Content-Type": "application/json" },
        }
    );
}

