
import { exercisedb_url, exercisedb_options } from "../../utils/constants";
import { IExerciseData } from "../../domain/interfaces";
import { convertExerciseDBToExercise, fetchData, mongodbHandler, rewriteFileWithObject } from "../../utils/functions/data";
import { ExerciseModel } from "./mongoose";
import { Exercise, ExerciseDB } from "../../domain/types";

export class ExerciseData implements IExerciseData {
  getExerciseById(id: string) {
    return mongodbHandler(async () => {
      const exercise = ExerciseModel.findOne({ _id: id });
      return exercise;
    });
  }

  searchExercisesByName(name: string, skip: number, limit: number) {
    return mongodbHandler(async () => {
      const exercises = ExerciseModel.find({ name: { $regex: `${name}` } })
        .skip(skip)
        .limit(limit);
      return exercises;
    });
  }

  searchExercisesByBodyPart(bodyPart: string, skip: number, limit: number) {
    return mongodbHandler(async () => {
      const exercises = ExerciseModel.find({
        bodyPart: { $regex: `${bodyPart}` },
      })
        .skip(skip)
        .limit(limit);
      return exercises;
    });
  }

  searchExercisesByEquipment(equipment: string, skip: number, limit: number) {
    return mongodbHandler(async () => {
      const exercises = ExerciseModel.find({
        equipment: { $regex: `${equipment}` },
      })
        .skip(skip)
        .limit(limit);
      return exercises;
    });
  }

  searchExercisesByTarget(target: string, skip: number, limit: number) {
    return mongodbHandler(async () => {
      const exercises = ExerciseModel.find({ target: { $regex: `${target}` } })
        .skip(skip)
        .limit(limit);
      return exercises;
    });
  }

  searchExercisesBySecondaryMuscle(
    secondaryMuscle: string,
    skip: number,
    limit: number
  ) {
    return mongodbHandler(async () => {
      const exercises = ExerciseModel.find({
        secondaryMuscles: { $regex: `${secondaryMuscle}` },
      })
        .skip(skip)
        .limit(limit);
      return exercises;
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

    rewriteFileWithObject("data/local/files/exercises.json", exercises);
  }
}
