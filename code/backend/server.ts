import express from "express";

import { Api } from "./api/api.ts";
import { Services } from "./services/services.ts";
import { Data } from "./data/local/data.ts";

const data = new Data();
const service = new Services(data);
const api = new Api(service);

const port = 8080;

const app = express();

app.use(express.json());
//app.use(express.urlencoded({extended : false}))

app.get("/api/exercise/:exerciseId", api.getExerciseById);

app.listen(8080, () => console.log(`Listening...\nhttp://localhost:` + port));
