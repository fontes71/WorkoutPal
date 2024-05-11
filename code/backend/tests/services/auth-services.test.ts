import { AuthServices } from '../../services/auth-services';
import { AuthData } from '../../data/external/auth-data';

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
  Schema: function() {
    return {
    };
  },
  model: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('hashedPassword')),
  compare: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => '123456'),
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

  it('should signup a user', async () => {
    const mockUser = {
      username: 'testuser',
      password: 'testpassword',
      email: 'testemail@test.com',
    }

    authData.getUserByEmail = jest.fn().mockResolvedValue(null)
    authData.createUser = jest.fn().mockResolvedValue({})

    const result = await authServices.signup(mockUser.username, mockUser.password, mockUser.email)

    expect(result).toBe('123456')
    expect(authData.getUserByEmail).toHaveBeenCalledWith(mockUser.email)
    expect(authData.createUser).toHaveBeenCalledWith(mockUser.username, 'hashedPassword', mockUser.email, '123456')
  })

  // Add more tests for login and logout
})