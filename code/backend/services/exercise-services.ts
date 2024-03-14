import { Exercise } from "../domain/types";
import { NotFoundError } from "../errors/app_errors";
import cron from "node-cron";
import { IExerciseData, IExerciseServices } from "../domain/interfaces";

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

  

  cloneExerciseDBScheduler() {
    cron.schedule("0 0 0 * * *", () => {
      this.data.cloneExerciseDB();
    });
  }
}
