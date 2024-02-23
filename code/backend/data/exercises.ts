import { mongodbHandler } from "./mongodb-utils"

function exercisesData() {

    async function getExerciseById(id: number) {
        return await mongodbHandler(async (db) => {
          const exercisesCollection = db.collection("Exercises")
          const exercise = await exercisesCollection.findOne({"id": id})
          return exercise
        })
      }

    return [
      getExerciseById

    ]
}