import express from "express";

import { Api } from "./api/api.ts";
import { Services } from "./services/services.ts";
import { Data } from "./data/local/data.ts";
import passport from 'passport';
import passport_http_bearer from 'passport-http-bearer';
import bcrypt from 'bcrypt';

const BearerStrategy = passport_http_bearer.Strategy
const data = new Data();
const service = new Services(data);
const api = new Api(service);

const port = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(passport.initialize());

// auth endpoints
app.post("/api/signup", api.signup);
app.post("/api/login", api.login);

app.get("/api/exercise/:exerciseId", api.getExerciseById);
app.get("/api/exercises/:exerciseName", api.searchExercisesByName);
app.get("/api/cloneDatabase", api.cloneExerciseDB);

app.listen(8080, () => {
  console.log(`Listening...\nhttp://localhost:` + port);
  service.cloneExerciseDBScheduler();
});

export default app;
