import { Exercise, WorkoutPlan } from "../../../domain/types";

export const mockExercise: Exercise = {
    _id: "0001",
    name: "testExercise",
    bodyPart: "testBodyPart",
    equipment: "testEquipment",
    gifUrl: "testGifUrl",
    target: "testTarget",
    secondaryMuscles: ["testSecondaryMuscle1", "testSecondaryMuscle2"],
    instructions: ["testInstruction1", "testInstruction2"]
};

export const mockExercise2: Exercise = {
    _id: "0002",
    name: "testExercise2",
    bodyPart: "testBodyPart2",
    equipment: "testEquipment2",
    gifUrl: "testGifUrl2",
    target: "testTarget2",
    secondaryMuscles: ["testSecondaryMuscle3", "testSecondaryMuscle4"],
    instructions: ["testInstruction3", "testInstruction4"]
};

export const mockExercisesArray: Exercise[] = [mockExercise, mockExercise2];

export const mockWorkoutPlan: WorkoutPlan = {
    name: "testWorkoutPlan",
    description: "testDescription",
    exercises: ["0001", "0002"]
};

export const dailyLoggedWorkoutPlans = ["testWorkoutPlan"];