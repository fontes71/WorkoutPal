import { Response, response } from "express"
import { User } from "../../../domain/types"

export const mockToken: string = 'mockToken' 

export const mockUnauthorizedToken = 'unauthorizedToken'

export const mockServiceUser: User = {
    username: 'test',
    email: 'test@gmail.com',
    password: 'testHashedPassword',
    token: 'mockToken',
    workout_plans: [],
    days: []
}

export const mockResponseUser = {
    username: 'test',
    email: 'test@gmail.com',
    token: 'mockToken',
}

export const mockSignupRequest = {
    body: {
        username: "test",
        email: "test@gmail.com",
        password: "test"
    }
}

export const mockInvalidSignupRequest = {
    body: {
        username: null,
        email: "test@gmail.com",
        password: "test"
    }
}

export const mockExistentEmailSignupRequest = {
    body: {
        username: null,
        email: "existentEmail@gmail.com",
        password: "test"
    }
}

export const mockLoginRequest = {
    body: {
        email: "test@gmail.com",
        password: "test"
    }
}

export const mockInvalidLoginRequest = {
    body: {
        email: null,
        password: "test"
    }
}

export const mockIncorrectPasswordLoginRequest = {
    body: {
        email: "test@gmail.com",
        password: "incorrectPassword"
    }
}

export const mockLogoutRequest = {
    headers: {
      authorization: `Bearer ${mockToken}`,
    }
}

export const mockUnauthorizedLogoutRequest = {
    headers: {
      authorization: `Bearer ${mockUnauthorizedToken}`,
    }
}

export const mockNoTokenLogoutRequest = {
    headers: {}
}

export const mockNotBearerTokenLogoutRequest = {
    headers: {
        authorization: `NotBearer ${mockUnauthorizedToken}`
    }
}
