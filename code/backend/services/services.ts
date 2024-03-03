import { Data } from "../data/mongo/data";
import { Exercise } from "../domain/types";
import { NotFoundError } from "../errors/app_errors";
import cron from "node-cron";

export class Services {
  private data: Data;

  constructor(data: Data) {
    this.data = data;
    this.getExerciseById = this.getExerciseById.bind(this);
    this.cloneExerciseDB = this.cloneExerciseDB.bind(this)
  }

  async getExerciseById(id: string) {
    const exercise: Exercise = await this.data.getExerciseById(id);
    if (exercise == null) throw NotFoundError;
    return exercise;
  }

  cloneExerciseDBScheduler() {
    cron.schedule("0 0 0 * * *", function () {
      this.data.cloneExerciseDB()
    });
  }

  cloneExerciseDB() {
      this.data.cloneExerciseDB()
  }
}
