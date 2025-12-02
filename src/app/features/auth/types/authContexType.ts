import {User, SafeUser} from "@/db/schema/users-schema"
import {Session} from "@/db/schema/sessions-schema"
import {ReactNode} from "react";

export type AuthContexType = {
    user: SafeUser|null,
    isAuthenticated: boolean,
    isAdmin: boolean,
    login: (user: SafeUser) => void,
    logout: () => void,
}

export type AuthContext = {
    user: SafeUser | null,
    session: Session | null,
}

export type AuthProviderProps = {
    children: ReactNode,
    initialUser: SafeUser | null,
}