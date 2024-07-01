import { AuthServices } from "../../services/auth-services";
import { AuthData } from "../../data/auth-data";
import bcrypt from "bcrypt";
import {
  ExistentEmailError,
  IncorrectPasswordError,
  InvalidDateError,
  InvalidParamsError,
  NonExistentEmailError,
  UnauthorizedError,
} from "../../errors/app_errors";
import { ProgressData } from "../../data/progress_data";
import { UserData } from "../../data/user-data";
import { ProgressServices } from "../../services/progress_services";
import { mockDate, mockDayStats, mockInvalidDate, mockInvalidPeriod, mockInvalidToken, mockPeriod, mockToken, mockUser, mockWeight } from "./mockData/progress";

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

let progressData: ProgressData
let userData: UserData
let progressServices: ProgressServices

beforeEach(() => {
    userData = new UserData()
    progressData = new ProgressData(userData)
    progressServices = new ProgressServices(progressData, userData)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe("Update Weight", () => {
  it("update weight successfully", async () => {
    progressData.updateWeight = jest.fn().mockResolvedValue(Promise.resolve(mockUser))

    await progressServices.updateWeight(mockWeight, mockDate, mockToken)

    expect(progressData.updateWeight).toHaveBeenCalledWith(mockWeight, mockDate, mockToken)
  });

  it("update weight unsuccessful due to invalid date", async () => {
    progressData.updateWeight = jest.fn().mockResolvedValue(Promise.resolve(mockUser))

    await progressServices
        .updateWeight(mockWeight, mockInvalidDate, mockToken)
        .catch((err) => expect(err).toBe(InvalidDateError))

    expect(progressData.updateWeight).not.toHaveBeenCalled()
  })

  it("update weight unsuccessful due to invalid token", async () => {
    progressData.updateWeight = jest.fn().mockResolvedValue(Promise.resolve(null))

    await progressServices
        .updateWeight(mockWeight, mockDate, mockInvalidToken)
        .catch((err) => expect(err).toBe(UnauthorizedError))

    expect(progressData.updateWeight).toHaveBeenCalledWith(mockWeight, mockDate, mockInvalidToken)
  })
})

describe("Get Days", () => {
    it("get days successfully", async () => {
        userData.getUserByToken = jest.fn().mockResolvedValue(Promise.resolve(mockUser))
    
        const res = await progressServices.getDays(mockPeriod, mockToken)
        
        expect(res).toStrictEqual(mockDayStats)
        expect(userData.getUserByToken).toHaveBeenCalledWith(mockToken)
    })

    it("get days unsuccessfully due to invalid period", async () => {
        userData.getUserByToken = jest.fn().mockResolvedValue(Promise.resolve(mockUser))
    
        await progressServices
            .getDays(mockInvalidPeriod, mockToken)
            .catch((err) => expect(err).toBe(InvalidParamsError))
        
        expect(userData.getUserByToken).not.toHaveBeenCalled()
    })

    it("get days unsuccessfully due to invalid token", async () => {
        userData.getUserByToken = jest.fn().mockResolvedValue(Promise.resolve(null))
    
        await progressServices
            .getDays(mockPeriod, mockInvalidToken)
            .catch((err) => expect(err).toBe(UnauthorizedError))
        
        expect(userData.getUserByToken).toHaveBeenCalledWith(mockInvalidToken)
    })
})
  
