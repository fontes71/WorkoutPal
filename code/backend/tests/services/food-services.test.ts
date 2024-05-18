import express from "express";

import { Food, User } from "../../domain/types.ts";
import { FoodServices } from "../../services/food-services.ts";
import { FoodData } from "../../data/external/food-data.ts";
import { UserData } from "../../data/external/user-data.ts";
import { data_return_search_by_name, services_return_search_by_name } from "../data/food.ts";
import { NotFoundError } from "../../errors/app_errors.ts";

let foodServices: FoodServices;
let foodData: FoodData;
let userData: UserData;

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
    }
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
});


describe("searchByName", () => {

  it("returns successfully", async () => {
    foodData.searchByName = jest.fn().mockResolvedValue(data_return_search_by_name);

    const food = await foodServices.searchByName("egg", 0, 0);

    expect(food).toEqual(services_return_search_by_name);
  });

  it("throws not found exception if no results were found", async () => {
    foodData.searchByName = jest.fn().mockResolvedValue([]);

    expect(async () => {
      await foodServices.searchByName("egg", 0, 0);
    }).rejects.toThrow();

  });

})
  /*
  it("throws exception if there's no matching elements", async () => {
    await expect(services.searchByName("notAFood", 0, 0)).rejects.toThrow(
      "NotFoundError"
    );
  });

  it("mapFood returns correct value", () => {
    const food: Food[] = mapFood(food_facts_egg);
    expect(food[0]).toEqual(egg);
  });

  it("mapFood returns item with its english name if the original is not available", () => {
    const food: Food[] = mapFood(food_facts_egg_2);
    expect(food[0]).toEqual(egg);
  });

  it("mapFood returns nothing as the value of the item's brand property if the brand is in the name", () => {
    const food: Food[] = mapFood(food_facts_egg_3);
    expect(food[0]).toEqual(egg_2);
  });

  it("mapFood returns nothing as the value of the item's quantity property if the quantity is in the name", () => {
    const food: Food[] = mapFood(food_facts_egg_4);
    expect(food[0]).toEqual(egg_2);
  });

});
  */
