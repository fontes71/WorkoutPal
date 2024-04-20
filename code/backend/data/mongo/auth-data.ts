import { User } from "../../domain/types";
import { IAuthData } from "../../domain/interfaces";
import { mongodbHandler } from "../../utils/functions/data";
import { UserModel } from "./mongoose";

export class AuthData implements IAuthData {
  createUser(username: string, password: string, email: string, token: string) {
    return mongodbHandler(async () => {
      const user: User = {
        username,
        password,
        email: email,
        token,
        workout_plans: [],
        days: [],
      };
      await UserModel.create(user);
    });
  }

  getUserByToken(token: string) {
      const user: Promise<User | null> =  UserModel.findOne({ token });
      return user;
  }

  getUserByMail(email: string) {
    return mongodbHandler(async () => {
      const user = await UserModel.findOne({ email: email });
      return user;
    });
  }
}
