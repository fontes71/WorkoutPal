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

export interface WorkoutPlan {
  name: string;
  description: string;
  exercises: Array<string>;
}

export interface User {
  username: string;
  email: string;
  password: string;
  token: string;
  workout_plans: Array<WorkoutPlan>;
  days: Array<Day>;
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
  nutriscore_grade: string;
}

// ter quantity e quantity grams é provisório
export interface Food {
  id: string;
  name: string | null;
  brand: string;
  quantityToPresent: string;
  quantity: string,
  quantityUnit: string;
  imageUrl: string;
  calories: number;
  protein: string | null;
  fat: string | null;
  carbs: string | null;
  fiber: string | null;
  saturatedFat: string | null;
  salt: string | null;
  sodium: string | null;
  sugars: string | null;
  nutriscoreGrade: string | null;
}

export interface Day {
  date: string,
  consumedFoodList: ConsumedFood[]
}

export interface ConsumedFood {
  id: string,
  name: string | null;
  calories: number | null;
  protein: string | null;
  fat: string | null;
  carbs: string | null;
  fiber: string | null;
}
