import customFetch from "@/assets/functions/customFetch";
import { localhost } from "@/constants";


export const searchFoodByName = async (query: string, page: number) =>
  customFetch(`${localhost}/api/food/search/name?query=${query}&page=${page}`);

export const searchFoodByBarcode = async (barcode: string) =>
  customFetch(`${localhost}/api/food/search/barcode?barcode=${barcode}`);

export const consumeFood = async (userToken: string | undefined, food: Food) => 
  customFetch(`${localhost}/api/food/consume`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(food),
  });


export const deleteFood = async (userToken: string | undefined, index: number) =>  customFetch(`${localhost}/api/food/delete/${index}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
  });


export const consumedFoodOfTheDay = async (
  userToken: string | undefined,
  date: string
) =>
  customFetch(`${localhost}/api/food/dailyConsumption?query=${date}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
