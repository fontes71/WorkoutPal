import { Data } from "../data/mongo/data";
import { Exercise } from "../domain/types";
import { NotFoundError } from "../errors/app_errors";

export class Services {
  private data: Data;

  constructor(data: Data) {
    this.data = data;
    this.getExerciseById = this.getExerciseById.bind(this);
  }

  async getExerciseById(id: string) {
    console.log("Services")
    const exercise: Exercise = await this.data.getExerciseById(id);
    if (exercise == null) throw NotFoundError;
    return exercise;
  }
}
