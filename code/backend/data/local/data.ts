import fs from "node:fs/promises";

async function getLocalData(path: string) {
    const data = await fs.readFile(path);
    return JSON.parse(data.toString());
}

export class Data {
  async getExerciseById(id: string) {
    const data = await getLocalData("data/local/exercises.json");
    
  }
}
