class ResponseError extends Error {
    public status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;

        Object.setPrototypeOf(this, ResponseError.prototype);
    }
}

export const Errors = {
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    NOT_FOUND: "NOT_FOUND",
    BAD_REQUEST: "BAD_REQUEST",
    FORBIDDEN: "FORBIDDEN",
    NOT_UNIQUE: "NOT_UNIQUE",
    RATE_LIMITED: "RATE_LIMITED",
    METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
    UNAUTHORIZED: "UNAUTHORIZED",
    NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
    VALIDATION_ERROR: "VALIDATION_ERROR",
    CONFLICT: "CONFLICT",
} as const;
export type ErrorCode = keyof typeof Errors;

export interface error {
    code: ErrorCode;
    message: string;
}