import { IFoodData, IUserData } from "../../domain/interfaces";
import { ConsumedFood, Day, User } from "../../domain/types";
import getDate from "../../utils/functions/app/getDate";
import { mongodbHandler } from "../../utils/functions/data";
import { UserModel } from "./mongoose";

export class UserData implements IUserData {
  getUserByToken(token: string) {
    const user: Promise<User | null> = UserModel.findOne({ token });
    return user;
  }

  updateUser(token: string, user: User) {
    const updatedUser: Promise<User | null> = UserModel.findOneAndUpdate(
      { token },
      user,
      { new: true }
    );
    return updatedUser;
  }
}
