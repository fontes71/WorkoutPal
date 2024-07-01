import { Request, Response } from "express";

import { User } from "../domain/types.ts";
import { IAuthApi, IAuthServices } from "../domain/interfaces.ts";
import { apiErrorHandler, getToken, sendResponse } from "../utils/functions/api.ts";
import { AuthInfoUser, StatusCode, UserResponse } from "../domain/api.ts";

export class AuthApi implements IAuthApi {
  private services: IAuthServices

  constructor(services: IAuthServices) {
    this.services = services
  }

  signup = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const user: User = await this.services.signup(req.body.username, req.body.password, req.body.email)
      sendResponse(res, StatusCode.Created, "Signup successful", this.userToUserResponse(user))
    })
  }

  login = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const user: User = await this.services.login(req.body.email, req.body.password)
      sendResponse(res, StatusCode.Success, "Login successful", this.userToUserResponse(user))
    })
  }

  logout = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => { 
      const token = getToken(req)
      await this.services.logout(token)
      sendResponse(res, StatusCode.Success, "Logout successful", {})
    })
  }

  userToUserResponse(user: User): UserResponse {
    const {username, email, token}: User = user
    const userResponse: UserResponse = {username, email, token}
    return userResponse
  }

  userToAuthInfoUser(user: User): AuthInfoUser {
    const {username, email, token}: User = user
    const authInfoUser: AuthInfoUser = {username, email, token}
    return authInfoUser
  }
}
