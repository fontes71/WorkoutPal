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
  nutriments: Nutriments;
  image_front_thumb_url: string;
}

export interface Food {
  id: string;
  name: string | null;
  brand: string;
  quantity: string;
  imageUrl: string;
  calories: number;
}

interface Nutriments {
  carbohydrates: number;
  carbohydrates_100g: number;
  carbohydrates_prepared: number;
  carbohydrates_prepared_100g: number;
  carbohydrates_prepared_serving: number;
  carbohydrates_prepared_unit: string;
  carbohydrates_prepared_value: number;
  carbohydrates_serving: number;
  carbohydrates_unit: string;
  carbohydrates_value: number;
  "carbon-footprint-from-known-ingredients_product": number;
  "carbon-footprint-from-known-ingredients_serving": number;
  energy: number;
  "energy-kcal": number;
  "energy-kcal_100g": number;
  "energy-kcal_prepared": number;
  "energy-kcal_prepared_100g": number;
  "energy-kcal_prepared_serving": number;
  "energy-kcal_prepared_unit": string;
  "energy-kcal_prepared_value": number;
  "energy-kcal_serving": number;
  "energy-kcal_unit": string;
  "energy-kcal_value": number;
  "energy-kcal_value_computed": number;
  "energy-kj": number;
  "energy-kj_100g": number;
  "energy-kj_prepared": number;
  "energy-kj_prepared_100g": number;
  "energy-kj_prepared_serving": number;
  "energy-kj_prepared_unit": string;
  "energy-kj_prepared_value": number;
  "energy-kj_serving": number;
  "energy-kj_unit": string;
  "energy-kj_value": number;
  "energy-kj_value_computed": number;
  energy_100g: number;
  energy_prepared: number;
  energy_prepared_100g: number;
  energy_prepared_serving: number;
  energy_prepared_unit: string;
  energy_prepared_value: number;
  energy_serving: number;
  energy_unit: string;
  energy_value: number;
  fat: number;
  fat_100g: number;
  fat_prepared: number;
  fat_prepared_100g: number;
  fat_prepared_serving: number;
  fat_prepared_unit: string;
  fat_prepared_value: number;
  fat_serving: number;
  fat_unit: string;
  fat_value: number;
  fiber_prepared: number;
  fiber_prepared_100g: number;
  fiber_prepared_serving: number;
  fiber_prepared_unit: string;
  fiber_prepared_value: number;
  fiber_unit: string;
  "fruits-vegetables-legumes-estimate-from-ingredients_100g": number;
  "fruits-vegetables-legumes-estimate-from-ingredients_serving": number;
  "fruits-vegetables-nuts-estimate-from-ingredients_100g": number;
  "fruits-vegetables-nuts-estimate-from-ingredients_serving": number;
  "nova-group": number;
  "nova-group_100g": number;
  "nova-group_serving": number;
  "nutrition-score-fr": number;
  "nutrition-score-fr_100g": number;
  proteins: number;
  proteins_100g: number;
  proteins_prepared: number;
  proteins_prepared_100g: number;
  proteins_prepared_serving: number;
  proteins_prepared_unit: string;
  proteins_prepared_value: number;
  proteins_serving: number;
  proteins_unit: string;
  proteins_value: number;
  salt: number;
  salt_100g: number;
  salt_prepared: number;
  salt_prepared_100g: number;
  salt_prepared_serving: number;
  salt_prepared_unit: string;
  salt_prepared_value: number;
  salt_serving: number;
  salt_unit: string;
  salt_value: 0.272;
  "saturated-fat": 17.3;
  "saturated-fat_100g": 17.3;
  "saturated-fat_prepared": 3.7;
  "saturated-fat_prepared_100g": 17.2;
  "saturated-fat_prepared_serving": 3.7;
  "saturated-fat_prepared_unit": "g";
  "saturated-fat_prepared_value": 3.7;
  "saturated-fat_serving": 3.72;
  "saturated-fat_unit": "g";
  "saturated-fat_value": 17.3;
  sodium: 0.1088;
  sodium_100g: 0.1088;
  sodium_prepared: 0.0232;
  sodium_prepared_100g: 0.108;
  sodium_prepared_serving: 0.0232;
  sodium_prepared_unit: "g";
  sodium_prepared_value: 0.0232;
  sodium_serving: 0.0234;
  sodium_unit: "g";
  sodium_value: 0.1088;
  sugars: 41.2;
  sugars_100g: 41.2;
  sugars_prepared: 8.9;
  sugars_prepared_100g: 41.4;
  sugars_prepared_serving: 8.9;
  sugars_prepared_unit: "g";
  sugars_prepared_value: 8.9;
  sugars_serving: 8.86;
  sugars_unit: "g";
  sugars_value: 41.2;
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
