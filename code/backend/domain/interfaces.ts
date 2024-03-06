import { Exercise, User } from "./types";
import { Request, Response } from "express";

export interface IData {
  createUser(username: string,password: string,email: string,token: string): Promise<void>;
  getUserByToken(token: string): Promise<User | null>;
  getUserByMail(email: string): Promise<User | null>;
  getExerciseById(id: string): Promise<Exercise | null>;
  searchExercisesByName(name: string,skip: number,limit: number): Promise<Exercise[]>;
  searchExercisesByBodyPart(bodyPart: string,skip: number, limit: number): Promise<Exercise[]>;
  searchExercisesByEquipment(equipment: string,skip: number,limit: number): Promise<Exercise[]>;
  searchExercisesByTarget(target: string,skip: number,limit: number): Promise<Exercise[]>;
  searchExercisesBySecondaryMuscle(secondaryMuscle: string,skip: number,limit: number): Promise<Exercise[]>;
  cloneExerciseDB(): Promise<void>;
}

export interface IServices {
  getExerciseById(id: string): Promise<Exercise>;
  searchExercisesByName(name: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesByBodyPart(bodyPart: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesByEquipment(equipment: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesByTarget(target: string, skip: number, limit: number): Promise<Array<Exercise>>;
  searchExercisesBySecondaryMuscle(secondaryMuscle: string, skip: number, limit: number): Promise<Array<Exercise>>;
  signup(username: string, password: string, email: string): Promise<string>;
  login(email: string, password: string): Promise<User>;
  cloneExerciseDBScheduler(): void;
}

export interface IApi {
  getExerciseById(req: Request, res: Response): void
  searchExercisesByName(req: Request, res: Response): void;
  searchExercisesByBodyPart(req: Request, res: Response): void;
  searchExercisesByEquipment(req: Request, res: Response): void;
  searchExercisesByTarget(req: Request, res: Response): void;
  searchExercisesBySecondaryMuscle(req: Request, res: Response): void;
  cloneExerciseDB(req: Request, res: Response): void;
}
