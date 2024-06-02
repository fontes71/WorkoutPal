import {
  InvalidParamsError,
  NonExistentEmailError,
  IncorrectPasswordError,
  ExistentEmailError,
  Unauthorized,
} from "../errors/app_errors";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { IAuthData, IAuthServices } from "../domain/interfaces";
import { transactionHandler } from "../utils/functions/data";

export class AuthServices implements IAuthServices {
  private data: IAuthData;

  constructor(data: IAuthData) {
    this.data = data;
  }

  login = async (email: string, password: string) => {
    return transactionHandler(async () => {
      const token = uuidv4()
      if (!email || !password) throw InvalidParamsError
      const user = await this.data.getUserAndUpdateToken(email, token)
      if (!user) throw NonExistentEmailError
      const match = await bcrypt.compare(password, user.password)
      if (!match) throw IncorrectPasswordError
      return user
    })
  }

  signup = (username: string, password: string, email: string) => {
    return transactionHandler(async () => {
      if (!username || !password || !email) throw InvalidParamsError
      const user = await this.data.getUserByEmail(email)
      if (user) throw ExistentEmailError
      const token = uuidv4()
      const hashedPassword = await bcrypt.hash(password, 10)
      await this.data.createUser(username, hashedPassword, email, token)
      return token
    })
  }

  logout = (token: string) => {
    return transactionHandler(async () => {
      const user = await this.data.tryClearUserToken(token)
      if (!user) throw Unauthorized
    })
  }
}