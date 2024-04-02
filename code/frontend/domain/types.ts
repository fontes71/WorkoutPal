export interface Food {
    id: string;
    name: string | null;
    brand: string;
    quantity: string;
    imageUrl: string;
    calories: number;
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
  