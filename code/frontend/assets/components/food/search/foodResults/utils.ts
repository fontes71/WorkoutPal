import foodItemRoute from "@/assets/functions/foodItemRoute";
import { searchFoodByName } from "@/services/food";
import { router } from "expo-router";
import { FoodDetailsHookType } from "../../details/index/types";

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
  router.push(foodItemRoute(food, FoodDetailsHookType.Log));
};

const newSearchOrAppend = (res: Food[], newResults: Food[], page: number) => page == 1 ? newResults : [...res, ...newResults]

export const fetchResults = async (
  name: string,
  setResults: React.Dispatch<React.SetStateAction<Food[]>>,
  page: number
) => {

    const newResults: Food[] | null = await searchFoodByName(name, page);

    if (newResults == null)
      return 
    setResults((res) =>  newSearchOrAppend(res, newResults, page));
};