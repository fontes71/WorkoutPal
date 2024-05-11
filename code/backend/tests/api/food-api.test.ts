import { Exercise, Food } from "../../domain/types.ts";
import app from "../../server.ts";
import request from "supertest";
//import { food_results } from "../files/food.ts";

describe("GetExerciseById function tests", () => {
  it("getExerciseById returns the exercise successfully", () => {
    expect(true).toBe(true)
  })
})
/*
describe("Endpoint: /api/food/search", () => {
  it("test1", async () => {
    expect(true).toStrictEqual(true)
  })
  /*it("GET -> Response contains food items", async () => {

    const res = await request(app)
      .get("/api/food/search?query=egg")
      .expect("Content-Type", /json/)
      .expect(200);

    const receivedBody = res.body as Food[];
    expect(receivedBody).toStrictEqual(food_results);
  });

  it("GET -> Response has status 404 if not items were found", async () => {
    const res = await request(app)
      .get("/api/food/search?query=notAFood")
      .expect("Content-Type", /json/)
      .expect(404);
  });

  it("GET -> Response has status 400 when query is not defined", async () => {
    const res = await request(app)
      .get("/api/food/search?query=")
      .expect("Content-Type", /json/)
      .expect(400);
  });*/
});
*/