import fs from "node:fs/promises";
import { Exercise } from "../../domain/types";

async function getLocalData(path: string) {
  const data = await fs.readFile(path);
  return JSON.parse(data.toString());
}

export class Data {
  // not yet implemented
  async createUser(username: string, password: string, mail: string, token: string) {
    return
  }

  async getUserByToken(token) {
    return
  }

  async getExerciseById(id: string) {
    const exercises = (await getLocalData(
      "data/local/files/exercises.json"
    )) as Exercise[];
    
    const exercise = exercises.find((exercise) => exercise._id === id);
    return exercise || null
  }

  async searchExercisesByName(name: string, skip: number, limit: number) {
    const exercises = (await getLocalData(
      "data/local/files/exercises.json"
    )) as Exercise[];
    
    const filteredExercises = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(name.toLowerCase())
    );
    return filteredExercises.slice(skip, skip + limit);
  }

  async cloneExerciseDB() {}
}
