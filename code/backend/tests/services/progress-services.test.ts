import { InvalidDateError, InvalidParamsError, UnauthorizedError } from "../../errors/app_errors";
import { ProgressData } from "../../data/progress_data";
import { UserData } from "../../data/user-data";
import { ProgressServices } from "../../services/progress_services";
import { 
  emptyFoodArr,
  foodArr,
  mockDate, mockDayStats, mockInvalidDate, mockInvalidPeriod,
  mockInvalidToken, mockPeriod, mockToken, mockUser, mockWeight 
} from "./mockData/progress";
import { getConsumedNutrients, getStartOfPeriod, isValidPeriod } from "../../utils/functions/app/progress";
import { ConsumedNutrients, Food, MainNutrients, SecondaryNutrients, ValueAndUnit } from "../../domain/types";

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

describe("auxiliary functions (isValidPeriod)", () => {
  it("returns true with valid periods", async () => {

    expect(isValidPeriod("week")).toBe(true)
    expect(isValidPeriod("month")).toBe(true)
    expect(isValidPeriod("year")).toBe(true)
  })

  it("returns false with invalid periods", async () => {

    expect(isValidPeriod("weekly")).toBe(false)
    expect(isValidPeriod("monthly")).toBe(false)
    expect(isValidPeriod("yearly")).toBe(false)
    expect(isValidPeriod("invalidPeriod")).toBe(false)
  })
})

describe("auxiliary functions (getStartOfPeriod)", () => {
  const date = new Date("2020-02-08")

  it("returns the date 1 week before the specified date", async () => {
    const dateOfPeriodAgo = new Date("2020-02-01")
    
    expect(getStartOfPeriod(date, "week")).toStrictEqual(dateOfPeriodAgo)
  })

  it("returns the date 1 year before the specified date", async () => {
    const dateOfPeriodAgo = new Date("2019-02-08")
    
    expect(getStartOfPeriod(date, "year")).toStrictEqual(dateOfPeriodAgo)
  })

  it("returns the date 1 month before the specified date with any value other than week or year", async () => {
    const dateOfPeriodAgo = new Date("2020-01-08")
    
    expect(getStartOfPeriod(date, "month")).toStrictEqual(dateOfPeriodAgo)
    expect(getStartOfPeriod(date, "anythingElse")).toStrictEqual(dateOfPeriodAgo)
  })
})

describe("auxiliary functions (getConsumedNutrients)", () => {
  it("returns the sum of the main consumed nutrients based on each food item in the array", async () => {
    const expectedConsumedNutrients: ConsumedNutrients = {"calories": 1075, "protein": 70, "fat": 45.6, "carbs": 49}

    expect(getConsumedNutrients(foodArr)).toStrictEqual(expectedConsumedNutrients)
  })

  it("returns a ConsumedNutrients object with every nutrient with the value 0 if parameter is an empty array", async () => {
    const expectedConsumedNutrients: ConsumedNutrients = {"calories": 0, "protein": 0, "fat": 0, "carbs": 0}

    expect(getConsumedNutrients(emptyFoodArr)).toStrictEqual(expectedConsumedNutrients)
  })
})

