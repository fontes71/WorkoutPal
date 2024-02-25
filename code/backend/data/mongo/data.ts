import { ExerciseModel, mongodbHandler } from "./mongodb-utils";

export class Data {
  getExerciseById(id: string) {
    return mongodbHandler(async () => {
      const exercise = ExerciseModel.findOne({ _id: id });
      return exercise;
    });
  }
}
