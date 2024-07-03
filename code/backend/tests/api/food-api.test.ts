import { FoodServices } from "../../services/food-services.ts";
import { FoodApi } from "../../api/food-api.ts";
import { FoodData } from "../../data/food-data.ts";
import { UserData } from "../../data/user-data.ts";
import {  mock_services_return_value, mock_request_with_params, mock_request_without_query, mock_request_with_query_thats_not_a_string, mock_request_with_barcode_query, parsed_barcode, mock_request_with_body, mock_token, mock_request_with_query_and_params, item_index, food, date, mock_request_with_query, mock_request_without_params, mock_request_with_params_thats_not_a_string, mock_request_with_body_with_invalid_date, mock_request_with_query_and_params_with_invalid_date, mock_request_with_params_with_invalid_date } from "./mockData/food.ts";
import { UnauthorizedError } from "../../errors/app_errors.ts";

const foodData = new FoodData()
const userData = new UserData()
let foodServices: FoodServices;
let foodApi: FoodApi;


const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
}

beforeEach(() => {
  foodServices = new FoodServices(foodData, userData)
  foodApi = new FoodApi(foodServices)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe("/api/food/search/name", () => {
  it('returns the items successfully', async () => {
    foodServices.searchByName = jest.fn().mockResolvedValue(Promise.resolve(mock_services_return_value))

    await foodApi.searchByName(mock_request_with_query as any, mockResponse as any);

    expect(foodServices.searchByName).toHaveBeenCalledWith(mock_request_with_query.query.query, 0)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Search successful", obj: mock_services_return_value})
  })

  it('returns no items successfully', async () => {
    foodServices.searchByName = jest.fn().mockResolvedValue(Promise.resolve([]))

    await foodApi.searchByName(mock_request_with_query as any, mockResponse as any);

    expect(foodServices.searchByName).toHaveBeenCalledWith(mock_request_with_query.query.query, 0)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Search successful", obj: []})
  })

  
  it('returns an error when no query value is given', async () => {
    foodServices.searchByName = jest.fn().mockResolvedValue(Promise.resolve([]))

    await foodApi.searchByName(mock_request_without_query as any, mockResponse as any);
    

    expect(mockResponse.status).toHaveBeenCalledWith(400)

    expect(foodServices.searchByName).not.toHaveBeenCalled()
  })

  it('returns an error when the query value given is not a string', async () => {
    foodServices.searchByName = jest.fn().mockResolvedValue(Promise.resolve([]))

    await foodApi.searchByName(mock_request_with_query_thats_not_a_string as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)

    expect(foodServices.searchByName).not.toHaveBeenCalled()
  })
})

describe("/api/food/search/barcode", () => {
  it('returns the item successfully', async () => {
    foodServices.searchByBarcode = jest.fn().mockResolvedValue(Promise.resolve(mock_services_return_value))

    await foodApi.searchByBarcode(mock_request_with_barcode_query as any, mockResponse as any);

    expect(foodServices.searchByBarcode).toHaveBeenCalledWith(parsed_barcode)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Search successful", obj: mock_services_return_value})
  })

  it('returns no item successfully', async () => {
    foodServices.searchByBarcode = jest.fn().mockResolvedValue(Promise.resolve({}))

    await foodApi.searchByBarcode(mock_request_with_barcode_query as any, mockResponse as any);

    expect(foodServices.searchByBarcode).toHaveBeenCalledWith(parsed_barcode)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Search successful", obj: {}})
  })

  
  it('returns an error when no query value is given', async () => {
    foodServices.searchByBarcode = jest.fn().mockResolvedValue(Promise.resolve([]))

    await foodApi.searchByBarcode(mock_request_without_query as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)

    expect(foodServices.searchByBarcode).not.toHaveBeenCalled()
  })

  it('returns an error when the query value given is not a string', async () => {
    foodServices.searchByBarcode = jest.fn().mockResolvedValue(Promise.resolve([]))

    await foodApi.searchByBarcode(mock_request_with_query_thats_not_a_string as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)

    expect(foodServices.searchByBarcode).not.toHaveBeenCalled()
  })

})

describe("/api/food/log", () => {
  it('item is logged successfully', async () => {
    foodServices.log = jest.fn()

    await foodApi.log(mock_request_with_body as any, mockResponse as any);

  

    expect(foodServices.log).toHaveBeenCalledWith(mock_token, food, date)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Food item logged successfully"})
    
  })

  it('user token is not associated with a valid user', async () => {
    foodServices.log = jest.fn().mockRejectedValue(UnauthorizedError)

    await foodApi.log(mock_request_with_body as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(401)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Access denied", obj: {}})
  })

  it('returns logged food of the day successfully', async () => {
    foodServices.log = jest.fn().mockResolvedValue(Promise.resolve(food))

    await foodApi.log(mock_request_with_body as any, mockResponse as any);


    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Food item logged successfully", obj: food})
  })

  it('date is invalid', async () => {
    foodServices.log = jest.fn().mockRejectedValue(UnauthorizedError)

    await foodApi.log(mock_request_with_body_with_invalid_date as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Provided date is invalid", obj: {}})
  })
    
})


describe("/api/food/deleteLog", () => {
  it('item is deleted successfully', async () => {
    foodServices.deleteLog = jest.fn()

    const returnObj = await foodApi.deleteLog(mock_request_with_query_and_params as any, mockResponse as any);

    expect(foodServices.deleteLog).toHaveBeenCalledWith(mock_token, item_index, date)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Food item log deleted successfully", obj: returnObj})
    
  })

  it('user token is not associated with a valid user', async () => {
    foodServices.deleteLog = jest.fn().mockRejectedValue(UnauthorizedError)

    await foodApi.deleteLog(mock_request_with_query_and_params as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(401)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Access denied", obj: {}})
  })

  it('date is invalid', async () => {
    foodServices.deleteLog = jest.fn().mockRejectedValue(UnauthorizedError)

    await foodApi.deleteLog(mock_request_with_query_and_params_with_invalid_date as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Provided date is invalid", obj: {}})
  })
 
})

describe("/api/food/dailyConsumption", () => {
  it('daily consumption is returned successfully', async () => {
    foodServices.dailyConsumption = jest.fn().mockResolvedValue(Promise.resolve(mock_services_return_value))

    await foodApi.dailyConsumption(mock_request_with_params as any, mockResponse as any);

    expect(foodServices.dailyConsumption).toHaveBeenCalledWith(mock_token, date)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Daily consumption fetch successful", obj: mock_services_return_value} )
  })


  it('returns no items successfully', async () => {
    foodServices.dailyConsumption = jest.fn().mockResolvedValue(Promise.resolve([]))

    await foodApi.dailyConsumption(mock_request_with_params as any, mockResponse as any);

    expect(foodServices.dailyConsumption).toHaveBeenCalledWith(mock_token, date)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Daily consumption fetch successful", obj: []})
  })

  
  it('returns an error when no date is given', async () => {
    foodServices.dailyConsumption = jest.fn().mockResolvedValue(Promise.resolve([]))

    await foodApi.dailyConsumption(mock_request_without_params as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)

    expect(foodServices.dailyConsumption).not.toHaveBeenCalled()
  })

  it('returns an error when the params value given is not a string', async () => {
    foodServices.dailyConsumption = jest.fn().mockResolvedValue(Promise.resolve([]))

    await foodApi.dailyConsumption(mock_request_with_params_thats_not_a_string as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)

    expect(foodServices.dailyConsumption).not.toHaveBeenCalled()
  })

  it('user token is not associated with a valid user', async () => {
    foodServices.dailyConsumption = jest.fn().mockRejectedValue(UnauthorizedError)

    await foodApi.dailyConsumption(mock_request_with_params as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(401)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Access denied", obj: {}})
  })

  it('date is invalid', async () => {
    foodServices.dailyConsumption = jest.fn().mockRejectedValue(UnauthorizedError)

    await foodApi.dailyConsumption(mock_request_with_params_with_invalid_date as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Provided date is invalid", obj: {}})
  })
})