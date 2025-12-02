"use client"

import {createContext, use, useCallback, useState} from "react";
import {AuthContexType, AuthProviderProps} from "@features/auth/types/authContexType";
import {SafeUser, User} from "@/db/schema/users-schema"
import {navigate} from "rwsdk/client";

const AuthContext = createContext<AuthContexType | null>(null);

export default function AuthProvider({ children, initialUser = null }: AuthProviderProps) {
    const [user, setUser] = useState<SafeUser|null>(initialUser);

    const login = useCallback((newUser: SafeUser) => {
        setUser(newUser);
    }, [])

    const logout = useCallback(()=>{
        setUser(null);
        navigate("/")
    }, [])

    const value: AuthContexType = {
        user,
        isAuthenticated: !!user,
        isAdmin: user?.roleId === 3,
        login,
        logout,
    }

    return <AuthContext value={value}>{children}</AuthContext>
}

export const useAuth = () => {
    const context = use(AuthContext)
    if (!context){
        throw new Error("useAuth must be used within a auth");
    }
    return context;
}