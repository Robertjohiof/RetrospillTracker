import { z } from "zod"

export const LoginDTOSchema = z.object({
    userName: z.string().min(3).max(30),
    password: z.string().min(8),
})

export const RegisterDTOSchema = z.object({
    firstName: z.string().min(3).max(35),
    lastName: z.string().min(3).max(35),
    userName: z.string().min(3).max(30),
    password: z.string().min(8),
    email: z.email(),
    biography: z.string().min(0).max(250).nullable(),
    profilePicture: z.string().min(0).max(2000).nullable(),
    profileBanner: z.string().min(0).max(2000).nullable(),
})

export const UserDTOSchema = z.object({
    userId: z.coerce.number(),
    userName: z.string(),
    slug: z.string(),
    email: z.string(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    profilePicture: z.string().nullable(),
    profileBanner: z.string().nullable(),
    biography: z.string().nullable(),
    isActive: z.boolean(),
    lastLoginAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    roleId: z.number(),
})

export const SessionDTOSchema = z.object({
    sessionId: z.string(),
    userId: z.coerce.number(),
    ipAddress: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    expiresAt: z.date(),
    revoked: z.boolean().nullable(),
})

export const AuthResponseDTOSchema = z.object({
    user: UserDTOSchema,
    session: SessionDTOSchema,
})

export type LoginDTO = z.infer<typeof LoginDTOSchema>
export type RegisterDTO = z.infer<typeof RegisterDTOSchema>
export type UserDTO = z.infer<typeof UserDTOSchema>
export type SessionDTO = z.infer<typeof SessionDTOSchema>
export type AuthResponseDTO = z.infer<typeof AuthResponseDTOSchema>