import { AuthData } from "../../data/auth-data";
import { AuthServices } from "../../services/auth-services";
import { 
  mockSignupRequest, mockLoginRequest, mockResponseUser, 
  mockServiceUser, mockToken, mockInvalidLoginRequest, 
  mockInvalidSignupRequest, mockIncorrectPasswordLoginRequest, 
  mockExistentEmailSignupRequest, mockLogoutRequest, 
  mockUnauthorizedLogoutRequest, mockUnauthorizedToken, 
  mockNoTokenLogoutRequest, mockNotBearerTokenLogoutRequest, 
  mockResponseLoginBody,
  mockResponseSignupBody,
  mockResponseLogoutBody
} from "./mockData/auth.ts";
import { AuthApi } from "../../api/auth-api.ts";
import { 
  ExistentEmailError, IncorrectPasswordError, InvalidParamsError,
  NonExistentEmailError, UnauthorizedError 
} from "../../errors/app_errors.ts";

const authData = new AuthData()
let authServices: AuthServices;
let authApi: AuthApi;

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
}

beforeEach(() => {
  authServices = new AuthServices(authData)
  authApi = new AuthApi(authServices)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe("api/signup", () => {
  it('should sign up a new user successfully', async () => {
    authServices.signup = jest.fn().mockResolvedValue(Promise.resolve(mockResponseUser))

    await authApi.signup(mockSignupRequest as any, mockResponse as any)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseSignupBody)
  
    expect(authServices.signup).toHaveBeenCalledWith(
      mockSignupRequest.body.username,
      mockSignupRequest.body.password,
      mockSignupRequest.body.email
    )
  })

  it('trying to signup an user with an email that already exists', async () => {
    authServices.signup = jest.fn().mockRejectedValue(ExistentEmailError)

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await authApi.signup(mockExistentEmailSignupRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(409)
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error: There is already an account with the inserted email', obj: {} })
  
    expect(authServices.signup).toHaveBeenCalledWith(
      mockExistentEmailSignupRequest.body.username,
      mockExistentEmailSignupRequest.body.password,
      mockExistentEmailSignupRequest.body.email
    )
  })

  it('trying to signup an user with null body parameters', async () => {
    authServices.signup = jest.fn().mockRejectedValue(InvalidParamsError)

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }

    await authApi.signup(mockInvalidSignupRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error: Missing or invalid parameters', obj: {} })
  
    expect(authServices.signup).toHaveBeenCalledWith(
      mockInvalidSignupRequest.body.username,
      mockInvalidSignupRequest.body.password,
      mockInvalidSignupRequest.body.email
    )
  })
})

describe("api/login", () => {
  it('should log in an user successfully', async () => {
    authServices.login = jest.fn().mockResolvedValue(Promise.resolve(mockServiceUser))

    await authApi.login(mockLoginRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseLoginBody)
  
    expect(authServices.login).toHaveBeenCalledWith(
      mockLoginRequest.body.email,
      mockLoginRequest.body.password
    )
  })

  it('trying to log in with a non existent email', async () => {
    authServices.login = jest.fn().mockRejectedValue(NonExistentEmailError)

    await authApi.login(mockLoginRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: No user associated with the inserted email", obj: {} })
  
    expect(authServices.login).toHaveBeenCalledWith(
      mockLoginRequest.body.email,
      mockLoginRequest.body.password
    )
  })

  it('trying to log in with with null body parameters', async () => {
    authServices.login = jest.fn().mockRejectedValue(InvalidParamsError)

    await authApi.login(mockInvalidLoginRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Missing or invalid parameters", obj: {} })
  
    expect(authServices.login).toHaveBeenCalledWith(
      mockInvalidLoginRequest.body.email,
      mockInvalidLoginRequest.body.password
    )
  })

  it('trying to log in with with an incorrect password', async () => {
    authServices.login = jest.fn().mockRejectedValue(IncorrectPasswordError)

    await authApi.login(mockIncorrectPasswordLoginRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Password is incorrect", obj: {} })
  
    expect(authServices.login).toHaveBeenCalledWith(
      mockIncorrectPasswordLoginRequest.body.email,
      mockIncorrectPasswordLoginRequest.body.password
    )
  })
})

describe("api/logout", () => {
  it('should log out an user successfully', async () => {
    authServices.logout = jest.fn().mockResolvedValue(Promise.resolve())

    await authApi.logout(mockLogoutRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseLogoutBody)
  
    expect(authServices.logout).toHaveBeenCalledWith(mockToken)
  })

  it('trying to log out an user with unauthorized/invalid token', async () => {
    authServices.logout = jest.fn().mockRejectedValue(UnauthorizedError)

    await authApi.logout(mockUnauthorizedLogoutRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(401)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Access denied", obj: {} })
  
    expect(authServices.logout).toHaveBeenCalledWith(mockUnauthorizedToken)
  })

  it('trying to log out an user without passing any token', async () => {
    await authApi.logout(mockNoTokenLogoutRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: No authorization token provided", obj: {} })
  })

  it('trying to log out an user with an invalid type of token', async () => {
    await authApi.logout(mockNotBearerTokenLogoutRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Authorization token needs to be bearer", obj: {} })
  })
})
