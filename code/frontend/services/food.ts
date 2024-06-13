import fetchData from "@/assets/functions/getData";
import { localhost } from "@/constants";


export const searchFoodByName = async (query: string) =>
  fetchData(`${localhost}/api/food/search/name?query=${query}`);

export const searchFoodByBarcode = async (barcode: string) =>
  fetchData(`${localhost}/api/food/search/barcode?barcode=${barcode}`);

export const consumeFood = async (userToken: string | undefined, food: Food) =>
  fetchData(`${localhost}/api/food/consume`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(food),
  });

export const consumedFoodOfTheDay = async (
  userToken: string | undefined,
  date: string
) =>
  fetchData(`${localhost}/api/food/dailyConsumption?query=${date}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
