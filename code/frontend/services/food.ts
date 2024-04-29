import postOptions from "@/assets/functions/postOptions";
import { localhost } from "@/constants";
import { Food } from "@/domain/types";

export const searchFood = async (query: string) => {
  const res = await fetch(`${localhost}8080/api/food/search?query=${query}`);
  return res.json()
};

export const consumeFood = async (food: Food) => {
    const res = await fetch(`${localhost}8080/api/food/consume`, postOptions(food))
    return res.json()
}