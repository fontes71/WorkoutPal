import { Api } from "../api/api.ts";
import { Services } from "../services/services.ts";
import { Data } from "../data/local/data.ts";
import { NotFoundError } from "../errors/app_errors.ts";
import { NOTFOUND } from "node:dns";

const data = new Data();
const service = new Services(data);
const api = new Api(service);

describe("GetExerciseById function tests", () => {
  test("getExerciseById returns the exercise successfully", () => {
    const id = "0001";
    service
      .getExerciseById(id)
      .then((exercise) => expect(exercise._id).toBe(id));
  });

  test("getExerciseById throws not found when exercise does not exist", () => {
    service
      .getExerciseById("1000000000")
      .catch((error) => expect(error).toBe(NotFoundError));
  });
});

