const baseHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
}

interface pagination{
    limit: number;
    page: number;
    pages: number;
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}



const Errors = {
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    NOT_FOUND: "NOT_FOUND",
    BAD_REQUEST: "BAD_REQUEST",
    FORBIDDEN: "FORBIDDEN",
    NOT_UNIQUE: "NOT_UNIQUE",
    RATE_LIMITED: "RATE_LIMITED",
    METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
    UNAUTHORIZED: "UNAUTHORIZED",
    NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
} as const;

export type ErrorCode = keyof typeof Errors;

interface error{
    error: ErrorCode;
    message: string;
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