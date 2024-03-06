export interface UserResponse {
    username: string, 
    email: string,
    token: string,
    workout_plans: Array<Object>,
    days: Array<Object>
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