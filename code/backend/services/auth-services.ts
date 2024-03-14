import {
  InvalidParamsError,
  NonExistentEmailError,
  IncorrectPasswordError,
} from "../errors/app_errors";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { IAuthData, IAuthServices } from "../domain/interfaces";

export class AuthServices implements IAuthServices {
  private data: IAuthData;

  constructor(data: IAuthData) {
    this.data = data;
  }


signup = async (username: string, password: string, email: string) => {
    if (!username || !password || !email) throw InvalidParamsError;
    const token = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    this.data.createUser(username, hashedPassword, email, token);
    return token;
  };

  login = async (email: string, password: string) => {
    if (!email || !password) throw InvalidParamsError;
    const user = await this.data.getUserByMail(email);
    if (!user) throw NonExistentEmailError;
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw IncorrectPasswordError;
    return user;
  };
}