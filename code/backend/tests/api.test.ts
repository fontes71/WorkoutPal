import { Api } from "../api/api.ts";
import { Services } from "../services/services.ts";
import { Data } from "../data/local/data.ts";

const data = new Data();
const service = new Services(data);
const api = new Api(service);


/*
function sum(a, b) {
    return a + b;
  }



test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
*/
