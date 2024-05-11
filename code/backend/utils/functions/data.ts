import fs from "node:fs/promises";
import { Exercise, ExerciseDB } from "../../domain/types";
import { WORKOUTPAL_MONGO_URI } from "../constants";
import mongoose from "mongoose";

export const fetchData = async (url: string, options: any) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

//export const rewriteFileWithObject = (fileUrl: string, exercises: any) =>  fs.writeFileSync(fileUrl, JSON.stringify(exercises, null, 2), "utf8");
export const rewriteFileWithObject = (fileUrl: string, exercises: any) =>  fs.writeFile(fileUrl, JSON.stringify(exercises, null, 2), "utf8");

export function convertExerciseDBToExercise(exerciseDB: ExerciseDB): Exercise {
  const { id, ...exercise } = exerciseDB
  return { _id: id, ...exercise }
}


export async function mongodbHandler(action: () => Promise<any>) {
  try {
    const uri = WORKOUTPAL_MONGO_URI
    if (uri===undefined)
      throw("Undefined Mongo Uri")
    await mongoose.connect(uri);
    return await action();
  } finally {
    await mongoose.connection.close();
  }
}

export async function transactionHandler(action: () => Promise<any>) {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const res = await action()
    await session.commitTransaction()
    return res
  } catch (error) {
    await session.abortTransaction() 
    throw error
  } finally {
    await session.endSession();
  }
}

export async function getLocalData(path: string) {
  const data = await fs.readFile(path);
  return JSON.parse(data.toString());
}
  
