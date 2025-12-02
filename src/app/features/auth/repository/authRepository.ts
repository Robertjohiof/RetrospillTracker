import { getDatabase, type Database } from "@/db";
import {CreateUser, SafeUser, User, users} from "@/db/schema";
import {eq} from "drizzle-orm";
import {createErrorResponse, createSuccessResponse} from "@/app/shared/lib/response";

export interface AuthRepository {
    findUserByUsername(username: string): Promise<Response>
    findUserByEmail(email: string): Promise<Response>
    findUserById(id: number): Promise<Response>
    createUser(data: CreateUser): Promise<Response>
    updateLastLogin(userId: number): Promise<Response>
}

export function createAuthRepository(database: Database): AuthRepository {
    return {
        async findUserByUsername(username: string) {
            try {
                const response = await database
                    .select()
                    .from(users)
                    .where(eq(users.userName, username))
                    .limit(1);

                return createSuccessResponse<User|null>(response[0] || null)
            }catch (error){
                return createErrorResponse("Failed to find user", error.status)
            }
        },

        async findUserByEmail(email: string) {
            try {
                const response = await database
                    .select()
                    .from(users)
                    .where(eq(users.email, email))
                    .limit(1);

                return createSuccessResponse<User|null>(response[0] || null)
            }catch (error){
                return createErrorResponse("Failed to find user", error.status)
            }
        },

        async findUserById(id: number) {
            try {
                const response = await database
                    .select()
                    .from(users)
                    .where(eq(users.userId,id))
                    .limit(1);

                return createSuccessResponse<User|null>(response[0] || null)
            }catch (error){
                return createErrorResponse("Failed to find user", error.status)
            }
        },

        async createUser(data: CreateUser){
            try{
                const [newUser] = await database
                    .insert(users)
                    .values(data)
                    .returning({
                        userId: users.userId,
                        userName: users.userName,
                        slug: users.slug,
                        email: users.email,
                        firstName: users.firstName,
                        lastName: users.lastName,
                        profilePicture: users.profilePicture,
                        profileBanner: users.profileBanner,
                        biography: users.biography,
                        isActive: users.isActive,
                        lastLoginAt: users.lastLoginAt,
                        createdAt: users.createdAt,
                        updatedAt: users.updatedAt,
                        roleId: users.roleId,
                    });

                return createSuccessResponse<SafeUser>(newUser);
            } catch (error){
                return createErrorResponse("Failed to create user", error.status)
            }
        },

        async updateLastLogin(userId: number) {
            try {
                await database
                    .update(users)
                    .set({ lastLoginAt: new Date() })
                    .where(eq(users.userId, userId));

                return createSuccessResponse<void>(undefined);
            } catch (error){
                return createErrorResponse("Failed to update last login", error.status)
            }
        }
    }
}

export const authRepository = createAuthRepository(await getDatabase());