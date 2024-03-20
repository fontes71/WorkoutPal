import express from "express";


import { FoodApi } from "../api/food-api.ts";
import { FoodServices } from "../services/food-services.ts";
import { FoodData } from "../data/mongo/food-data.ts";
import { LocalFoodData } from "../data/local/food-data.ts";

const foodData = new LocalFoodData();
const foodServices = new FoodServices(foodData);
const foodApi = new FoodApi(foodServices, foodData);

describe("mapFood function", () => {

})