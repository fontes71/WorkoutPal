import express from "express";

import { AuthApi } from "./api/auth-api.ts";
import { Api } from "./api/api.ts";
import { Services } from "./services/services.ts";
import { Data } from "./data/mongo/data.ts";
import passport from 'passport';
import { IServices } from "./domain/interfaces.ts";

const data = new Data();
const services = new Services(data);
const authApi = new AuthApi(services, data);
const api = new Api(services, data);

const port = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(passport.initialize());

//auth endpoints
app.post("/api/signup", authApi.signup);
app.post("/api/login", authApi.login);

app.get("/api/exercise/:exerciseId", api.getExerciseById);
app.get("/api/exercises/name/:exerciseName", api.searchExercisesByName);
app.get("/api/exercises/bodyPart/:exerciseBodyPart", api.searchExercisesByBodyPart);
app.get("/api/exercises/equipment/:exerciseEquipment", api.searchExercisesByEquipment);
app.get("/api/exercises/target/:exerciseTarget", api.searchExercisesByTarget);
app.get("/api/exercises/secondaryMuscle/:exerciseSecondaryMuscle", api.searchExercisesBySecondaryMuscle);
app.get("/api/cloneDatabase", api.cloneExerciseDB);

app.listen(8080, () => {
  console.log(`Listening...\nhttp://localhost:` + port);
  services.cloneExerciseDBScheduler();
});

export default app;
