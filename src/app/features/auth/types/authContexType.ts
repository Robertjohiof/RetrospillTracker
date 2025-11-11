import {LoginCredentials, RegisterCredentials} from "@features/auth/types/credentials";

export type AuthContexType = {
    user: User|null,
    login: (loginCredentials: LoginCredentials) => Promise<void>,
    logout: () => Promise<void>,
    register: (registerCredentials:RegisterCredentials) => Promise<void>,
    authError: string|null,
    isLoading: boolean,
    isLoggedIn: boolean,
    isLoaded: boolean,
}