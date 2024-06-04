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

export enum StatusCode {
    Success = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401
} 
