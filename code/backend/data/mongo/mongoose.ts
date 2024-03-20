import mongoose from "mongoose";
import dotenv from "dotenv";




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