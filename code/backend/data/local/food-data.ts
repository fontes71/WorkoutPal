import { IFoodData } from "../../domain/interfaces";
import { Food, FoodFactsApiFood } from "../../domain/types";
import { getLocalData } from "../../utils/functions/data";


export class LocalFoodData implements IFoodData {
    async searchFood(query: string, skip: number, limit: number) {
        


        return (await getLocalData(
            "data/local/files/exercises.json"
          )) as FoodFactsApiFood[];
    }
  }