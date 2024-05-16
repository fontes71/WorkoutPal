import { exercisedb_url, exercisedb_options, ALREADY_EXISTS_WORKOUTPLAN } from "../../utils/constants";
import { IExerciseData } from "../../domain/interfaces";
import {
  convertExerciseDBToExercise,
  fetchData,
  mongodbHandler,
  rewriteFileWithObject,
} from "../../utils/functions/data";
import { ExerciseModel, UserModel } from "./mongoose";
import { Exercise, ExerciseDB, User, WorkoutPlan } from "../../domain/types";

export class ExerciseData implements IExerciseData {
  getExerciseById(id: string) {
    return mongodbHandler(async () => {
      const exercise = ExerciseModel.findOne({ _id: id });
      return exercise;
    });
  }

  searchExercisesByName(name: string, skip: number, limit: number) {
    return mongodbHandler(async () => {
      const exercises = ExerciseModel.find({
        name: { $regex: `${name.toLowerCase()}` },
      })
        .skip(skip)
        .limit(limit);
      return exercises;
    });
  }

  searchExercisesByBodyPart(bodyPart: string, skip: number, limit: number) {
    return mongodbHandler(async () => {
      const exercises = ExerciseModel.find({
        bodyPart: { $regex: `${bodyPart.toLowerCase()}` },
      })
        .skip(skip)
        .limit(limit);
      return exercises;
    });
  }

  searchExercisesByEquipment(equipment: string, skip: number, limit: number) {
    return mongodbHandler(async () => {
      const exercises = ExerciseModel.find({
        equipment: { $regex: `${equipment.toLowerCase()}` },
      })
        .skip(skip)
        .limit(limit);
      return exercises;
    });
  }

  searchExercisesByTarget(target: string, skip: number, limit: number) {
    return mongodbHandler(async () => {
      const exercises = ExerciseModel.find({
        target: { $regex: `${target.toLowerCase()}` },
      })
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
        secondaryMuscles: { $regex: `${secondaryMuscle.toLowerCase()}` },
      })
        .skip(skip)
        .limit(limit);
      return exercises;
    });
  }

  getUserWorkoutPlans(token: string) {
    return mongodbHandler(async () => {
      const user: User | null = await UserModel.findOne({ token });
      return user !== null ? user.workout_plans : null;
    });
  }

  createWorkoutPlan(
    token: string,
    workoutPlanName: string,
    description: string
  ) {
    return mongodbHandler(async () => {
      const user: User | null = await UserModel.findOne({ token });
      const newWorkoutPlan = {
        name: workoutPlanName,
        description,
        exercises: [],
      };

      const alreadyExistsWorkoutPlan = ALREADY_EXISTS_WORKOUTPLAN;

      if (user === null) {
        return null;
      }
      if (
        user.workout_plans.some(
          (workoutPlan) => workoutPlan.name === workoutPlanName
        )
      ) {
        return alreadyExistsWorkoutPlan;
      }

      user.workout_plans.push(newWorkoutPlan);
      await UserModel.updateOne({ token }, user);
      return newWorkoutPlan;
    });
  }

  addExerciseToWorkoutPlan(
    token: string,
    workoutPlanName: string,
    exerciseId: string
  ) {
    return mongodbHandler(async () => {
      const user: User | null = await UserModel.findOne({ token });
      let workoutPlanResult: WorkoutPlan = ALREADY_EXISTS_WORKOUTPLAN;
      if (user === null) {
        return null;
      }
      user.workout_plans.forEach((workoutPlan: WorkoutPlan) => {
        if (
          workoutPlan.name === workoutPlanName &&
          !workoutPlan.exercises.includes(exerciseId)
        ) {
          workoutPlan.exercises.push(exerciseId);
          workoutPlanResult = workoutPlan;
        }
      });
      await UserModel.updateOne({ token }, user);
      return workoutPlanResult;
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
