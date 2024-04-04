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

export interface FoodFactsApiFood {
  id: string;
  product_name: string;
  product_name_en: string;
  brands_tags: string[];
  quantity: string;
  product_quantity: string,
  product_quantity_unit: string;
  image_front_url: string;
  nutriments: any;
}

// ter quantity e quantity grams é provisório
export interface Food {
  id: string;
  name: string | null;
  brand: string;
  quantity: string;
  quantity_grams: string,
  quantity_unit: string;
  imageUrl: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}
