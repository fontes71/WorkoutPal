import {
  exercisedb_url,
  exercisedb_options,
  ERROR_WORKOUTPLAN,
  ERROR_EXERCISE,
} from "../utils/constants";
import { IExerciseData } from "../domain/interfaces";
import {
  convertExerciseDBToExercise,
  fetchData,
  mongodbHandler,
  rewriteFileWithObject,
} from "../utils/functions/data";
import { ExerciseModel, UserModel } from "../mongoose/schemas";
import { Exercise, ExerciseDB, User, WorkoutPlan } from "../domain/types";
import getDate from "../utils/functions/app/getDate";
import { buildFilterQuery } from "../utils/functions/app/buildFilterQuery";

export class ExerciseData implements IExerciseData {
  async getExerciseById(id: string) {
    const exercise = await ExerciseModel.findOne({ _id: id });
    return exercise;
  }

 async searchExercisesByName(name: string, skip: number, limit: number) {
    const exercises = await ExerciseModel.find({
      name: { $regex: `${name.toLowerCase()}` },
    })
      .skip(skip)
      .limit(limit);
    return exercises;
    
  }

  async searchExercisesByBodyPart(bodyPart: string, skip: number, limit: number) {
    const exercises = await ExerciseModel.find({
      bodyPart: { $regex: `${bodyPart.toLowerCase()}` },
    })
      .skip(skip)
      .limit(limit);
    return exercises;
  }

  async searchExercisesByEquipment(equipment: string, skip: number, limit: number) {
    const exercises = await ExerciseModel.find({
      equipment: { $regex: `${equipment.toLowerCase()}` },
    })
      .skip(skip)
      .limit(limit);
    return exercises;
  }

  async searchExercisesByTarget(target: string, skip: number, limit: number) {
    const exercises = await ExerciseModel.find({
      target: { $regex: `${target.toLowerCase()}` },
    })
      .skip(skip)
      .limit(limit);
    return exercises;
  }

  async searchExercisesBySecondaryMuscle(
    secondaryMuscle: string,
    skip: number,
    limit: number
  ) {
    const exercises = await ExerciseModel.find({
      secondaryMuscles: { $regex: `${secondaryMuscle.toLowerCase()}` },
    })
      .skip(skip)
      .limit(limit);
    return exercises;
  }

  async searchExercisesByNameAndFilters(
    name: string,
    bodyPart: string,
    equipment: string,
    target: string,
    skip: number,
    limit: number
  ) {
    const query = buildFilterQuery(name, bodyPart, equipment, target);
    const exercises = await ExerciseModel.find(query).skip(skip).limit(limit);
    return exercises;
  }

  async getUserWorkoutPlans(token: string) {
    const user: User | null = await UserModel.findOne({ token });
    return user !== null ? user.workout_plans : null;
  }

  async createWorkoutPlan(
    token: string,
    workoutPlanName: string,
    description: string
  ) {
    const user: User | null = await UserModel.findOne({ token });
    const newWorkoutPlan = {
      name: workoutPlanName,
      description,
      exercises: [],
    };
    const alreadyExistsWorkoutPlan = ERROR_WORKOUTPLAN;

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
  }

  async removeWorkoutPlan(token: string, workoutPlanName: string) {
    const user: User | null = await UserModel.findOne({ token });
    let workoutPlanResult: WorkoutPlan | null = ERROR_WORKOUTPLAN;

    if (user === null) {
      return null;
    }

    user.workout_plans.forEach((workoutPlan, index) => {
      if (workoutPlan.name === workoutPlanName) {
        workoutPlanResult = user.workout_plans.splice(index, 1)[0];
      }
    });

    await UserModel.updateOne({ token }, user);
    return workoutPlanResult;
  }

  async addExerciseToWorkoutPlan(
    token: string,
    workoutPlanName: string,
    exerciseId: string
  ) {
    const user: User | null = await UserModel.findOne({ token });
    let workoutPlanResult: WorkoutPlan = ERROR_WORKOUTPLAN;

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
  }

  async removeExerciseFromWorkoutPlan(
    token: string,
    workoutPlanName: string,
    exerciseId: string
  ): Promise<WorkoutPlan | null> {
    const user: User | null = await UserModel.findOne({ token });
    let workoutPlanResult: WorkoutPlan | null = ERROR_WORKOUTPLAN;

    if (user === null) {
      return null;
    }

    user.workout_plans.forEach((workoutPlan: WorkoutPlan) => {
      if (
        workoutPlan.name === workoutPlanName &&
        workoutPlan.exercises.includes(exerciseId)
      ) {
        workoutPlan.exercises = workoutPlan.exercises.filter(
          (id) => id !== exerciseId
        );
        workoutPlanResult = workoutPlan;
      }
    });

    await UserModel.updateOne({ token }, user);
    return workoutPlanResult;
  }

  async logWorkoutPlan(token: string, workoutPlanName: string) {
    const user: User | null = await UserModel.findOne({ token });
    const date = getDate();

    if (user === null) {
      return null;
    }

    const dayIndex = user.days.findIndex((day) => day.date === date);
    const workoutPlan = user.workout_plans.find((workoutPlan) => workoutPlan.name === workoutPlanName);

    if (workoutPlan === undefined) {
      return ERROR_WORKOUTPLAN;
    }

    if (dayIndex == -1) {
      user.days = [
        ...user.days,
        { date: date, consumedFood: [], workoutPlansDone: [workoutPlanName] },
      ];
    } else {
      const day = user.days[dayIndex];
      user.days[dayIndex] = {
        ...day,
        workoutPlansDone: [...day.workoutPlansDone, workoutPlanName],
      };
    }

    await UserModel.updateOne({ token }, user);
    return workoutPlan;
  }

  async getDailyLoggedWorkoutPlans(token: string, day: string) {
    const user: User | null = await UserModel.findOne({ token });

    if (user === null) {
      return null;
    }

    const dailyLoggedWorkoutPlans = user.days.find((userDay) => userDay.date === day);

    if (dailyLoggedWorkoutPlans === undefined) {
      return [];
    }

    return dailyLoggedWorkoutPlans.workoutPlansDone;
  }

  async getExercisesFromWorkoutPlan(token: string, workoutPlanName: string) {
    const user: User | null = await UserModel.findOne({ token });

    if (user === null) {
      return null;
    }

    const workoutPlan = user.workout_plans.find((workoutPlan) => workoutPlan.name === workoutPlanName);

    if (workoutPlan === undefined) {
      return [ERROR_EXERCISE];
    }

    const exercises = ExerciseModel.find({ _id: { $in: workoutPlan.exercises } });

    return exercises;
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
  }
}
