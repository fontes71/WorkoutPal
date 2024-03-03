import { Exercise } from "../domain/types.ts";
import app from "../server.ts";
import request from "supertest";

/*
    A worker process has failed to exit gracefully and has been force exited. This is likely
    caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to
    find leaks. Active timers can also cause this, ensure that .unref() was called on them.
 */

describe("Endpoint: /api/exercise/:exerciseId", () => {
  it("GET -> Response contains exercise", async () => {
    const expectedExerciseId: string = "0001";

    const res = await request(app)
      .get("/api/exercise/0001")
      .expect("Content-Type", /json/)
      .expect(200);

    const receivedBody = res.body as Exercise;

    expect(receivedBody._id).toStrictEqual(expectedExerciseId);
  });

  it("GET -> Response does not contain exercise", async () => {
    const res = await request(app)
      .get("/api/exercise/-1")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});

describe("Endpoint: /api/exercises/:exerciseName", () => {
  it("GET -> Response contains exercises", async () => {
    const expectedExerciseId: string = "1758";

    const res = await request(app)
      .get("/api/exercises/sit?limit=1&skip=2")
      .expect("Content-Type", /json/)
      .expect(200);

    const receivedBody = res.body as Exercise[];
    
    expect(receivedBody[0]._id).toStrictEqual(expectedExerciseId);
  });

  it("GET -> Response does not contain exercises", async () => {
    const res = await request(app)
      .get("/api/exercises/-1")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});

/*
describe("POST /users", () => {

  describe("when passed a username and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/users").send({ 
        username: "username", 
        password: "password" 
      })
      expect(response.statusCode).toBe(200)
    })
  })

}) */
