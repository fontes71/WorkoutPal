import { AuthData } from "../../data/auth-data";
import { AuthServices } from "../../services/auth-services";

import { AuthApi } from "../../api/auth-api.ts";
import { 
  ExistentEmailError, IncorrectPasswordError, InvalidDateError, InvalidParamsError,
  NonExistentEmailError, UnauthorizedError 
} from "../../errors/app_errors.ts";
import { IProgressApi, IProgressServices } from "../../domain/interfaces.ts";
import { ProgressData } from "../../data/progress_data.ts";
import { UserData } from "../../data/user-data.ts";
import { ProgressServices } from "../../services/progress_services.ts";
import { ProgressApi } from "../../api/progress_api.ts";
import { mockGetDaysInvalidPeriodRequest, mockGetDaysInvalidTokenRequest, mockGetDaysRequest, mockInvalidPeriod, mockInvalidToken, mockPeriod, mockResponseGetDaysBody, mockResponseUpdateWeightBody, mockServiceDays, mockToken, mockUpdateWeightInvalidDateRequest, mockUpdateWeightInvalidTokenRequest, mockUpdateWeightRequest } from "./mockData/progress.ts";

const userData = new UserData()
const progressData = new ProgressData(userData)
let progressServices: ProgressServices
let progressApi: ProgressApi

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
}

beforeEach(() => {
    progressServices = new ProgressServices(progressData, userData)
    progressApi = new ProgressApi(progressServices)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe("api/progress/updateWeight", () => {
  it('should update weight successfully', async () => {
    progressServices.updateWeight = jest.fn().mockResolvedValue(Promise.resolve())

    await progressApi.updateWeight(mockUpdateWeightRequest as any, mockResponse as any)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseUpdateWeightBody)
  
    expect(progressServices.updateWeight).toHaveBeenCalledWith(
        mockUpdateWeightRequest.body.newWeight,
        mockUpdateWeightRequest.body.day,
        mockToken
    )
  })

  it('update weight with invalid date', async () => {
    progressServices.updateWeight = jest.fn().mockRejectedValue(InvalidDateError)

    await progressApi.updateWeight(mockUpdateWeightInvalidDateRequest as any, mockResponse as any)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error: Provided date is invalid', obj: {} })
  
    expect(progressServices.updateWeight).toHaveBeenCalledWith(
        mockUpdateWeightInvalidDateRequest.body.newWeight,
        mockUpdateWeightInvalidDateRequest.body.day,
        mockToken
    )
  })

  it('update weight with invalid token', async () => {
    progressServices.updateWeight = jest.fn().mockRejectedValue(UnauthorizedError)

    await progressApi.updateWeight(mockUpdateWeightInvalidTokenRequest as any, mockResponse as any)

    expect(mockResponse.status).toHaveBeenCalledWith(401)
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error: Access denied', obj: {} })
  
    expect(progressServices.updateWeight).toHaveBeenCalledWith(
        mockUpdateWeightInvalidTokenRequest.body.newWeight,
        mockUpdateWeightInvalidTokenRequest.body.day,
        mockInvalidToken
    )
  })

  // invalid weight??
})

describe("api/progress/getDays", () => {
    it('should get days successfully', async () => {
      progressServices.getDays = jest.fn().mockResolvedValue(Promise.resolve(mockServiceDays))
  
      await progressApi.getDays(mockGetDaysRequest as any, mockResponse as any)
  
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith(mockResponseGetDaysBody)
    
      expect(progressServices.getDays).toHaveBeenCalledWith(
        mockPeriod,
        mockToken
      )
    })

    it('get days with invalid period', async () => {
        progressServices.getDays = jest.fn().mockRejectedValue(InvalidParamsError)
    
        await progressApi.getDays(mockGetDaysInvalidPeriodRequest as any, mockResponse as any)
    
        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error: Missing or invalid parameters', obj: {} })
      
        expect(progressServices.getDays).toHaveBeenCalledWith(
            mockInvalidPeriod,
            mockToken
        )
    })

    it('get days with invalid token', async () => {
        progressServices.getDays = jest.fn().mockRejectedValue(UnauthorizedError)
    
        await progressApi.getDays(mockGetDaysInvalidTokenRequest as any, mockResponse as any)
    
        expect(mockResponse.status).toHaveBeenCalledWith(401)
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error: Access denied', obj: {} })
      
        expect(progressServices.getDays).toHaveBeenCalledWith(
            mockPeriod,
            mockInvalidToken
        )
    })
})