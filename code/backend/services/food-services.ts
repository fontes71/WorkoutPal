import {
  ConsumedFood,
  Exercise,
  Food,
  FoodFactsApiFood,
  User,
} from "../domain/types";
import { NotFoundError } from "../errors/app_errors";
import cron from "node-cron";
import {
  IAuthData,
  IExerciseData,
  IExerciseServices,
  IFoodData,
  IFoodServices,
} from "../domain/interfaces";
import { mapFood } from "../utils/functions/app/mapFood";
import getDate from "../utils/functions/app/getDate";
import { mongodbHandler } from "../utils/functions/data";

// try catch need on services cuz sometimes data throws error and the app stop inside services
export class FoodServices implements IFoodServices {
  private foodData: IFoodData;
  private authData: IAuthData;

  constructor(foodData: IFoodData, authData: IAuthData) {
    this.foodData = foodData;
    this.authData = authData;
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

    const user: User | null = await this.authData.getUserByToken(token)
    console.log("got user")
    const date = getDate()

    // provisorio
    
    if (!user)
        return null
      

    const day = user.days.find(day => day.date === date);

    if (day)
      this.foodData.insertConsumedFood(day, consumedFood)
    else 
    this.foodData.insertDayAndConsumedFood(user, date, consumedFood)

    console.log("end")

  };
}
