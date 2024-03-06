import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const WORKOUTPAL_MONGO_URI: string | undefined = process.env.WORKOUTPAL_MONGO_URI;

export const userSchema = new mongoose.Schema(
  {
    username: String, 
    email: String, 
    password: String, 
    token: String,
    workout_plans: [Object],
    days: [Object]
  },
  { versionKey: false }
);

export const UserModel = mongoose.model("users", userSchema);

export const exerciseSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    bodyPart: String,
    equipment: String,
    gifUrl: String,
    target: String,
    secondaryMuscles: [String],
    instructions: [String],
  },
  { versionKey: false }
);

export const ExerciseModel = mongoose.model("exercises", exerciseSchema);

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
