import {error, ErrorCode} from "@/app/shared/types/errors";
import {pagination} from "@/app/shared/lib/response"

export type Success<T> = {
    success: true,
    data: T,
    pagination?: pagination
}
export type Failure = {
    success: false,
    error: error,
}
export type Result<T> = Success<T> | Failure

export type ResultFunction = {
    success: <T>(data: T, pagination?: pagination) => Success<T>,
    failure: (error: unknown, code: ErrorCode) => Failure,
}

