import { Request, Response, NextFunction } from "express";
import passport from 'passport';
import passport_http_bearer from 'passport-http-bearer';
import { User } from "../domain/types.ts";
import { IAuthApi, IAuthData, IAuthServices } from "../domain/interfaces.ts";
import { apiErrorHandler, getToken, sendResponse } from "../utils/functions/api.ts";
import { AuthInfoUser, StatusCode, UserResponse } from "../domain/api.ts";
import { InvalidAuthorizationTokenError, NonExistentAuthorizationTokenError } from "../errors/app_errors.ts";

const BearerStrategy = passport_http_bearer.Strategy

export class AuthApi implements IAuthApi {
  private services: IAuthServices;
  private data: IAuthData;

  constructor(services: IAuthServices, data: IAuthData) {
    this.services = services;
    this.data = data;

    passport.use(new BearerStrategy(async (token, done) => {
        const user = await this.data.getUserByToken(token)
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      }
    ));
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
    });
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
