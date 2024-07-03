import {
  Food,
  FoodFactsApiFood,
  User,
} from "../domain/types";
import {
  InvalidBarcodeError,
  InvalidDateError,
  InvalidLogIndexError,
  InvalidLoggedFoodIndexError,
  NoItemToDeleteError,
  UnauthorizedError,
} from "../errors/app_errors";
import {
  IFoodData,
  IFoodServices,
  IUserData,
} from "../domain/interfaces";
import { apiFoodToFood } from "../utils/functions/app/apiFoodToFood";
import getDate from "../utils/functions/app/getDate";
import { transactionHandler } from "../utils/functions/data";
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

      const food = apiFood.map((apiFood) => apiFoodToFood(apiFood)).filter(res => res != null)

      return food;
    });
  };

  searchByBarcode = async (barcode: number) => {
    return transactionHandler(async () => {
      const apiFood: FoodFactsApiFood = await this.foodData.searchByBarcode(
        barcode
      );

      if (!apiFood) throw InvalidBarcodeError;

      const food = apiFoodToFood(apiFood);

      if (!food) throw InvalidBarcodeError;

      return food;
    });
  };

  log = async (
    token: string,
    foodItem: Food,
    date: string
  ) => {
    return transactionHandler(async () => {
      const user: User | null = await this.userData.getUserByToken(token);

      if (!user) throw UnauthorizedError;

      const dayIndex = user.days.findIndex((day) => day.date === date);


      let loggedFoodRes: Food[] = [];

      if (dayIndex == -1) {
        user.days = [
          ...user.days,
          { date: date, loggedFood: [foodItem], workoutPlansDone: [] },
        ];
        loggedFoodRes = [foodItem]
      } else {
        const day = user.days[dayIndex];
        user.days[dayIndex] = {
          ...day,
          loggedFood: [...day.loggedFood, foodItem],
        };
        loggedFoodRes = user.days[dayIndex].loggedFood;
        
      }
      
      await this.userData.updateUser(token, user);
      return loggedFoodRes
    });
  };

  updateLog = async (
    token: string,
    foodItem: Food,
    date: string,
    logIndex: number
  ) => {
    return transactionHandler(async () => {

      const user: User | null = await this.userData.getUserByToken(token);
      if (!user) throw UnauthorizedError;

      const dayIndex = user.days.findIndex((day) => day.date === date);

      if (dayIndex == -1)
        throw InvalidDateError

      user.days[dayIndex].loggedFood[logIndex] = foodItem;

      await this.userData.updateUser(token, user);
      return user.days[dayIndex].loggedFood
    });
  };

  deleteLog = async (token: string, logIndex: number, date: string) => {
    return transactionHandler(async () => {
      const user: User | null = await this.userData.getUserByToken(token);

      if (!user) throw UnauthorizedError;

      const dayIndex = user.days.findIndex((day) => day.date === date);

      if (dayIndex == -1)
        throw InvalidDateError;

      const loggedFoodLength = user.days[dayIndex].loggedFood.length

      if (loggedFoodLength == 0) 
        throw NoItemToDeleteError;

      if (loggedFoodLength <= logIndex)
        throw InvalidLogIndexError;

      user.days[dayIndex].loggedFood.splice(logIndex, 1);

      await this.userData.updateUser(token, user);
      return user.days[dayIndex].loggedFood
    });
  };

  dailyConsumption = async (token: string, date: string) => {
    return transactionHandler(async () => {
      const user: User | null = await this.userData.getUserByToken(token);

      if (!user) throw UnauthorizedError;

      const day = user.days.find((day) => day.date === date);

      if (!day) return [];

      return day.loggedFood;
    });
  };
}
