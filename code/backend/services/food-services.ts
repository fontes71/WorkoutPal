import {
  ConsumedFood,
  Exercise,
  Food,
  FoodFactsApiFood,
  User,
} from "../domain/types";
import { NotFoundError, UnauthorizedError } from "../errors/app_errors";
import cron from "node-cron";
import {
  IAuthData,
  IExerciseData,
  IExerciseServices,
  IFoodData,
  IFoodServices,
  IUserData,
} from "../domain/interfaces";
import { apiFoodToFood } from "../utils/functions/app/apiFoodToFood";
import getDate from "../utils/functions/app/getDate";
import { mongodbHandler, transactionHandler } from "../utils/functions/data";

// try catch need on services cuz sometimes data throws error and the app stop inside services
export class FoodServices implements IFoodServices {
  private foodData: IFoodData;
  private userData: IUserData;

  constructor(foodData: IFoodData, userData: IUserData) {
    this.foodData = foodData;
    this.userData = userData;
  }

  searchByName = async (query: string, skip: number, limit: number) => {
    return transactionHandler(async () => {
      const apiFood: FoodFactsApiFood[] = await this.foodData.searchByName(
        query,
        skip,
        limit
      );

      if (!apiFood.length) throw NotFoundError;

      const food: Food[] = apiFood.map((apiFood) => apiFoodToFood(apiFood));

      return food;
    });
  };

  searchByBarcode = async (barcode: number) => {
    return transactionHandler(async () => {
      const apiFood: FoodFactsApiFood = await this.foodData.searchByBarcode(
        barcode
      );

      if (!apiFood) throw NotFoundError;

      const food: Food = apiFoodToFood(apiFood);

      return food;
    });
  };

  consume = async (
    token: string,
    id: string,
    name: string | null,
    calories: number | null,
    protein: string | null,
    fat: string | null,
    carbs: string | null,
    fiber: string | null
  ) => {
    return transactionHandler(async () => {
      const consumedFood: ConsumedFood = {
        id: id,
        name: name,
        calories: calories,
        protein: protein,
        fat: fat,
        carbs: carbs,
        fiber: fiber,
      };
      
      const user: User | null = await this.userData.getUserByToken(token);

      const date = getDate();

      if (!user) throw UnauthorizedError;

      let dayIndex = user.days.findIndex((day) => day.date === date);

      if (dayIndex == -1) {
        user.days = [
          ...user.days,
          { date: date, consumedFood: [consumedFood] },
        ];
      } else {
        const day = user.days[dayIndex];
        user.days[dayIndex] = {
          ...day,
          consumedFood: [...day.consumedFood, consumedFood],
        };
      }

      this.userData.updateUser(token, user);
    });
  };

  dailyConsumption = async (token: string, date: string) => {
    return transactionHandler(async () => {
      const user: User | null = await this.userData.getUserByToken(token);

      if (!user) throw UnauthorizedError;

      const day = user.days.find((day) => day.date === date);

      if (!day) throw NotFoundError;

      return day.consumedFood;
    });
  };
}
