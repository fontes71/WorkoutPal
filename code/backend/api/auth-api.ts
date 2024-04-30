import { Request, Response, NextFunction } from "express";
import passport from 'passport';
import passport_http_bearer from 'passport-http-bearer';
import { User } from "../domain/types.ts";
import { IAuthApi, IAuthData, IAuthServices } from "../domain/interfaces.ts";
import { apiErrorHandler } from "../utils/functions/api.ts";
import { AuthInfoUser, UserResponse } from "../domain/api.ts";

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

  signup = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      const token = await this.services.signup(req.body.username, req.body.password, req.body.email);
      res.status(201).json({'authentication_token': token});
    });
  }

  signupAutoLogin = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      const token = await this.services.signupAutoLogin(req.body.username, req.body.password, req.body.email);
      res.status(201).json({'authentication_token': token});
    });
  }

  login = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      const user: User = await this.services.login(req.body.email, req.body.password);
      res.status(200).json({status: "Login successful", user: this.userToUserResponse(user)});
    });
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
