import {SafeUser, Session} from "@/db/schema";
import {AuthResponseDTO, SessionDTO, UserDTO} from "@features/auth/types/authDtos";

export function mapUserToDTO(user: SafeUser): UserDTO {
    return {
        userId: user.userId,
        userName: user.userName,
        slug: user.slug,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        profileBanner: user.profileBanner,
        biography: user.biography,
        isActive: user.isActive,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        roleId: user.roleId,
    }
}

export function mapSessionToDTO(session: Session): SessionDTO {
    return {
        sessionId: session.sessionId,
        userId: session.userId,
        ipAddress: session.ipAddress,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        expiresAt: session.expiresAt,
        revoked: session.revoked,
    }
}

export function mapAuthResponseToDTO(
    user: SafeUser,
    session: Session,
): AuthResponseDTO {
    return {
        user: mapUserToDTO(user),
        session: mapSessionToDTO(session),
    }
}