import {
  InvalidParamsError,
  NonExistentEmailError,
  IncorrectPasswordError,
} from "../errors/app_errors";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { IAuthData, IAuthServices } from "../domain/interfaces";
import { transactionHandler } from "../utils/functions/data";

export class AuthServices implements IAuthServices {
  private connectionUri: string | undefined;
  private data: IAuthData;

  constructor(connectionUri: string | undefined, data: IAuthData) {
    this.connectionUri = connectionUri;
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

  signupAutoLogin = (username: string, password: string, email: string) => {
    return transactionHandler(this.connectionUri, async () => {
      if (!username || !password || !email) throw InvalidParamsError;
      const token = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.data.createUser1(username, hashedPassword, email, token);
      const user = await this.data.getUserByMail1(email);
      return user?.token;
    })
  }
}