import { AuthInfoUser, UserResponse } from "./api";
import { Exercise, User, Food, FoodFactsApiFood, WorkoutPlan, ConsumedFood, Day } from "./types";
import { Request, Response } from "express";

// API
export interface IExerciseApi {
  getExerciseById(req: Request, res: Response): void
  searchExercisesByName(req: Request, res: Response): void;
  searchExercisesByBodyPart(req: Request, res: Response): void;
  searchExercisesByEquipment(req: Request, res: Response): void;
  searchExercisesByTarget(req: Request, res: Response): void;
  searchExercisesBySecondaryMuscle(req: Request, res: Response): void;
  getUserWorkoutPlans(req: Request, res: Response): void;
  createWorkoutPlan(req: Request, res: Response): void;
  addExerciseToWorkoutPlan(req: Request, res: Response): void;
  cloneExerciseDB(req: Request, res: Response): void;
}

export interface IFoodApi {
  searchFood(req: Request, res: Response): void;
  consumeFood(req: Request, res: Response): void;
}

export interface IAuthApi {
  signup(req: Request, res: Response): void;
  login(req: Request, res: Response): void;
  userToUserResponse(user: User): UserResponse;
  userToAuthInfoUser(user: User): AuthInfoUser;
}

// SERVICES
export interface IExerciseServices {
  getExerciseById(id: string): Promise<Exercise>;
  searchExercisesByName(name: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesByBodyPart(bodyPart: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesByEquipment(equipment: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesByTarget(target: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesBySecondaryMuscle(secondaryMuscle: string, skip: number, limit: number): Promise<Array<Exercise>>;
  getUserWorkoutPlans(token: string): Promise<Array<WorkoutPlan>>;
  createWorkoutPlan(token: string, workoutPlanName: string, description: string): Promise<WorkoutPlan>;
  addExerciseToWorkoutPlan(token: string, workoutPlanName: string, exerciseId: string): Promise<WorkoutPlan>;
  cloneExerciseDBScheduler(): void;
}

export interface IFoodServices {
  searchFood(query: string, skip: number, limit: number): Promise<Array<Food>>;
  consumeFood(token: string, id: string,name: string | null, calories: number | null, protein: string | null, fat: string | null, carbs: string | null, fiber: string | null): any
}

export interface IAuthServices {
  signup(username: string, password: string, email: string): Promise<string>;
  login(email: string, password: string): Promise<User>;
}

// DATA
export interface IExerciseData {
  getExerciseById(id: string): Promise<Exercise | null>;
  searchExercisesByName(name: string,skip: number,limit: number): Promise<Exercise[]>;
  searchExercisesByBodyPart(bodyPart: string,skip: number, limit: number): Promise<Exercise[]>;
  searchExercisesByEquipment(equipment: string,skip: number,limit: number): Promise<Exercise[]>;
  searchExercisesByTarget(target: string,skip: number,limit: number): Promise<Exercise[]>;
  searchExercisesBySecondaryMuscle(secondaryMuscle: string,skip: number,limit: number): Promise<Exercise[]>;
  getUserWorkoutPlans(token: string): Promise<WorkoutPlan[] | null>;
  createWorkoutPlan(token: string, workoutPlanName: string, description: string): Promise<WorkoutPlan | null>;
  addExerciseToWorkoutPlan(token: string, workoutPlanName: string, exerciseId: string): Promise<WorkoutPlan | null>;
  cloneExerciseDB(): Promise<void>;
}

export interface IFoodData {
  searchFood(query: string, skip: number, limit: number): Promise<Array<FoodFactsApiFood>>;
}

export interface IAuthData {
  createUser(username: string, password: string, email: string, token: string): Promise<void>;
  getUserByToken(token: string): Promise<User | null>;
  getUserByMail(email: string): Promise<User | null>;
}

export interface IUserData {
  getUserByToken(token: string): Promise<User | null>;
  updateUser(token: string, user: User): Promise<User | null>
}


