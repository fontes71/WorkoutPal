import { IFoodData } from "../../domain/interfaces";
import { Food, FoodFactsApiFood } from "../../domain/types";
import { getLocalData } from "../../utils/functions/data";

export class LocalFoodData implements IFoodData {
  async searchFood(query: string, skip: number, limit: number) {
    const { products } = await getLocalData(`data/local/files/food/${query}.json`);
    return products as FoodFactsApiFood[]
  }
}
