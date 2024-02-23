import { mongodbHandler } from "./mongodb-utils";

export class WpData {
  
  async getExerciseById(id: number) {
    return await mongodbHandler(async (db) => {
      const exercisesCollection = db.collection("Exercises");
      const exercise = await exercisesCollection.findOne({ id: id });
      return exercise;
    });
  }
}
