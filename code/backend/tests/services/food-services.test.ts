import express from "express";

import { ConsumedFood, Food, User } from "../../domain/types.ts";
import { FoodServices } from "../../services/food-services.ts";
import { FoodData } from "../../data/food-data.ts";
import { UserData } from "../../data/user-data.ts";
import {
  api_food,
  api_food_brand_in_name,
  api_food_no_name,
  api_food_no_quantity_unit,
  api_food_quantity_on_name,
  consumed_food_of_the_day,
  food,
  food_no_brand,
  food_no_quantity_to_present,
  user,
  date,
  user_with_new_consumed_food_on_new_date,
  date_that_user_has_consumed_food,
  user_with_new_consumed_food_on_a_certain_date,
  consumed_food,
  consumed_food_of_the_day_with_the_added_one,
} from "./mockData/food.ts";
import { apiFoodToFood } from "../../utils/functions/app/apiFoodToFood.ts";
import { NotFoundError } from "../../errors/app_errors.ts";
import * as getDateModule from "../../utils/functions/app/getDate.ts";

let foodServices: FoodServices;
let foodData: FoodData;
let userData: UserData;
let userMock = {...user }

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

beforeEach(() => {
  foodData = new FoodData();
  userData = new UserData();
  foodServices = new FoodServices(foodData, userData);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("searchByName", () => {
  it("returns successfully", async () => {
    foodData.searchByName = jest.fn().mockResolvedValue([api_food]);

    const resFood = await foodServices.searchByName("irrelevant", 0);

    expect(resFood).toEqual([food]);
  });

  it("returns successfully even if no results were returned", async () => {
    foodData.searchByName = jest.fn().mockResolvedValue([]);

   const resFood = await foodServices.searchByName("irrelevant", 0);
    
   expect(resFood).toEqual([]);
  })
});

describe("searchByBarcode", () => {
  it("returns successfully", async () => {
    foodData.searchByBarcode = jest.fn().mockResolvedValue(api_food);

    const resFood = await foodServices.searchByBarcode(1234567);

    expect(resFood).toEqual(food);
  });

  it("returns successfully even if no result was returned", async () => {
    foodData.searchByBarcode = jest.fn().mockResolvedValue(undefined);

    const resFood = await foodServices.searchByBarcode(1234567);
    
    expect(resFood).toEqual({});
  });
});

describe("dailyConsumption", () => {
  it("returns successfully", async () => {
    userData.getUserByToken = jest.fn().mockResolvedValue(user);

    const resFood = await foodServices.dailyConsumption(
      user.token,
      "17-4-2024"
    );

    expect(resFood).toEqual(consumed_food_of_the_day);
  });

  it("throws unauthorized exception if no user was found", async () => {
    userData.getUserByToken = jest.fn().mockResolvedValue(undefined);

    expect(async () => {
      await foodServices.dailyConsumption(user.token, "17-4-2024");
    }).rejects.toThrow("UnauthorizedError");
  });

  it("returns successfully even if no day was found", async () => {
    userData.getUserByToken = jest.fn().mockResolvedValue(user);

    const resFood = await foodServices.dailyConsumption(user.token, "17-4-3000");


    expect(resFood).toEqual([]);
  });
});

describe("consume", () => {
  beforeEach(() => {
    userMock = {...user }
  })
  it("updates the user with a new consumed food as the first of the day", async () => {
    userData.getUserByToken = jest.fn().mockResolvedValue(userMock);
    userData.updateUser = jest.fn();
    jest.spyOn(getDateModule, "default").mockReturnValue(date);

    await foodServices.consume(
      user.token,
      consumed_food.id,
      consumed_food.name,
      consumed_food.calories,
      consumed_food.protein,
      consumed_food.fat,
      consumed_food.carbs
    );

    expect(userData.updateUser).toHaveBeenCalledWith(
      user.token,
      user_with_new_consumed_food_on_new_date
    );
  });

  it("updates the user with a new consumed food on a day when they had already consumed food", async () => {
    userData.getUserByToken = jest.fn().mockResolvedValue(userMock);
    userData.updateUser = jest.fn();
    jest.spyOn(getDateModule, "default").mockReturnValue(date_that_user_has_consumed_food);

    await foodServices.consume(
      user.token,
      consumed_food.id,
      consumed_food.name,
      consumed_food.calories,
      consumed_food.protein,
      consumed_food.fat,
      consumed_food.carbs
    ); 
    

    expect(userData.updateUser).toHaveBeenCalledWith(
      user.token,
      user_with_new_consumed_food_on_a_certain_date
    );
  });

  it("throws unauthorized if no user with the token passed is found", async () => {
    userData.getUserByToken = jest.fn().mockResolvedValue(null);
    userData.updateUser = jest.fn();


    expect(async () => {
      await foodServices.consume(
        user.token,
        consumed_food.id,
        consumed_food.name,
        consumed_food.calories,
        consumed_food.protein,
        consumed_food.fat,
        consumed_food.carbs
      ); 
    }).rejects.toThrow("Unauthorized");
  });

  it("returns correctly when it's the first item of the day", async () => {
    userData.getUserByToken = jest.fn().mockResolvedValue(userMock);
    userData.updateUser = jest.fn();
    jest.spyOn(getDateModule, "default").mockReturnValue(date);

    const returnValue = await foodServices.consume(
      user.token,
      consumed_food.id,
      consumed_food.name,
      consumed_food.calories,
      consumed_food.protein,
      consumed_food.fat,
      consumed_food.carbs
    ); 
    
    expect(returnValue).toEqual([consumed_food]);
  });

  it("returns correctly when it's not the first item of the day", async () => {
    userData.getUserByToken = jest.fn().mockResolvedValue(userMock);
    userData.updateUser = jest.fn();
    jest.spyOn(getDateModule, "default").mockReturnValue(date_that_user_has_consumed_food);

    const returnValue = await foodServices.consume(
      user.token,
      consumed_food.id,
      consumed_food.name,
      consumed_food.calories,
      consumed_food.protein,
      consumed_food.fat,
      consumed_food.carbs
    ); 




    
    expect(returnValue).toEqual(consumed_food_of_the_day_with_the_added_one);
  });
});

describe("auxiliar functions", () => {
  it("mapFood returns correct value", () => {
    const resFood = apiFoodToFood(api_food);
    expect(resFood).toEqual(food);
  });

  it("mapFood returns item with its english name if the original is not available", () => {
    const resFood = apiFoodToFood(api_food_no_name);
    expect(resFood).toEqual(food);
  });

  it("mapFood returns nothing on the value of the item's brand property if the brand is in the name", () => {
    const resFood = apiFoodToFood(api_food_brand_in_name);
    expect(resFood).toEqual(food_no_brand);
  });

  it("mapFood returns nothing as the value of the item's quantity property if the quantity is in the name", () => {
    const resFood = apiFoodToFood(api_food_quantity_on_name);
    expect(resFood).toEqual(food_no_quantity_to_present);
  });

  it("mapFood returns item with g as the unit if no unit is provided", () => {
    const resFood = apiFoodToFood(api_food_no_quantity_unit);
    expect(resFood).toEqual(food);
  });

  it("getDate returns the correct string", () => {
    const mockDate = new Date(2024, 4, 25); 
    global.Date = jest.fn(() => mockDate) as any;

    const date = getDateModule.getDate();
    expect(date).toBe('25-5-2024');
  });
});

