import { Api } from "../api/api.ts";
import { Services } from "../services/services.ts";
import { Data } from "../data/local/data.ts";
import { NotFoundError } from "../errors/app_errors";

const data = new Data();
const service = new Services(data);
const api = new Api(service);

test("getExerciseById throws not found when exercise does not exist", () => {
  return service.getExerciseById("100000000").catch((error) => {
    expect(error).toMatchObject(new NotFoundError());
  });
});

/*
function sum(a, b) {
    return a + b;
  }



test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
*/
