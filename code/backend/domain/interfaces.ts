import { AuthInfoUser, UserResponse } from "./api";
import { Exercise, User, Food, FoodFactsApiFood } from "./types";
import { Request, Response } from "express";

// API
export interface IExerciseApi {
  getExerciseById(req: Request, res: Response): void
  searchExercisesByName(req: Request, res: Response): void;
  searchExercisesByBodyPart(req: Request, res: Response): void;
  searchExercisesByEquipment(req: Request, res: Response): void;
  searchExercisesByTarget(req: Request, res: Response): void;
  searchExercisesBySecondaryMuscle(req: Request, res: Response): void;
  cloneExerciseDB(req: Request, res: Response): void;
}

export interface IFoodApi {
  searchFood(req: Request, res: Response): void;
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
  cloneExerciseDBScheduler(): void;
}

export interface IFoodServices {
  searchFood(query: string, skip: number, limit: number): Promise<Array<Food>>;
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


