import { localhost } from "@/constants";
import { Food } from "@/domain/types";

export const searchFoodByName = async (query: string) => {
  
  const res = await fetch(`${localhost}8080/api/food/search/name?query=${query}`);

  const resValue = await res.json()  
  return res.ok ? resValue.obj : null;
};

export const searchFoodByBarcode = async (barcode: string) => {
  const res = await fetch(`${localhost}8080/api/food/search/barcode?barcode=${barcode}`);

  const resValue = await res.json()
  return res.ok ? resValue.obj : null;
};

export const consumeFood = async (userToken: string | undefined, food: Food) => {
  console.log("token => ", userToken)
  const res = await fetch(
    `${localhost}8080/api/food/consume`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(food),
    }
  );
  const resValue = await res.json()
  return res.ok ? resValue.obj : null;
};

export const consumedFoodOfTheDay = async (userToken: string | undefined, date: string) => {
  const res = await fetch(
    `${localhost}8080/api/food/dailyConsumption?query=${date}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    }
  );

  const resValue = await res.json()
  return res.ok ? resValue.obj : null;
};
