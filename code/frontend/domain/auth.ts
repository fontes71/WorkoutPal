type ResponseError = {
    message: string
}

type User = {
    username: string,
    email: string,
    token: string
}

type AuthResponse = {
    status: string,
    obj: User
}