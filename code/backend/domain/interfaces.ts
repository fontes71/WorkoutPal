import { AuthInfoUser } from "./api";
import { Exercise, User, Food, FoodFactsApiFood, WorkoutPlan, Day, DayStats } from "./types";
import { Request, Response } from "express";

// API
export interface IExerciseApi {
  getExerciseById(req: Request, res: Response): void
  searchExercisesByName(req: Request, res: Response): void;
  searchExercisesByBodyPart(req: Request, res: Response): void;
  searchExercisesByEquipment(req: Request, res: Response): void;
  searchExercisesByTarget(req: Request, res: Response): void;
  searchExercisesBySecondaryMuscle(req: Request, res: Response): void;
  searchExercisesByNameAndFilters(req: Request, res: Response): void;
  getUserWorkoutPlans(req: Request, res: Response): void;
  createWorkoutPlan(req: Request, res: Response): void;
  removeWorkoutPlan(req: Request, res: Response): void;
  addExerciseToWorkoutPlan(req: Request, res: Response): void;
  removeExerciseFromWorkoutPlan(req: Request, res: Response): void;
  logWorkoutPlan(req: Request, res: Response): void;
  getDailyLoggedWorkoutPlans(req: Request, res: Response): void;
  getExercisesFromWorkoutPlan(req: Request, res: Response): void;
  cloneExerciseDB(req: Request, res: Response): void;
}

export interface IFoodApi {
  searchByName(req: Request, res: Response): void;
  searchByBarcode(req: Request, res: Response): void;
  log(req: Request, res: Response): void;
  updateLog(req: Request, res: Response): void;
  deleteLog(req: Request, res: Response): void;
  dailyConsumption(req: Request, res: Response): void;

}

export interface IAuthApi {
  signup(req: Request, res: Response): void;
  login(req: Request, res: Response): void;
  logout(req: Request, res: Response): void;
  userToAuthInfoUser(user: User): AuthInfoUser;
}

export interface IProgressApi {
  updateWeight(req: Request, res: Response): void;
  getDays(req: Request, res: Response): void;
}

// SERVICES
export interface IExerciseServices {
  getExerciseById(id: string): Promise<Exercise>;
  searchExercisesByName(name: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesByBodyPart(bodyPart: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesByEquipment(equipment: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesByTarget(target: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesBySecondaryMuscle(secondaryMuscle: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesByNameAndFilters(name: string, bodyPart: string, equipment: string, target: string, skip: number, limit: number): Promise<Array<Exercise>>;
  getUserWorkoutPlans(token: string): Promise<Array<WorkoutPlan>>;
  createWorkoutPlan(token: string, workoutPlanName: string, description: string): Promise<WorkoutPlan>;
  removeWorkoutPlan(token: string, workoutPlanName: string): Promise<WorkoutPlan>;
  addExerciseToWorkoutPlan(token: string, workoutPlanName: string, exerciseId: string): Promise<WorkoutPlan>;
  removeExerciseFromWorkoutPlan(token: string, workoutPlanName: string, exerciseId: string): Promise<WorkoutPlan>;
  logWorkoutPlan(token: string, workoutPlan: string): Promise<WorkoutPlan>;
  getDailyLoggedWorkoutPlans(token: string, day: string): Promise<Array<string>>;
  getExercisesFromWorkoutPlan(token: string, workoutPlanName: string): Promise<Array<Exercise>>;
  cloneExerciseDB(): void;
  cloneExerciseDBScheduler(): void;
}

export interface IFoodServices {
  searchByName(query: string, page: number): Promise<Array<Food>>;
  searchByBarcode(barcode: number): Promise<Food>;
  log(token: string, foodItem: Food, date: string):Promise<Food[]>;
  updateLog(token: string, foodItem: Food, date: string, logIndex: number):Promise<Food[]>;
  deleteLog(token: string, logIndex: number, date: string):Promise<Food[]>
  dailyConsumption(token: string, day: string): Promise<Food[]>;
}

export interface IAuthServices {
  signup(username: string, password: string, email: string): Promise<User>;
  login(email: string, password: string): Promise<User>;
  logout(token: string): Promise<void>;
}

export interface IProgressServices {
  updateWeight(newWeight: number, day: string, token: string): Promise<void>
  getDays(period: string, token: string): Promise<Array<DayStats>>
}

// DATA
export interface IExerciseData {
  getExerciseById(id: string): Promise<any>;
  searchExercisesByName(name: string,skip: number,limit: number): Promise<any>;
  searchExercisesByBodyPart(bodyPart: string,skip: number, limit: number): Promise<any>;
  searchExercisesByEquipment(equipment: string,skip: number,limit: number): Promise<any>;
  searchExercisesByTarget(target: string,skip: number,limit: number): Promise<any>;
  searchExercisesBySecondaryMuscle(secondaryMuscle: string,skip: number,limit: number): Promise<any>;
  searchExercisesByNameAndFilters(name: string, bodyPart: string, equipment: string, target: string, skip: number, limit: number): Promise<any>;
  getUserWorkoutPlans(token: string): Promise<any>;
  createWorkoutPlan(token: string, workoutPlanName: string, description: string): Promise<any>;
  removeWorkoutPlan(token: string, workoutPlanName: string): Promise<any>;
  addExerciseToWorkoutPlan(token: string, workoutPlanName: string, exerciseId: string): Promise<any>;
  removeExerciseFromWorkoutPlan(token: string, workoutPlanName: string, exerciseId: string): Promise<any>;
  logWorkoutPlan(token: string, workoutPlan: string): Promise<any>;
  getDailyLoggedWorkoutPlans(token: string, day: string): Promise<any>;
  getExercisesFromWorkoutPlan(token: string, workoutPlanName: string): Promise<any>;
  cloneExerciseDB(): Promise<void>;
}

export interface IFoodData {
  searchByName(query: string, page: number, limit: number): Promise<Array<FoodFactsApiFood>>;
  searchByBarcode(barcode: number): Promise<FoodFactsApiFood>;
}

export interface IAuthData {
  createUser(username: string, password: string, email: string, token: string): Promise<void>;
  getUserByToken(token: string): Promise<User | null>;
  getUserAndUpdateToken(email: string, token: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  tryClearUserToken(token: string): Promise<User | null>;
}

export interface IProgressData {
  updateWeight(newWeight: number, day: string, token: string): Promise<User | null>
}

export interface IUserData {
  getUserByToken(token: string): Promise<User | null>
  updateUser(token: string, user: User): Promise<User | null>
}


