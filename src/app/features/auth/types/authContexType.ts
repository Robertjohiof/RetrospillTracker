import {LoginCredentials, RegisterCredentials} from "@features/auth/types/credentials";
import {User, SafeUser} from "@/db/schema/users-schema"
import {Session} from "@/db/schema/sessions-schema"

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

export type AuthContext = {
    user: SafeUser | null,
    session: Session | null,
}