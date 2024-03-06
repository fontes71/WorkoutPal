import fs from "fs";
import { Exercise, ExerciseDB } from "../domain/types";

export const fetchData = async (url: string, options: any) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export const rewriteFileWithObject = (fileUrl: string, exercises: any) =>  fs.writeFileSync(fileUrl, JSON.stringify(exercises, null, 2), "utf8");

export function convertExerciseDBToExercise(exerciseDB: ExerciseDB): Exercise {
  const { id, ...exercise } = exerciseDB
  return { _id: id, ...exercise }
}

