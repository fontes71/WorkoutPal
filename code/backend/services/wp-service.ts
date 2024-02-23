import { WpData } from "../data/wp-data";

export class WpService {
  private data: WpData;

  constructor(data: WpData) {
    this.data = data;
  }

  //fazer verificações
  getExerciseById(id: number) {
    return this.data.getExerciseById(id);
  }
}
