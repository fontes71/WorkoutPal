import { User } from "../../domain/types";
import { IAuthData } from "../../domain/interfaces";
import { UserModel } from "./mongoose";

export class AuthData implements IAuthData {
  async getUserByToken(token: string) {
    const user: User | null = await UserModel.findOne({ token })
    return user
  }

  async tryClearUserToken(token: string): Promise<User | null> {
    const updatedUser = { token: null }
    const user: User | null = await UserModel.findOneAndUpdate({token: token}, updatedUser, {new: true})
    return user
  }

  async createUser(username: string, password: string, email: string, token: string) {
    const user: User = {
      username,
      password,
      email: email,
      token,
      workout_plans: [],
      days: [],
    };
    await UserModel.create(user);
  }

  async getUserAndUpdateToken(email: string, token: string) {
    const updatedUser = { token: token }
    const user: User | null = await UserModel.findOneAndUpdate({email: email}, updatedUser, {new: true})
    return user;
  }

  async getUserByEmail(email: string) {
    const user: User | null = await UserModel.findOne({email: email})
    return user;
  }
}
