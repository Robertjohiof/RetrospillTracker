import {SafeUser, UserRole} from "@/db/schema";
import {useAuth} from "@features/auth/context/AuthProvider";
import {useEffect} from "react";
import {navigate} from "rwsdk/client";

export function useRequireAuth(): SafeUser | null {
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    return user;
}

export function useHasRole(role: UserRole): boolean {
    const { user } = useAuth();

    if (!user) return false;
    if (role === 3) return user.roleId === 3
    return true
}

export function useRequireAdmin(): SafeUser | null {
    const user = useRequireAuth()
    const isAdmin = useHasRole(3)

    useEffect(() => {
        if (user && !isAdmin){
            navigate("/login");
        }
    },[user, isAdmin])

    if (!isAdmin) return null;
    return user;
}