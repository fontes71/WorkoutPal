export interface Exercise {
  _id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  secondaryMuscles: Array<string>;
  instructions: Array<string>;
}

export interface ExerciseDB {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  secondaryMuscles: Array<string>;
  instructions: Array<string>;
}

export interface User {
  username: string;
  email: string;
  password: string;
  token: string;
  workout_plans: Array<Object>;
  days: Array<Object>;
}



export interface FoodResponse {
    count: number,
    page: number,
    page_count: number,
    page_size: number,
    products: Food[],
    skip: number
}

export interface Food {
  product_name: string;
  nutriscore: Nutriscore;
}

export interface Nutriscore {
  fiber_points?: number;
  saturated_fat_points?: number;
  is_cheese?: number;
  fiber?: number;
  proteins_points?: number;
  energy?: number;
  sugars_value?: number;
  proteins?: number;
  saturated_fat_value?: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils_points?: number;
  negative_points?: number;
  energy_points?: number;
  is_beverage?: number;
  score?: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils_value?: number;
  is_water?: number;
  saturated_fat_ratio_value?: number;
  proteins_value?: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils?: number;
  positive_points?: number;
  saturated_fat_ratio_points?: number;
  sodium?: number;
  saturated_fat?: number;
  fiber_value?: number;
  is_fat?: number;
  sodium_value?: number;
  sodium_points?: number;
  saturated_fat_ratio?: number;
  grade?: string;
  sugars?: number;
  energy_value?: number;
  sugars_points?: number;
}
