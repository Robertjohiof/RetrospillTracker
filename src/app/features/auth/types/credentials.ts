type LoginCredentials = {
    email: string,
    password: string,
}

//TODO: få den enestemmig med register formet
type RegisterCredentials = {
    email: string,
    password: string,
    passwordConfirmation: string,
}

export type {LoginCredentials, RegisterCredentials};