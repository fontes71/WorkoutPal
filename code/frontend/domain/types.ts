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

export interface WorkoutPlan {
    name: string;
    description: string;
    exercises: Array<string>;
}

export interface ExercisesFromWorkoutPlanResponse {
    message: string;
    obj: Exercise[];
}

export interface ExerciseResponse {
    message: string;
    obj: Exercise[];
}

export interface WorkoutPlanResponse {
    message: string;
    obj: WorkoutPlan[];
}
  