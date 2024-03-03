import { ExerciseModel, mongodbHandler } from "./mongodb-utils";
import {
  Exercise,
  ExerciseDB,
  convertExerciseDBToExercise,
} from "../../domain/types";
import { fetchData } from "../../utils/functions";
import { exercisedb_url, exercisedb_options } from "../../utils/constants";
import { rewriteFileWithObject } from "../../utils/functions";

export class Data {
  getExerciseById(id: string) {
    return mongodbHandler(async () => {
      const exercise = ExerciseModel.findOne({ _id: id });
      return exercise;
    });
  }

  async cloneExerciseDB() {
    const exercisesFromDB: Array<ExerciseDB> = await fetchData(
      exercisedb_url,
      exercisedb_options
    );

    let exercises: Array<Exercise> = [];
    exercisesFromDB.forEach((obj) => {
      const exercise: Exercise = convertExerciseDBToExercise(obj);
      exercises.push(exercise);
    });


    await mongodbHandler(async () => {
      await ExerciseModel.deleteMany({});
      await ExerciseModel.insertMany(exercises);
    });

    rewriteFileWithObject("data/local/files/exercises.json", exercises)

  }
}
