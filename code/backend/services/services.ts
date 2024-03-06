import { Data } from "../data/mongo/data";
import { Exercise } from "../domain/types";
import { NotFoundError, InvalidParamsError, InvalidCredentialsError, NonExistentEmailError, IncorrectPasswordError} from "../errors/app_errors";
import cron from "node-cron";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

// try catch need on services cuz sometimes data throws error and the app stop inside services 
export class Services {
  private data: Data;

  constructor(data: Data) {
    this.data = data;
    this.getExerciseById = this.getExerciseById.bind(this);
    this.searchExercisesByName = this.searchExercisesByName.bind(this);
    this.cloneExerciseDB = this.cloneExerciseDB.bind(this);

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  async getExerciseById(id: string) {
    const exercise: Exercise = await this.data.getExerciseById(id);
    if (exercise == null) throw NotFoundError;
    return exercise;
  }

  async searchExercisesByName(name: string, skip: number, limit: number) {
    const exercises: Array<Exercise> = await this.data.searchExercisesByName(name, skip, limit);
    if (exercises.length == 0) throw NotFoundError;
    return exercises;
  }

  async signup(username: string, password: string, email: string) {
    if (!username || !password || !email) throw InvalidParamsError;
    const token = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    this.data.createUser(username, hashedPassword, email, token);
    return token;
  }

  async login(email: string, password: string) {
    if (!email || !password) throw InvalidParamsError;
    const user = await this.data.getUserByMail(email);
    if (!user) throw NonExistentEmailError;
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw IncorrectPasswordError;
    return user
  }

  cloneExerciseDBScheduler() {
    cron.schedule("0 0 0 * * *", function () {
      this.data.cloneExerciseDB()
    });
  }

  cloneExerciseDB() {
    this.data.cloneExerciseDB()
  }
}
