import { Exercise, WorkoutPlan } from "../domain/types";
import { NotFoundError, AlreadyExistsError, InvalidAuthorizationTokenError } from "../errors/app_errors";
import cron from "node-cron";
import { IExerciseData, IExerciseServices } from "../domain/interfaces";
import { ALREADY_EXISTS_WORKOUTPLAN } from "../utils/constants";

// try catch need on services cuz sometimes data throws error and the app stop inside services
export class ExerciseServices implements IExerciseServices {
  private data: IExerciseData;

  constructor(data: IExerciseData) {
    this.data = data;
  }

  getExerciseById = async (id: string) => {
    const exercise: Exercise | null = await this.data.getExerciseById(id);
    if (exercise == null) throw NotFoundError;
    return exercise;
  };

  searchExercisesByName = async (name: string, skip: number, limit: number) => {
    const exercises: Array<Exercise> = await this.data.searchExercisesByName(
      name,
      skip,
      limit
    );
    if (exercises.length == 0) throw NotFoundError;
    return exercises;
  };

  searchExercisesByBodyPart = async (
    bodyPart: string,
    skip: number,
    limit: number
  ) => {
    const exercises: Array<Exercise> =
      await this.data.searchExercisesByBodyPart(bodyPart, skip, limit);
    if (exercises.length == 0) throw NotFoundError;
    return exercises;
  };

  searchExercisesByEquipment = async (
    equipment: string,
    skip: number,
    limit: number
  ) => {
    const exercises: Array<Exercise> =
      await this.data.searchExercisesByEquipment(equipment, skip, limit);
    if (exercises.length == 0) throw NotFoundError;
    return exercises;
  };

  searchExercisesByTarget = async (
    target: string,
    skip: number,
    limit: number
  ) => {
    const exercises: Array<Exercise> = await this.data.searchExercisesByTarget(
      target,
      skip,
      limit
    );
    if (exercises.length == 0) throw NotFoundError;
    return exercises;
  };

  searchExercisesBySecondaryMuscle = async (
    secondaryMuscle: string,
    skip: number,
    limit: number
  ) => {
    const exercises: Array<Exercise> =
      await this.data.searchExercisesBySecondaryMuscle(
        secondaryMuscle,
        skip,
        limit
      );
    if (exercises.length == 0) throw NotFoundError;
    return exercises;
  };

  getUserWorkoutPlans = async (token: string) => {
    const workoutPlans = await this.data.getUserWorkoutPlans(token);
    if (workoutPlans == null) throw InvalidAuthorizationTokenError;
    return workoutPlans;
  }

  createWorkoutPlan = async (token: string, workoutPlanName: string, description: string) => {
    const workoutPlan = await this.data.createWorkoutPlan(token, workoutPlanName, description);
    if (workoutPlan == null) throw InvalidAuthorizationTokenError;
    if (workoutPlan == ALREADY_EXISTS_WORKOUTPLAN) throw AlreadyExistsError;
    return workoutPlan;
  }

  addExerciseToWorkoutPlan = async (token: string, workoutPlanName: string, exerciseId: string) => {
    const workoutPlan = await this.data.addExerciseToWorkoutPlan(token, workoutPlanName, exerciseId);
    if (workoutPlan == null) throw InvalidAuthorizationTokenError;
    if (workoutPlan == ALREADY_EXISTS_WORKOUTPLAN) throw AlreadyExistsError;
    return workoutPlan;
  }

  cloneExerciseDBScheduler() {
    cron.schedule("0 0 0 * * *", () => {
      this.data.cloneExerciseDB();
    });
  }
}
