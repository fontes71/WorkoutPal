import express from "express";

import { AuthApi } from "./api/auth-api.ts";
import { Api } from "./api/api.ts";
import { Services } from "./services/services.ts";
import { Data } from "./data/mongo/data.ts";
import passport from 'passport';

const data = new Data();
const service = new Services(data);
const authApi = new AuthApi(service);
const api = new Api(service);

const port = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(passport.initialize());

// auth endpoints
app.post("/api/signup", authApi.signup);
app.post("/api/login", authApi.login);

app.get("/api/exercise/:exerciseId", passport.authenticate('bearer', { session: false }), authApi.authMiddleware, api.getExerciseById); // auth middleware used as a test on this endpoint
app.get("/api/exercises/name/:exerciseName", api.searchExercisesByName);
app.get("/api/exercises/bodyPart/:bodyPart", api.searchExercisesByBodyPart);
app.get("/api/exercises/equipment/:equipment", api.searchExercisesByEquipment);
app.get("/api/exercises/target/:target", api.searchExercisesByTarget);
app.get("/api/cloneDatabase", api.cloneExerciseDB);

app.listen(8080, () => {
  console.log(`Listening...\nhttp://localhost:` + port);
  service.cloneExerciseDBScheduler();
});

export default app;
