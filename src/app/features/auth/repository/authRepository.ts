import { getDatabase, type Database } from "@/db";
import {CreateUser, SafeUser, User, users} from "@/db/schema";
import {eq} from "drizzle-orm";
import {createErrorResponse, createSuccessResponse} from "@/app/shared/lib/response";
import {ResultHandler} from "@/app/shared/lib/result";
import {Errors} from "@/app/shared/types/errors";
import {Result} from "@/app/shared/types/result";

export interface AuthRepository {
    findUserByUsername(username: string): Promise<Result<User|null>>
    findUserByEmail(email: string): Promise<Result<User|null>>
    findUserById(id: number): Promise<Result<User|null>>
    createUser(data: CreateUser): Promise<Result<SafeUser>>
    updateLastLogin(userId: number): Promise<Result<void>>
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

                return ResultHandler.success(response[0] || null)
            }catch (error){
                return ResultHandler.failure("Failed to find user", Errors.INTERNAL_SERVER_ERROR)
            }
        },

        async findUserByEmail(email: string) {
            try {
                const response = await database
                    .select()
                    .from(users)
                    .where(eq(users.email, email))
                    .limit(1);

                return ResultHandler.success(response[0] || null)
            }catch (error){
                return ResultHandler.failure("Failed to find user", Errors.INTERNAL_SERVER_ERROR)
            }
        },

        async findUserById(id: number) {
            try {
                const response = await database
                    .select()
                    .from(users)
                    .where(eq(users.userId,id))
                    .limit(1);

                return ResultHandler.success(response[0] || null)
            }catch (error){
                return ResultHandler.failure("Failed to find user", Errors.INTERNAL_SERVER_ERROR)
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

                return ResultHandler.success(newUser);
            } catch (error){
                return ResultHandler.failure("Failed to create user", Errors.INTERNAL_SERVER_ERROR)
            }
        },

        async updateLastLogin(userId: number) {
            try {
                await database
                    .update(users)
                    .set({ lastLoginAt: new Date() })
                    .where(eq(users.userId, userId));

                return ResultHandler.success(undefined);
            } catch (error){
                return ResultHandler.failure("Failed to update last login", Errors.INTERNAL_SERVER_ERROR)
            }
        }
    }
}

export const authRepository = createAuthRepository(await getDatabase());