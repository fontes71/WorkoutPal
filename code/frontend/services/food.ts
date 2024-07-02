import customFetch from "@/assets/functions/customFetch";
import { localhost } from "@/constants";


export const searchFoodByName = async (query: string, page: number) =>
  customFetch(`${localhost}/api/food/search/name?query=${query}&page=${page}`);

export const searchFoodByBarcode = async (barcode: string) =>
  customFetch(`${localhost}/api/food/search/barcode?barcode=${barcode}`);

export const logFood = async (userToken: string | undefined, food: Food, date: string) => 
  customFetch(`${localhost}/api/food/log`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({food: food, date: date}),
  });

  export const updateLog = async (userToken: string | undefined, food: Food, date: string, logIndex: number) => 
    customFetch(`${localhost}/api/food/updateLog`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({food: food, date: date, logIndex: logIndex}),
    });


export const deleteLog = async (userToken: string | undefined, logIndex: number, date: string) =>  customFetch(`${localhost}/api/food/deleteLog/${logIndex}?date=${date}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
  });


export const consumedFoodOfTheDay = async (
  userToken: string | undefined,
  date: string
) =>
  customFetch(`${localhost}/api/food/dailyConsumption/${date}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
