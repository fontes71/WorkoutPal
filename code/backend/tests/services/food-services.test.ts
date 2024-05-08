import express from "express";

import { FoodApi } from "../../api/food-api.ts";
import { FoodServices } from "../../services/food-services.ts";
import { LocalFoodData } from "../../data/local/food-data.ts";
import {
  food_results,
  food_facts_egg,
  egg,
  food_facts_egg_2,
  food_facts_egg_3,
  egg_2,
  food_facts_egg_4,
} from "../files/food.ts";
import { NotFoundError } from "../../errors/app_errors.ts";
import { mapFood } from "../../utils/functions/app/apiFoodToFood.ts";
import { Food } from "../../domain/types.ts";

const data = new LocalFoodData();
const services = new FoodServices(data);
const api = new FoodApi(services, data);

describe("searchFood", () => {
  it("returns successfully", async () => {
    const food = await services.searchFood("egg", 0, 0);
    expect(food).toEqual(food_results);
  });

  it("throws exception if there's no matching elements", async () => {
    await expect(services.searchFood("notAFood", 0, 0)).rejects.toThrow(
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
