export type ResponseError = {
    error_message: string
}

export type User = {
    username: string,
    email: string,
    token: string
}

export type AuthResponse = {
    status: string,
    obj: User
}