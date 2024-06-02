import { AuthServices } from "../../services/auth-services";
import { AuthData } from "../../data/auth-data";
import { mockUser, mockToken } from "./mockData/auth";
import bcrypt from "bcrypt";
import {
  ExistentEmailError,
  IncorrectPasswordError,
  NonExistentEmailError,
  UnauthorizedError,
} from "../../errors/app_errors";

jest.mock("mongoose", () => ({
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
  Schema: function () {
    return {};
  },
  model: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(() => Promise.resolve("hashedPassword")),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => mockToken),
}));

let authData: AuthData;
let authServices: AuthServices;

beforeEach(() => {
  authData = new AuthData();
  authServices = new AuthServices(authData);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Auth Signup Service", () => {
  it("signup successful", async () => {
    authData.getUserByEmail = jest.fn().mockResolvedValue(null);
    authData.createUser = jest.fn().mockResolvedValue(Promise.resolve());

    const result = await authServices.signup(
      mockUser.username,
      mockUser.password,
      mockUser.email
    );

    expect(result).toBe(mockToken);
    expect(authData.getUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(authData.createUser).toHaveBeenCalledWith(
      mockUser.username,
      "hashedPassword",
      mockUser.email,
      mockToken
    );
  });

  it("signup unseccessful due to existent email", async () => {
    authData.getUserByEmail = jest.fn().mockResolvedValue(mockUser);
    authData.createUser = jest.fn().mockResolvedValue(Promise.resolve());

    await authServices
      .signup(mockUser.username, mockUser.password, mockUser.email)
      .catch((err) => expect(err).toBe(ExistentEmailError));

    expect(authData.getUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(authData.createUser).not.toHaveBeenCalled();
  });
});

describe("Auth Login Service", () => {
  it("login successful", async () => {
    authData.getUserAndUpdateToken = jest.fn().mockResolvedValue(mockUser);
    bcrypt.compare = jest.fn().mockResolvedValue(Promise.resolve(true));

    const user = await authServices.login(mockUser.email, mockUser.password);

    expect(user).toBe(mockUser);
    expect(authData.getUserAndUpdateToken).toHaveBeenCalledWith(
      mockUser.email,
      mockToken
    );
  });

  it("login unseccessful due to non existent email", async () => {
    authData.getUserAndUpdateToken = jest.fn().mockResolvedValue(null);
    bcrypt.compare = jest.fn().mockResolvedValue(Promise.resolve(true));

    await authServices
      .login(mockUser.email, mockUser.password)
      .catch((err) => expect(err).toBe(NonExistentEmailError));

    expect(authData.getUserAndUpdateToken).toHaveBeenCalledWith(
      mockUser.email,
      mockToken
    );
  });

  it("login unseccessful due to incorrect password", async () => {
    authData.getUserAndUpdateToken = jest.fn().mockResolvedValue(mockUser);
    bcrypt.compare = jest.fn().mockResolvedValue(Promise.resolve(false));

    await authServices
      .login(mockUser.email, mockUser.password)
      .catch((err) => expect(err).toBe(IncorrectPasswordError));

    expect(authData.getUserAndUpdateToken).toHaveBeenCalledWith(
      mockUser.email,
      mockToken
    );
  });
});

describe("Auth Logout Service", () => {
  it("logout successful", async () => {
    authData.tryClearUserToken = jest.fn().mockResolvedValue(mockUser);

    await authServices.logout(mockToken);

    expect(authData.tryClearUserToken).toHaveBeenCalledWith(mockToken);
  });

  it("logout unseccessful invalid token", async () => {
    authData.tryClearUserToken = jest.fn().mockResolvedValue(mockUser);

    await authServices
      .logout(mockToken)
      .catch((err) => expect(err).toBe(UnauthorizedError));

    expect(authData.tryClearUserToken).toHaveBeenCalledWith(mockToken);
  });
});
