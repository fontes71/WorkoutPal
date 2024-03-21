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
  image_front_url: string;
  nutriments: any
}

export interface Food {
  id: string;
  name: string | null;
  brand: string;
  quantity: string;
  imageUrl: string;
  calories: number;
}