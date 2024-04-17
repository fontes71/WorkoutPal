export interface UserResponse {
    username: string, 
    email: string,
    token: string
}

export interface AuthInfo {
    scope: string,
    user: AuthInfoUser
}

export interface AuthInfoUser {
    username: string, 
    email: string,
    token: string
}