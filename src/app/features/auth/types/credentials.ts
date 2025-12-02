type LoginCredentials = {
    userName: string,
    password: string,
}

type RegisterCredentials = {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    email: string,
    biography: string|null,
    profilePicture: string|null,
    profileBanner: string|null,
}

export type {LoginCredentials, RegisterCredentials};