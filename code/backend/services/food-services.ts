import {
  ConsumedFood,
  Exercise,
  Food,
  FoodFactsApiFood,
  User,
} from "../domain/types";
import {
  InvalidConsumedFoodIndex,
  NoItemToDelete,
  NotFoundError,
  UnauthorizedError,
} from "../errors/app_errors";
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
import { SEARCH_FOOD_BY_NAME_RES_LIMIT } from "../utils/constants";

export class FoodServices implements IFoodServices {
  private foodData: IFoodData;
  private userData: IUserData;

  constructor(foodData: IFoodData, userData: IUserData) {
    this.foodData = foodData;
    this.userData = userData;
  }

  searchByName = async (query: string, page: number) => {
    return transactionHandler(async () => {
      const apiFood: FoodFactsApiFood[] = await this.foodData.searchByName(
        query,
        page,
        SEARCH_FOOD_BY_NAME_RES_LIMIT
      );

      if (!apiFood.length) return [];

      const food: Food[] = apiFood.map((apiFood) => apiFoodToFood(apiFood));

      return food;
    });
  };

  searchByBarcode = async (barcode: number) => {
    return transactionHandler(async () => {
      const apiFood: FoodFactsApiFood = await this.foodData.searchByBarcode(
        barcode
      );

      if (!apiFood) return {};

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
    carbs: string | null
  ) => {
    return transactionHandler(async () => {
      const consumedFood: ConsumedFood = {
        id: id,
        name: name,
        calories: calories,
        protein: protein,
        fat: fat,
        carbs: carbs,
      };

      const user: User | null = await this.userData.getUserByToken(token);

      const date = getDate();

      if (!user) throw UnauthorizedError;

      const dayIndex = user.days.findIndex((day) => day.date === date);

      if (dayIndex == -1) {
        user.days = [
          ...user.days,
          { date: date, consumedFood: [consumedFood], workoutPlansDone: [] },
        ];
      } else {
        const day = user.days[dayIndex];
        user.days[dayIndex] = {
          ...day,
          consumedFood: [...day.consumedFood, consumedFood],
        };
      }

      await this.userData.updateUser(token, user);
    });
  };

  delete = async (token: string, index: number) => {
    return transactionHandler(async () => {
      const user: User | null = await this.userData.getUserByToken(token);

      const date = getDate();

      if (!user) throw UnauthorizedError;

      const dayIndex = user.days.findIndex((day) => day.date === date);

      const consumedFoodLength = user.days[dayIndex].consumedFood.length

      if (dayIndex == -1 || consumedFoodLength == 0) 
        throw NoItemToDelete;

      if (consumedFoodLength <= index || index < 0)
        throw InvalidConsumedFoodIndex;

      user.days[dayIndex].consumedFood.splice(index, 1);

      await this.userData.updateUser(token, user);
      return user.days[dayIndex].consumedFood
    });
  };

  dailyConsumption = async (token: string, date: string) => {
    return transactionHandler(async () => {
      const user: User | null = await this.userData.getUserByToken(token);

      if (!user) throw UnauthorizedError;

      const day = user.days.find((day) => day.date === date);

      if (!day) return [];

      return day.consumedFood;
    });
  };
}
