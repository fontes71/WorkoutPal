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

export interface ValueAndUnit {
  value: number,
  unit: string 
}

export interface MainNutrients {
  calories: number;
  protein: ValueAndUnit;
  fat: ValueAndUnit;
  carbs: ValueAndUnit;
}

export interface SecondaryNutrients {
  fiber: ValueAndUnit | null;
  saturatedFat: ValueAndUnit | null;
  salt: ValueAndUnit | null;
  sodium: ValueAndUnit | null;
  sugars: ValueAndUnit | null;

}


export interface Food {
  id: string;
  name: string;
  brand: string;
  quantity: ValueAndUnit
  imageUrl: string;
  mainNutrients: MainNutrients,
  secondaryNutrients: SecondaryNutrients,
  nutriscoreGrade: string | null;
}

export interface Day {
  date: string,
  consumedFood: Food[],
  workoutPlansDone: string[]
}