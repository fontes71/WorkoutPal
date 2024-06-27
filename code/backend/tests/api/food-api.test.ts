import { FoodServices } from "../../services/food-services.ts";
import { FoodApi } from "../../api/food-api.ts";
import { FoodData } from "../../data/food-data.ts";
import { UserData } from "../../data/user-data.ts";
import {  mock_services_return_value, mock_request_with_query, mock_request_without_query, mock_request_with_query_thats_not_a_string, mock_request_with_barcode_query, parsed_barcode, mock_request_with_body, mock_token, mock_request_with_params, item_index, food_item } from "./mockData/food.ts";
import { UnauthorizedError } from "../../errors/app_errors.ts";
import { consumed_food_of_the_day } from "../services/mockData/food.ts";

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

describe("/api/food/consume", () => {
  it('item is consumed successfully', async () => {
    foodServices.consume = jest.fn()

    await foodApi.consume(mock_request_with_body as any, mockResponse as any);

  

    expect(foodServices.consume).toHaveBeenCalledWith(mock_token, food_item)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Food item consumed successfully"})
    
  })

  it('user token is not associated with a valid user', async () => {
    foodServices.consume = jest.fn().mockRejectedValue(UnauthorizedError)

    await foodApi.consume(mock_request_with_body as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(401)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Access denied", obj: {}})
  })

  it('returns consumed food of the day successfully', async () => {
    foodServices.consume = jest.fn().mockResolvedValue(Promise.resolve(consumed_food_of_the_day))

    await foodApi.consume(mock_request_with_body as any, mockResponse as any);



    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Food item consumed successfully", obj: consumed_food_of_the_day})
  })
})


describe("/api/food/delete", () => {
  it('item is deleted successfully', async () => {
    foodServices.delete = jest.fn()

    const returnObj = await foodApi.delete(mock_request_with_params as any, mockResponse as any);

    expect(foodServices.delete).toHaveBeenCalledWith(mock_token, item_index)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Food item deleted successfully", obj: returnObj})
    
  })

  it('user token is not associated with a valid user', async () => {
    foodServices.delete = jest.fn().mockRejectedValue(UnauthorizedError)

    await foodApi.delete(mock_request_with_params as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(401)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Access denied", obj: {}})
  })
})

describe("/api/food/dailyConsumption", () => {
  it('daily consumption is returned successfully', async () => {
    foodServices.dailyConsumption = jest.fn().mockResolvedValue(Promise.resolve(mock_services_return_value))

    await foodApi.dailyConsumption(mock_request_with_query as any, mockResponse as any);

    expect(foodServices.dailyConsumption).toHaveBeenCalledWith(mock_token, mock_request_with_query.query.query)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Daily consumption fetch successful", obj: mock_services_return_value} )
  })

  
  it('returns no items successfully', async () => {
    foodServices.dailyConsumption = jest.fn().mockResolvedValue(Promise.resolve([]))

    await foodApi.dailyConsumption(mock_request_with_query as any, mockResponse as any);

    expect(foodServices.dailyConsumption).toHaveBeenCalledWith(mock_token, mock_request_with_query.query.query)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Daily consumption fetch successful", obj: []})
  })

  
  it('returns an error when no query value is given', async () => {
    foodServices.dailyConsumption = jest.fn().mockResolvedValue(Promise.resolve([]))

    await foodApi.dailyConsumption(mock_request_without_query as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)

    expect(foodServices.dailyConsumption).not.toHaveBeenCalled()
  })

  it('returns an error when the query value given is not a string', async () => {
    foodServices.dailyConsumption = jest.fn().mockResolvedValue(Promise.resolve([]))

    await foodApi.dailyConsumption(mock_request_with_query_thats_not_a_string as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400)

    expect(foodServices.dailyConsumption).not.toHaveBeenCalled()
  })

  it('user token is not associated with a valid user', async () => {
    foodServices.dailyConsumption = jest.fn().mockRejectedValue(UnauthorizedError)

    await foodApi.dailyConsumption(mock_request_with_query as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(401)
    expect(mockResponse.json).toHaveBeenCalledWith({message: "Error: Access denied", obj: {}})
  })
})