import { Data } from "../data/mongo/data";
import { Exercise } from "../domain/types";
import { NotFoundError, InvalidParamsError, NonExistentEmailError, IncorrectPasswordError} from "../errors/app_errors";
import cron from "node-cron";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { IData, IServices } from "../domain/interfaces";

// try catch need on services cuz sometimes data throws error and the app stop inside services 
export class Services implements IServices {
  private data: IData;

  constructor(data: IData) {
    this.data = data;
  }

  getExerciseById = async (id: string) => {
    const exercise: Exercise | null = await this.data.getExerciseById(id);
    if (exercise == null) throw NotFoundError;
    return exercise;
  }

  searchExercisesByName = async (name: string, skip: number, limit: number) => {
    const exercises: Array<Exercise> = await this.data.searchExercisesByName(name, skip, limit);
    if (exercises.length == 0) throw NotFoundError;
    return exercises;
  }

  searchExercisesByBodyPart = async (bodyPart: string, skip: number, limit: number) => {
    const exercises: Array<Exercise> = await this.data.searchExercisesByBodyPart(bodyPart, skip, limit);
    if (exercises.length == 0) throw NotFoundError;
    return exercises;
  }

  searchExercisesByEquipment = async (equipment: string, skip: number, limit: number) => {
    const exercises: Array<Exercise> = await this.data.searchExercisesByEquipment(equipment, skip, limit);
    if (exercises.length == 0) throw NotFoundError;
    return exercises;
  }

  searchExercisesByTarget = async (target: string, skip: number, limit: number) => {
    const exercises: Array<Exercise> = await this.data.searchExercisesByTarget(target, skip, limit);
    if (exercises.length == 0) throw NotFoundError;
    return exercises;
  }


  searchExercisesBySecondaryMuscle = async (secondaryMuscle: string, skip: number, limit: number) => {
    const exercises: Array<Exercise> = await this.data.searchExercisesBySecondaryMuscle(secondaryMuscle, skip, limit);
    if (exercises.length == 0) throw NotFoundError;
    return exercises;
  }

  signup = async (username: string, password: string, email: string) => {
    if (!username || !password || !email) throw InvalidParamsError;
    const token = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    this.data.createUser(username, hashedPassword, email, token);
    return token;
  }

  login = async (email: string, password: string) => {
    if (!email || !password) throw InvalidParamsError;
    const user = await this.data.getUserByMail(email);
    if (!user) throw NonExistentEmailError;
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw IncorrectPasswordError;
    return user
  }

  cloneExerciseDBScheduler() {
    cron.schedule("0 0 0 * * *",  () => {
      this.data.cloneExerciseDB()
    });
  }
}
