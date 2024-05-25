import { User } from "../../../domain/types";

export const mockUser: User = {
    username: 'testUser',
    email: 'testEmail@test.com',
    password: 'testPassword',
    token: 'testToken',
    workout_plans: [],
    days: []
}

export const mockToken: string = 'testUUID' 