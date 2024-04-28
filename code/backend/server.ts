import express from "express";

import { AuthApi } from "./api/auth-api.ts";
import passport from 'passport';
import { ExerciseData } from "./data/mongo/exercise-data.ts";
import { ExerciseServices } from "./services/exercise-services.ts";
import { ExerciseApi } from "./api/exercise-api.ts";
import { AuthData } from "./data/mongo/auth-data.ts";
import { AuthServices } from "./services/auth-services.ts";
import { FoodApi } from "./api/food-api.ts";
import { FoodServices } from "./services/food-services.ts";
import { FoodData } from "./data/mongo/food-data.ts";
import cors from 'cors';
import { UserData } from "./data/mongo/user-data.ts";

// AUTH
const authData = new AuthData()
const authServices = new AuthServices(authData)
const authApi = new AuthApi(authServices, authData);

// USER
const userData = new UserData()

// EXERCISE
const exerciseData = new ExerciseData()
const exerciseServices = new ExerciseServices(exerciseData)
const exerciseApi = new ExerciseApi(exerciseServices, exerciseData)

const foodData = new FoodData();
const foodServices = new FoodServices(foodData, userData);
const foodApi = new FoodApi(foodServices, foodData);


const port = 8080;

const app = express();

//provisorio (?)
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(passport.initialize());

// Auth
app.post("/api/signup", authApi.signup)
app.post("/api/login", authApi.login)

// Exercise
app.get("/api/exercise/:exerciseId", exerciseApi.getExerciseById);
app.get("/api/exercises/name/:exerciseName", exerciseApi.searchExercisesByName);
app.get("/api/exercises/bodyPart/:exerciseBodyPart", exerciseApi.searchExercisesByBodyPart);
app.get("/api/exercises/equipment/:exerciseEquipment", exerciseApi.searchExercisesByEquipment);
app.get("/api/exercises/target/:exerciseTarget", exerciseApi.searchExercisesByTarget);
app.get("/api/exercises/secondaryMuscle/:exerciseSecondaryMuscle", exerciseApi.searchExercisesBySecondaryMuscle);
app.get("/api/exercises/workoutPlans", exerciseApi.getUserWorkoutPlans);
app.post("/api/exercises/workoutPlans", exerciseApi.createWorkoutPlan);
app.post("/api/exercises/workoutPlans/:workoutPlanName", exerciseApi.addExerciseToWorkoutPlan);
app.get("/api/cloneDatabase", exerciseApi.cloneExerciseDB);

// Food
app.get("/api/food/search", foodApi.searchFood);
app.post("/api/food/consume", foodApi.consumeFood);
app.get("/api/food/dailyConsumption", foodApi.dailyConsumption);

app.listen(8080, () => {
  console.log(`Listening...\nhttp://localhost:` + port);
  exerciseServices.cloneExerciseDBScheduler();
});

export default app;
