import { Request, Response, NextFunction } from "express";
import { Services } from "../services/services";
import passport from 'passport';
import passport_http_bearer from 'passport-http-bearer';
import { Data } from "../data/mongo/data.ts";
import { apiErrorHandler } from "./api-utils";

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
        return done(null, user, { scope: 'all' });
      }
    ));
  }

  signup(req: Request, res: Response) {
    apiErrorHandler(res, async () => {
      const token = await this.service.signup(req.body.username, req.body.password, req.body.mail);
      res.status(201).json({'authentication_token': token});
    });
  }

  login(req: Request, res: Response) {
    apiErrorHandler(res, async () => {
      await this.service.login(req.body.mail, req.body.password);
      res.status(200).json({'status': "Login successful"});
    });
  }

  authMiddleware(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
      if (!user) { return res.status(401).json({message: "Unauthorized to access this resource"}) }
      //console.log("AuthInfo -> ", req.authInfo) // suposedly where the information afeter authentication complete will be found, but there is nothing !!for now!!
      console.log("User ->", user)
      next()
    })(req, res, next);
  }
}
