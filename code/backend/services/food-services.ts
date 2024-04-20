import {
  ConsumedFood,
  Exercise,
  Food,
  FoodFactsApiFood,
  User,
} from "../domain/types";
import { NotFoundError, Unauthorized } from "../errors/app_errors";
import cron from "node-cron";
import {
  IAuthData,
  IExerciseData,
  IExerciseServices,
  IFoodData,
  IFoodServices,
  IUserData,
} from "../domain/interfaces";
import { mapFood } from "../utils/functions/app/mapFood";
import getDate from "../utils/functions/app/getDate";
import { mongodbHandler } from "../utils/functions/data";

// try catch need on services cuz sometimes data throws error and the app stop inside services
export class FoodServices implements IFoodServices {
  private foodData: IFoodData;
  private userData: IUserData;

  constructor(foodData: IFoodData, userData: IUserData) {
    this.foodData = foodData;
    this.userData = userData;
  }

  searchFood = async (query: string, skip: number, limit: number) => {
    const foodFactsApiFood: FoodFactsApiFood[] = await this.foodData.searchFood(
      query,
      skip,
      limit
    );

    if (!foodFactsApiFood.length) throw NotFoundError;

    const food: Food[] = mapFood(foodFactsApiFood);

    return food;
  };

  consumeFood = async (
    token: string,
    id: string,
    name: string | null,
    calories: number | null,
    protein: string | null,
    fat: string | null,
    carbs: string | null,
    fiber: string | null
  ) => {
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

      if (!user) throw Unauthorized;

      let dayIndex = user.days.findIndex((day) => day.date === date);

      if (dayIndex==-1) {
        user.days = [...user.days, { date: date, consumedFoodList: [consumedFood] }];
      } else {
        const day =  user.days[dayIndex]
        user.days[dayIndex] = {
          ...day,
          consumedFoodList: [...day.consumedFoodList, consumedFood]
        };
      }
      
       this.userData.updateUser(token, user).catch((err) => console.log(err));

  };
}
