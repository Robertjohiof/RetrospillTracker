import {LoginCredentials, RegisterCredentials} from "@features/auth/types/credentials";
import {authRepository, AuthRepository} from "@features/auth/repository/authRepository";
import {createSession, deleteSession} from "@features/auth/util/session";
import {Errors} from "@/app/shared/types/errors";
import {ResultHandler} from "@/app/shared/lib/result";
import {SafeUser, Session} from "@/db/schema";
import {Result} from "@/app/shared/types/result"
import {LoginDTOSchema, RegisterDTOSchema} from "@features/auth/types/authDtos";
import {hashPassword, validatePasswordStrength, verifyPassword} from "@features/auth/util/password";
import {slugify} from "@/app/shared/utils/slugify";
import {mapUserToDTO} from "@features/auth/mappers/authMappers";

export interface AuthService {
    register(
        credentials: RegisterCredentials
    ): Promise<Result<{ user: SafeUser, session: Session}>>
    login(
        credentials: LoginCredentials
    ): Promise<Result<{ user: SafeUser, session: Session }>>
    logout(
        sessionId: string
    ): Promise<Result<void>>
    createAdminUser(
        credentials: RegisterCredentials
    ): Promise<Result<{ user: SafeUser, session: Session }>>
    currentUser(
        userId: number
    ): Promise<Result<SafeUser>>
}

export function createAuthService(authRepository: AuthRepository): AuthService {
    const createUserSession = async (userId: number) => {
        const sessionResult = await createSession(userId)
        if (!sessionResult.success) {
            throw new Error("Failed to create session")
        }
        return sessionResult.data
    }

    return {
        async currentUser(userId) {
            try {
                const userResult = await authRepository.findUserById(userId)
                if (!userResult.success) {
                    return ResultHandler.failure(
                        userResult.error,
                        Errors.INTERNAL_SERVER_ERROR,
                    )
                }
                if (!userResult.data) {
                    return ResultHandler.failure("User not found", Errors.NOT_FOUND)
                }
                return ResultHandler.success(userResult.data)
            } catch (error) {
                return ResultHandler.failure(
                    "Failed to fetch current user",
                    Errors.INTERNAL_SERVER_ERROR,
                )
            }
        },
        async register(credentials){
            try {
                const validation = RegisterDTOSchema.safeParse(credentials)
                if (!validation.success) {
                    return ResultHandler.failure(
                        `validation failed ${validation.error.message}`,
                        Errors.VALIDATION_ERROR,
                    )
                }

                const { userName, email, password } = validation.data

                const passwordValidation = validatePasswordStrength(password)
                if (!passwordValidation.isValid) {
                    return ResultHandler.failure(
                        passwordValidation.errors.join(", "),
                        Errors.VALIDATION_ERROR,
                    )
                }

                const existingUserByEmail = await authRepository.findUserByEmail(email)
                const existingUserByUsername = await authRepository.findUserByUsername(userName)

                if (!existingUserByEmail.success || !existingUserByUsername.success){
                    return ResultHandler.failure(
                        "Failed checking for existing users",
                        Errors.INTERNAL_SERVER_ERROR
                    )
                }

                if (existingUserByEmail.data || existingUserByUsername.data){
                    return ResultHandler.failure(
                        "User already exists",
                        Errors.CONFLICT,
                    )
                }

                const passwordHash = await hashPassword(password)

                const createUserResult = await authRepository.createUser({
                    userName,
                    email,
                    passwordHash,
                    roleId: 1,
                    slug: slugify(userName),
                    isActive: true,
                })

                if(!createUserResult.success){
                    return ResultHandler.failure(
                        createUserResult.error,
                        Errors.INTERNAL_SERVER_ERROR,
                    )
                }

                const newUser = createUserResult.data

                const session = await createUserSession(newUser.userId)

                return ResultHandler.success({
                    user: newUser,
                    session,
                })
            }catch (error){
                return ResultHandler.failure(
                    "Registration failed",
                    Errors.INTERNAL_SERVER_ERROR,
                )
            }
        },
        async login(credentials) {
            try {
                const validation = LoginDTOSchema.safeParse(credentials)

                if (!validation.success){
                    return ResultHandler.failure(
                        "Invalid username or password",
                        Errors.UNAUTHORIZED,
                    )
                }

                const { userName, password } = validation.data

                const userResult = await authRepository.findUserByUsername(userName)

                if (!userResult.success){
                    return ResultHandler.failure(
                        userResult.error,
                        Errors.INTERNAL_SERVER_ERROR,
                    )
                }

                if (!userResult.data){
                    return ResultHandler.failure(
                        "Invalid username or password",
                        Errors.UNAUTHORIZED,
                    )
                }

                const { userId, passwordHash, isActive } = userResult.data

                if (!isActive){
                    return ResultHandler.failure(
                        "The account is deactivated",
                        Errors.FORBIDDEN,
                    )
                }

                const isPasswordValid = await verifyPassword(password, passwordHash)

                if (!isPasswordValid) {
                    return ResultHandler.failure(
                        "Invalid username or password",
                        Errors.UNAUTHORIZED,
                    )
                }

                const session = await createUserSession(userId)

                const safeUser = mapUserToDTO(userResult.data)

                return ResultHandler.success({
                    user: safeUser,
                    session,
                })
            } catch (error) {
                return ResultHandler.failure(
                    "Login failed",
                    Errors.INTERNAL_SERVER_ERROR,
                )
            }
        },
        async logout(sessionId){
            return await deleteSession(sessionId)
        },
        async createAdminUser(credentials){
            try {
                const adminExist = await authRepository.findUserByUsername(
                    credentials.userName
                )

                if (!adminExist.success) {
                    return ResultHandler.failure(
                        adminExist.error,
                        Errors.INTERNAL_SERVER_ERROR,
                    )
                }

                if (adminExist.data) {
                    return ResultHandler.failure(
                        "User already exists",
                        Errors.CONFLICT,
                    )
                }

                const validation = RegisterDTOSchema.safeParse(credentials)

                if (!validation.success){
                    return ResultHandler.failure(
                        `validation failed ${validation.error.message}`,
                        Errors.VALIDATION_ERROR,
                    )
                }

                const { userName, email, password } = validation.data

                const passwordValidation = validatePasswordStrength(password)

                if (!passwordValidation.isValid) {
                    return ResultHandler.failure(
                        passwordValidation.errors.join(", "),
                        Errors.VALIDATION_ERROR,
                    )
                }

                const passwordHash = await hashPassword(password)

                const createUserResult = await authRepository.createUser({
                    userName,
                    email,
                    passwordHash,
                    roleId: 3,
                    slug: slugify(userName),
                    isActive: true,
                })

                if (!createUserResult.success){
                    return ResultHandler.failure(
                        createUserResult.error,
                        Errors.INTERNAL_SERVER_ERROR,
                    )
                }

                const session = await createUserSession(createUserResult.data.userId)

                return ResultHandler.success({
                    user: createUserResult.data,
                    session,
                })
            } catch (error) {
                return ResultHandler.failure(
                    "Failed to create admin user",
                    Errors.INTERNAL_SERVER_ERROR,
                )
            }
        }
    }
}

export const authService = createAuthService(authRepository)