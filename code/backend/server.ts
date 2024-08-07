import express from "express";

import { AuthApi } from "./api/auth-api.ts";
import passport from "passport";
import { ExerciseData } from "./data/exercise-data.ts";
import { ExerciseServices } from "./services/exercise-services.ts";
import { ExerciseApi } from "./api/exercise-api.ts";
import { AuthData } from "./data/auth-data.ts";
import { AuthServices } from "./services/auth-services.ts";
import { FoodApi } from "./api/food-api.ts";
import { FoodServices } from "./services/food-services.ts";
import { FoodData } from "./data/food-data.ts";
import cors from "cors";
import { UserData } from "./data/user-data.ts";
import mongoose from "mongoose";
import { WORKOUTPAL_MONGO_URI } from "./utils/constants.ts";
import { ProgressData } from "./data/progress_data.ts";
import { ProgressServices } from "./services/progress_services.ts";
import { ProgressApi } from "./api/progress_api.ts";
// AUTH
const authData = new AuthData();
const authServices = new AuthServices(authData);
const authApi = new AuthApi(authServices);

// USER
const userData = new UserData();

// EXERCISE
const exerciseData = new ExerciseData();
const exerciseServices = new ExerciseServices(exerciseData);
const exerciseApi = new ExerciseApi(exerciseServices, exerciseData);

// FOOD
const foodData = new FoodData();
const foodServices = new FoodServices(foodData, userData);
const foodApi = new FoodApi(foodServices);

// PROGRESS
const progressData = new ProgressData(userData)
const progressServices = new ProgressServices(progressData, userData)
const progressApi = new ProgressApi(progressServices)


const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Auth
app.post("/api/signup", authApi.signup);
app.post("/api/login", authApi.login);
app.post("/api/logout", authApi.logout);

// Exercise
app.get("/api/exercise/:exerciseId", exerciseApi.getExerciseById);
app.get("/api/exercises/name/:exerciseName", exerciseApi.searchExercisesByName);
app.get( "/api/exercises/bodyPart/:exerciseBodyPart", exerciseApi.searchExercisesByBodyPart);
app.get( "/api/exercises/equipment/:exerciseEquipment", exerciseApi.searchExercisesByEquipment);
app.get( "/api/exercises/target/:exerciseTarget", exerciseApi.searchExercisesByTarget);
app.get( "/api/exercises/secondaryMuscle/:exerciseSecondaryMuscle", exerciseApi.searchExercisesBySecondaryMuscle);
app.get( "/api/exercises/name/:exerciseName/filters", exerciseApi.searchExercisesByNameAndFilters);
app.get("/api/exercises/workoutPlans/log/:day", exerciseApi.getDailyLoggedWorkoutPlans);
app.post("/api/exercises/workoutPlans/log", exerciseApi.logWorkoutPlan);
app.get("/api/exercises/workoutPlans", exerciseApi.getUserWorkoutPlans);
app.post("/api/exercises/workoutPlans", exerciseApi.createWorkoutPlan);
app.delete("/api/exercises/workoutPlans/:workoutPlanName", exerciseApi.removeWorkoutPlan);
app.post("/api/exercises/workoutPlans/:workoutPlanName", exerciseApi.addExerciseToWorkoutPlan);
app.delete("/api/exercises/workoutPlans/:workoutPlanName/exercise/:exerciseId", exerciseApi.removeExerciseFromWorkoutPlan);
app.get("/api/exercises/workoutPlans/:workoutPlanName", exerciseApi.getExercisesFromWorkoutPlan);
app.get("/api/cloneDatabase", exerciseApi.cloneExerciseDB);

// Food
app.get("/api/food/search/name", foodApi.searchByName);
app.get("/api/food/search/barcode", foodApi.searchByBarcode);
app.post("/api/food/log", foodApi.log);
app.post("/api/food/updateLog", foodApi.updateLog);
app.delete("/api/food/deleteLog/:logIndex", foodApi.deleteLog);
app.get("/api/food/dailyConsumption/:date", foodApi.dailyConsumption);

// Progress
app.put("/api/progress/updateWeight", progressApi.updateWeight)
app.get("/api/progress/getDays", progressApi.getDays)

function cleanup() {
  mongoose.connection
    .close()
    .then(() => {
      console.log("Mongo Connection Closed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error while closing MongoDB connection", error);
      process.exit(1);
    });
}

if (WORKOUTPAL_MONGO_URI === undefined) throw "Undefined Mongo Uri";
mongoose
  .connect(WORKOUTPAL_MONGO_URI)
  .then(() => console.log("Mongo Connected"));

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("SIGHUP", cleanup);

app.listen(3000, () => {
  console.log(`Listening...\nhttp://localhost:` + port);
  exerciseServices.cloneExerciseDBScheduler();
});

export default app;
