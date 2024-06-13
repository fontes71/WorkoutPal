import foodItemRoute from "@/assets/functions/foodItemRoute";
import { Food } from "@/domain/types";
import { router } from "expo-router";

export const addCommaIfNeeded = (noComma: boolean, str: string) =>
    noComma ? str : `${str}, `;

export const capitalizeWords = (str: string | null) => {
    if (str === null) {
      return null;
    }
  
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

 export const handleFoodPress = async (food: Food) => {
    router.push(foodItemRoute(food));
  };
  
