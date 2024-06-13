import { Food } from "@/domain/types";

export type FoodResultTextProps = {
    nameString: string;
    brandString: string;
    calorieString: string;
    quantity: string;
  }

  export  type FoodResultsProps = {
    results: Food[]
  }