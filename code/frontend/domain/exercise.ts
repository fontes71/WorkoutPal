type Exercise = {
    _id: string;
    name: string;
    bodyPart: string;
    equipment: string;
    gifUrl: string;
    target: string;
    secondaryMuscles: Array<string>;
    instructions: Array<string>;
}

type  WorkoutPlan = {
    name: string;
    description: string;
    exercises: Array<string>;
}

type ExercisesFromWorkoutPlanResponse = {
    message: string;
    obj: Exercise[];
}

type ExerciseResponse = {
    message: string;
    obj: Exercise[];
}

type WorkoutPlanResponse = {
    message: string;
    obj: WorkoutPlan[];
}
  