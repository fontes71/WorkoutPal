import { ExerciseModel, mongodbHandler } from "./mongodb-utils";

export class WpData {
  getExerciseById(id: string) {
    return mongodbHandler(async () => {
      const exercise = ExerciseModel.findOne({'_id': id})
      return exercise
    })
  }
}
