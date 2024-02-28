import fs from "node:fs/promises";
import { Exercise } from "../../domain/types";

async function getLocalData(path: string) {
  const data = await fs.readFile(path);
  return JSON.parse(data.toString());
}

export class Data {
  async getExerciseById(id: string) {
    const exercises = (await getLocalData(
      "data/local/exercises.json"
    )) as Exercise[];
    
    const exercise = exercises.find((exercise) => exercise._id === id);
    return exercise || null
  }
}
