import { WpData } from "../data/wp-data";

export class WpService {
  private data: WpData;

  constructor(data: WpData) {
    this.data = data;
    this.getExerciseById = this.getExerciseById.bind(this);
  }

  //fazer verificações
  getExerciseById(id: string) {
    return this.data.getExerciseById(id);
  }
}
