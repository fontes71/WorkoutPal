import { WpData } from "../data/wp-data";
import { Exercise } from "../domain/types";
import { NotFoundError } from "../errors/app_errors";

export class WpService {
  private data: WpData;

  constructor(data: WpData) {
    this.data = data;
    this.getExerciseById = this.getExerciseById.bind(this);
  }

  async getExerciseById(id: string) {
    const exercise: Exercise = await this.data.getExerciseById(id)
    if (exercise == null) throw NotFoundError
    return exercise
  }
}
