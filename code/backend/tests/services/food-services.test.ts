import express from "express";

import {
  food_results,

} from "../files/food.ts";
import { Food, User } from "../../domain/types.ts";
import { FoodServices } from "../../services/food-services.ts";
import { FoodData } from "../../data/external/food-data.ts";
import { UserData } from "../../data/external/user-data.ts";



let foodServices: FoodServices;
let foodData: FoodData;
let userData: UserData

beforeEach(() => {
  foodData = new FoodData();
  userData = new UserData();
  foodServices = new FoodServices(foodData, userData);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("searchFood", () => {
  it("returns successfully", async () => {
    const mockUser = {a
      username: 'testuser',
      password: 'testpassword',
      email: 'testemail@test.com',
    };

    foodData.searchByName = jest.fn().mockResolvedValue(null);

    const food = await foodServices.searchByName("egg", 0, 0);

    expect(food).toEqual(null);
  });
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
  */
});
