import { UserModel, mongodbHandler } from "./mongoose";
import { User } from "../../domain/types";
import { IAuthData } from "../../domain/interfaces";

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
      await UserModel.insertMany(user);
    });
  }

  getUserByToken(token: string) {
    return mongodbHandler(async () => {
      const user = UserModel.findOne({ token });
      return user;
    });
  }

  getUserByMail(email: string) {
    return mongodbHandler(async () => {
      const user = UserModel.findOne({ email: email });
      return user;
    });
  }
}
