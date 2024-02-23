import { mongodbHandler } from "./mongodb-utils";

export class WpData {
  
  getExerciseById(id: string) {
    return mongodbHandler(async (db) => {
      const exercisesCollection = db.collection("Exercises");
      const exercise = exercisesCollection.findOne({ id: id });
      return exercise;
    });
  }
}
