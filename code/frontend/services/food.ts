import postOptions from "@/assets/functions/postOptions";
import { localhost } from "@/constants";
import { Food } from "@/domain/types";

export const searchFoodByName = async (query: string) => {
  const res = await fetch(`${localhost}8080/api/food/search/name?query=${query}`);

  return res.ok ? res.json() : null;
};

export const searchFoodByBarcode = async (barcode: string) => {
  const res = await fetch(`${localhost}8080/api/food/search/barcode?barcode=${barcode}`);

  return res.ok ? res.json() : null;
};

export const consumeFood = async (food: Food) => {
  const res = await fetch(
    `${localhost}8080/api/food/consume`,
    postOptions(food)
  );
  return res.ok ? res.json() : null;
};

export const consumedFoodOfTheDay = async (date: string) => {
  const res = await fetch(
    `${localhost}8080/api/food/dailyConsumption?query=${date}`
  );
  return res.ok ? res.json() : null;
};
