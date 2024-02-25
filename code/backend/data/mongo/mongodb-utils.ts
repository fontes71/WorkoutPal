import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  Exercise,
  ExerciseDB,
  convertExerciseDBToExercise,
} from "../../domain/types";
import { fetchData } from "../../utils/functions";
import { exercisedb_url, exercisedb_options } from "../../utils/constants";

dotenv.config();

const WORKOUTPAL_MONGO_URI: string = process.env.WORKOUTPAL_MONGO_URI;

export const exerciseSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    bodyPart: String,
    equipment: String,
    gifUrl: String,
    target: String,
    secondaryMuscles: [String],
    instructions: [String],
  },
  { versionKey: false }
);

export const ExerciseModel = mongoose.model("Exercises", exerciseSchema);

export async function cloneExerciseDB() {
  const exercisesdb: Array<ExerciseDB> = await fetchData(
    exercisedb_url,
    exercisedb_options
  );
  let exercises: Array<Exercise> = [];
  exercisesdb.forEach((obj) => {
    const exercise: Exercise = convertExerciseDBToExercise(obj);
    exercises.push(exercise);
  });

  await mongodbHandler(async () => {
    await ExerciseModel.insertMany(exercises);
  });
}

export async function mongodbHandler(action: () => Promise<any>) {
  try {
    await mongoose.connect(WORKOUTPAL_MONGO_URI);
    return await action();
  } finally {
    await mongoose.connection.close();
  }
}
