import { router } from "expo-router";
import foodItemRoute from "@/assets/functions/foodItemRoute";
import {  deleteFood } from "@/services/food";



export const handlePress = async (food: Food) => {
    router.push(foodItemRoute(food));
  };

 export const deleteAction = async (token: string | undefined, index: number, setFood: React.Dispatch<React.SetStateAction<Food[] | null>>) => {
    const updatedFood = await deleteFood(token, index)
    if (updatedFood == null)
      return
    setFood(updatedFood)
  }



