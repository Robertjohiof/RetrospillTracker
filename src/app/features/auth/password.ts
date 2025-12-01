import {hashPassword as hash, verifyPassword as verify} from "better-auth/crypto";

export async function hashPassword(password: string):Promise<string> {
    try {
        return await hash(password);
    } catch (error) {
        throw new Error("Failed to hash password");
    }
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
        return await verify({password, hash});
    } catch (error) {
        console.error("Password verification failed: ", error);
        return false;
    }
}

export function validatePasswordStrength(password:string): { isValid: boolean, errors: string[] } {
    const errors: string[] = []
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter")
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter")
    }

    if (!/\d/.test(password)) {
        errors.push("Password must contain at least one number")
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character");
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}