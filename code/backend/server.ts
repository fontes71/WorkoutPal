import express from "express";

import { WpApi } from "./api/wp-api.js";
import { WpService } from "./services/wp-service.js";
import { WpData } from "./data/wp-data.js";

const data = new WpData()
const service = new WpService(data)
const api = new WpApi(service)


const port = 8080;

const app = express();

app.use(express.json());
//app.use(express.urlencoded({extended : false}))

app.get("/api/exercise/:exerciseId", api.getExerciseById);

app.listen(8080, () => console.log(`Listening...\nhttp://localhost:` + port));
