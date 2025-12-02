import { SafeUser, UserRole } from "@/db/schema";

export const isAdmin = (user: SafeUser | null):boolean => {
    return user?.roleId === 3
}

export const isUser = (user: SafeUser | null):boolean => {
    return user !== null
}

export const hasRole = (user: SafeUser | null, role: UserRole): boolean => {
    if (!user) return false
    if (role === 3) return user.roleId === 3
    return true
}