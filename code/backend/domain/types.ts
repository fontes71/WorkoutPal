export interface Exercise {
    _id: string,
    name: string, 
    bodyPart: string, 
    equipment: string, 
    gifUrl: string,
    target: string,
    secondaryMuscles: Array<string>,
    instructions: Array<string>
}

export interface ExerciseDB {
    id: string,
    name: string, 
    bodyPart: string, 
    equipment: string, 
    gifUrl: string,
    target: string,
    secondaryMuscles: Array<string>,
    instructions: Array<string>
}

export function convertExerciseDBToExercise(exerciseDB: ExerciseDB): Exercise {
    const { id, ...exercise } = exerciseDB
    return { _id: id, ...exercise }
}

export interface User {
    username: string, 
    email: string, 
    password: string, 
    token: string,
    workout_plans: Array<Object>,
    days: Array<Object>
}