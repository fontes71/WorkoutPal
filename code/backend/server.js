import express from "express";




const services = servicesFunctions(data, moviesData)
const webAPI = webApiFunctions(services)
const authRouter = authUIFunction(services)
const webUI = webUiFunctions(services)

const port = 8080;

const app = express();

app.use(express.json());
//app.use(express.urlencoded({extended : false}))

app.get("/api/exercise/:exerciseId", webAPI.getMovies);

app.listen(8080, () => console.log(`Listening...\nhttp://localhost:` + port));
