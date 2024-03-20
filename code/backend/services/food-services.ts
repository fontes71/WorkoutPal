import { Exercise, Food, FoodFactsApiFood } from "../domain/types";
import { NotFoundError } from "../errors/app_errors";
import cron from "node-cron";
import {
  IExerciseData,
  IExerciseServices,
  IFoodData,
  IFoodServices,
} from "../domain/interfaces";
import { mapFood } from "../utils/functions/app/mapFood";

// try catch need on services cuz sometimes data throws error and the app stop inside services
export class FoodServices implements IFoodServices {
  private data: IFoodData;

  constructor(data: IFoodData) {
    this.data = data;
  }

  searchFood = async (query: string, skip: number, limit: number) => {
    const foodFactsApiFood: FoodFactsApiFood[] = await this.data.searchFood(
      query,
      skip,
      limit
    );

    const food: Food[] = mapFood(foodFactsApiFood);

    //if (food.length == 0) throw NotFoundError;
    return food;
  };
}
