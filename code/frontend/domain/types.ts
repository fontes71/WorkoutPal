export interface Food {
    id: string;
    name: string | null;
    brand: string;
    quantityToPresent: string;
    quantity: string,
    quantityUnit: string;
    imageUrl: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
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
  