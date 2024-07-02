import { router } from "expo-router";
import foodItemRoute from "@/assets/functions/foodItemRoute";
import {  deleteLog } from "@/services/food";
import { FoodDetailsHookType } from "../../details/index/types";
import getDate from "@/assets/functions/getDate";




export const handlePress = async (food: Food, logIndex: number) => {
    router.push(foodItemRoute(food, FoodDetailsHookType.Update, logIndex));
  };

 export const deleteAction = async (token: string | undefined, index: number, setFood: React.Dispatch<React.SetStateAction<Food[] | null>>) => {
  const date = getDate()
    const updatedFood = await deleteLog(token, index, date)
    if (updatedFood == null)
      return
    setFood(updatedFood)
  }



