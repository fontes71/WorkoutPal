import { Exercise, WorkoutPlan } from "../domain/types";
import { NotFoundError, AlreadyExistsError, InvalidAuthorizationTokenError, InvalidParamsError } from "../errors/app_errors";
import cron from "node-cron";
import { IExerciseData, IExerciseServices } from "../domain/interfaces";
import { ERROR_WORKOUTPLAN } from "../utils/constants";
import { isValidDate } from "../utils/functions/app/isValidDate";

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
    if (exercises.length == 0) return [];
    return exercises;
  };

  searchExercisesByBodyPart = async (
    bodyPart: string,
    skip: number,
    limit: number
  ) => {
    const exercises: Array<Exercise> =
      await this.data.searchExercisesByBodyPart(bodyPart, skip, limit);
    if (exercises.length == 0) return [];
    return exercises;
  };

  searchExercisesByEquipment = async (
    equipment: string,
    skip: number,
    limit: number
  ) => {
    const exercises: Array<Exercise> =
      await this.data.searchExercisesByEquipment(equipment, skip, limit);
    if (exercises.length == 0) return [];
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
    if (exercises.length == 0) return [];
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
    if (exercises.length == 0) return [];
    return exercises;
  };

  getUserWorkoutPlans = async (token: string) => {
    const workoutPlans: WorkoutPlan[] | null = await this.data.getUserWorkoutPlans(token);
    if (workoutPlans == null) throw InvalidAuthorizationTokenError;
    return workoutPlans;
  }

  createWorkoutPlan = async (token: string, workoutPlanName: string, description: string) => {
    const workoutPlan: WorkoutPlan | null = await this.data.createWorkoutPlan(token, workoutPlanName, description);
    if (workoutPlan == null) throw InvalidAuthorizationTokenError;
    if (workoutPlan == ERROR_WORKOUTPLAN) throw AlreadyExistsError;
    return workoutPlan;
  }

  addExerciseToWorkoutPlan = async (token: string, workoutPlanName: string, exerciseId: string) => {
    const workoutPlan: WorkoutPlan | null = await this.data.addExerciseToWorkoutPlan(token, workoutPlanName, exerciseId);
    if (workoutPlan == null) throw InvalidAuthorizationTokenError;
    if (workoutPlan == ERROR_WORKOUTPLAN) throw AlreadyExistsError;
    return workoutPlan;
  }

  removeExerciseFromWorkoutPlan = async (token: string, workoutPlanName: string, exerciseId: string): Promise<WorkoutPlan> => {
    const workoutPlan: WorkoutPlan | null = await this.data.removeExerciseFromWorkoutPlan(token, workoutPlanName, exerciseId);
    if (workoutPlan == null) throw InvalidAuthorizationTokenError;
    if (workoutPlan == ERROR_WORKOUTPLAN) throw NotFoundError;
    return workoutPlan;
  }

  logWorkoutPlan = async (token: string, workoutPlanName: string): Promise<WorkoutPlan> => {
    const workoutPlan: WorkoutPlan | null = await this.data.logWorkoutPlan(token, workoutPlanName);
    if (workoutPlan == null) throw InvalidAuthorizationTokenError;
    if (workoutPlan == ERROR_WORKOUTPLAN) throw NotFoundError;
    return workoutPlan;
  }

  getDailyLoggedWorkoutPlans = async (token: string, day: string): Promise<Array<string>> => {
    if(!isValidDate(day)) {
      throw InvalidParamsError;
    };
    const workoutPlans: string[] | null = await this.data.getDailyLoggedWorkoutPlans(token, day);
    if (workoutPlans == null) throw InvalidAuthorizationTokenError;
    return workoutPlans;
  }

  cloneExerciseDBScheduler() {
    cron.schedule("0 0 0 * * *", () => {
      this.data.cloneExerciseDB();
    });
  }
}
