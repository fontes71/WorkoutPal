import { IUserData } from "../domain/interfaces";
import { User } from "../domain/types";
import { UserModel } from "../mongoose/schemas";

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
