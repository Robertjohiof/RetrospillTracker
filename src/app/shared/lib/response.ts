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