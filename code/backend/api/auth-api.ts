import { Request, Response, NextFunction } from "express";
import { Services } from "../services/services";
import passport from 'passport';
import passport_http_bearer from 'passport-http-bearer';
import { Data } from "../data/mongo/data.ts";
import { apiErrorHandler } from "./api-utils";
import { AuthInfo, AuthInfoUser, UserResponse } from "./model.ts";
import { User } from "../domain/types.ts";

declare global {
  namespace Express {
    interface Request {
      authInfo?: AuthInfo; 
    }
  }
}

const BearerStrategy = passport_http_bearer.Strategy
const data = new Data();

export class AuthApi {
  private service: Services;

  constructor(service: Services) {
    this.service = service;
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.authMiddleware = this.authMiddleware.bind(this);

    passport.use(new BearerStrategy(async (token, done) => {
        const user = await data.getUserByToken(token)
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all', user: this.userToAuthInfoUser(user) });
      }
    ));
  }

  signup(req: Request, res: Response) {
    apiErrorHandler(res, async () => {
      const token = await this.service.signup(req.body.username, req.body.password, req.body.email);
      res.status(201).json({'authentication_token': token});
    });
  }

  login(req: Request, res: Response) {
    apiErrorHandler(res, async () => {
      const user: User = await this.service.login(req.body.email, req.body.password);
      res.status(200).json({status: "Login successful", user: this.userToUserResponse(user)});
    });
  }

  userToUserResponse(user: User): UserResponse {
    const {username, email, token, workout_plans, days}: User = user
    const userResponse: UserResponse = {username, email, token, workout_plans, days}
    return userResponse
  }

  userToAuthInfoUser(user: User): AuthInfoUser {
    const {username, email, token}: User = user
    const authInfoUser: AuthInfoUser = {username, email, token}
    return authInfoUser
  }

  authMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log("user ->", req.authInfo.user)
    next()
  }
}
