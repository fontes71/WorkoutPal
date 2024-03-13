import { ExerciseModel, mongodbHandler } from "./mongodb-utils";
import {
  Exercise,
  ExerciseDB,
  FoodResponse,
} from "../../domain/types";
import { convertExerciseDBToExercise, fetchData, rewriteFileWithObject } from "../../utils/functions";
import { exercisedb_url, exercisedb_options } from "../../utils/constants";
import { IExerciseData, IFoodData } from "../../domain/interfaces";

export class FoodData implements IFoodData {
  
  searchFood(query: string, skip: number, limit: number) {
    return mongodbHandler(async () => {
      const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&fields=product_name,nutriscore_data&json=1`)
      const foodRes: FoodResponse = await res.json()
      return foodRes.products;
    });
  }
}
