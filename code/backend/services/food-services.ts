import {
  Food,
  FoodFactsApiFood,
  User,
} from "../domain/types";
import {
  InvalidBarcode,
  InvalidConsumedFoodIndex,
  NoItemToDelete,
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

      if (!apiFood) throw InvalidBarcode;

      const food = apiFoodToFood(apiFood);

      if (!food) throw InvalidBarcode;

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

      let consumedFoodRes: Food[] = [];

      if (dayIndex == -1) {
        user.days = [
          ...user.days,
          { date: date, consumedFood: [foodItem], workoutPlansDone: [] },
        ];
        consumedFoodRes = [foodItem]
      } else {
        const day = user.days[dayIndex];
        user.days[dayIndex] = {
          ...day,
          consumedFood: [...day.consumedFood, foodItem],
        };
        consumedFoodRes = user.days[dayIndex].consumedFood;
        
      }

      await this.userData.updateUser(token, user);
      return consumedFoodRes
    });
  };

  delete = async (token: string, index: number) => {
    return transactionHandler(async () => {
      const user: User | null = await this.userData.getUserByToken(token);

      const date = getDate();

      if (!user) throw UnauthorizedError;

      const dayIndex = user.days.findIndex((day) => day.date === date);

      if (dayIndex == -1 )
        throw NoItemToDelete;

      const consumedFoodLength = user.days[dayIndex].consumedFood.length

      if (consumedFoodLength == 0) 
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
