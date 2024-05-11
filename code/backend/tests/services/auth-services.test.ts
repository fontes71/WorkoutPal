import { AuthServices } from '../../services/auth-services';
import { AuthData } from '../../data/external/auth-data';
import { mockUser, mockUUID } from './auth-utils';
import { ExistentEmailError } from '../../errors/app_errors';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  startSession: jest.fn(() => ({
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    abortTransaction: jest.fn(),
    endSession: jest.fn(),
  })),
  connection: {
    close: jest.fn(),
  },
  Schema: function() { return {} },
  model: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('hashedPassword')),
  compare: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => mockUUID),
}));

let authServices: AuthServices;
let authData: AuthData;

beforeEach(() => {
  authData = new AuthData()
  authServices = new AuthServices(authData)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('AuthServices', () => {
  it('signup successful', async () => {
    authData.getUserByEmail = jest.fn().mockResolvedValue(null)
    authData.createUser = jest.fn().mockResolvedValue(Promise.resolve())

    const result = await authServices.signup(mockUser.username, mockUser.password, mockUser.email)

    expect(result).toBe(mockUUID)
    expect(authData.getUserByEmail).toHaveBeenCalledWith(mockUser.email)
    expect(authData.createUser).toHaveBeenCalledWith(mockUser.username, 'hashedPassword', mockUser.email, mockUUID)
  })

  it('signup unseccessful due to existent email', async () => {
    authData.getUserByEmail = jest.fn().mockResolvedValue(mockUser)
    authData.createUser = jest.fn().mockResolvedValue(Promise.resolve())

    try {
      await authServices.signup(mockUser.username, mockUser.password, mockUser.email)
    } catch(err) {
      expect(err).toBe(ExistentEmailError)
    }
    
    expect(authData.getUserByEmail).toHaveBeenCalledWith(mockUser.email)
    expect(authData.createUser).not.toHaveBeenCalled()
  })
})