import {LoginCredentials, RegisterCredentials} from "@features/auth/types/credentials";
import {AuthRepository} from "@features/auth/repository/authRepository";
import {createSession} from "@features/auth/util/session";

export interface AuthService {
    register(
        credentials: RegisterCredentials
    ): Promise<Response>
    login(
        credentials: LoginCredentials
    ): Promise<Response>
    logout(
        sessionId: string
    ): Promise<Response>
    createAdminUser(
        credentials: RegisterCredentials
    ): Promise<Response>
    currentUser(
        userId: number
    ): Promise<Response>
}

export function createAuthService(authRepository: AuthRepository): AuthService {
    const createUserSession = async (userId: number) => {
        const sessionResult = await createSession(userId)
    }
}