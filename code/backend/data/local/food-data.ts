import { IFoodData } from "../../domain/interfaces";


export class LocalFoodData implements IFoodData {
    async searchFood(query: string, skip: number, limit: number) {
        const food = (await getLocalData(
            "data/local/files/exercises.json"
          )) as Food[];
    }
  }