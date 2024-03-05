import express from "express";

import { Api } from "./api/api.ts";
import { Services } from "./services/services.ts";
import { Data } from "./data/mongo/data.ts";
import passport from 'passport';
import passport_http_bearer from 'passport-http-bearer';

const BearerStrategy = passport_http_bearer.Strategy
const data = new Data();
const service = new Services(data);
const api = new Api(service);

const port = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(passport.initialize());

passport.use(new BearerStrategy(async (token, done) => {
    const user = await data.getUserByToken(token)
    if (!user) { return done(null, false); }
    return done(null, user, { scope: 'all' });
  }
));

// auth endpoints
app.post("/api/signup", api.signup);
app.post("/api/login", api.login);

app.get("/api/exercise/:exerciseId", authMiddleWare, api.getExerciseById); // auth middleware used as a test on this endpoint
app.get("/api/exercises/:exerciseName", api.searchExercisesByName);
app.get("/api/cloneDatabase", api.cloneExerciseDB);

function authMiddleWare(req, res, next) {
  passport.authenticate('bearer', { session: false }, (err, user, info) => {
    if (!user) { return res.status(401).json({message: "Unauthorized to access this resource"}) }
    console.log("AuthInfo -> ", req.authInfo) // suposedly where the information afeter authentication complete will be found, but there is nothing !!for now!!
    console.log("User ->", user)
    next()
  })(req, res, next);
}

app.listen(8080, () => {
  console.log(`Listening...\nhttp://localhost:` + port);
  service.cloneExerciseDBScheduler();
});

export default app;
