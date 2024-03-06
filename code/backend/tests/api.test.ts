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

describe("Endpoint: /api/exercises/name/:exerciseName", () => {
  it("GET -> Response contains exercises", async () => {
    const expectedExerciseId: string = "1758";

    const res = await request(app)
      .get("/api/exercises/name/sit?limit=1&skip=2")
      .expect("Content-Type", /json/)
      .expect(200);

    const receivedBody = res.body as Exercise[];
    
    expect(receivedBody[0]._id).toStrictEqual(expectedExerciseId);
  });

  it("GET -> Response does not contain exercises", async () => {
    const res = await request(app)
      .get("/api/exercises/name/-1")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});

describe("Endpoint: /api/exercises/bodypart/:bodyPart", () => {
  it("GET -> Response contains exercises", async () => {
    const expectedExerciseId: string = "0003";

    const res = await request(app)
      .get("/api/exercises/bodyPart/waist?limit=2&skip=2")
      .expect("Content-Type", /json/)
      .expect(200);

    const receivedBody = res.body as Exercise[];
    
    expect(receivedBody[0]._id).toStrictEqual(expectedExerciseId);
  });

  it("GET -> Response does not contain exercises", async () => {
    const res = await request(app)
      .get("/api/exercises/bodyPart/-1")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});

describe("Endpoint: /api/exercises/equipment/:equipment", () => {
  it("GET -> Response contains exercises", async () => {
    const expectedExerciseId: string = "0003";

    const res = await request(app)
      .get("/api/exercises/equipment/body weight?limit=2&skip=2")
      .expect("Content-Type", /json/)
      .expect(200);

    const receivedBody = res.body as Exercise[];
    
    expect(receivedBody[0]._id).toStrictEqual(expectedExerciseId);
  });

  it("GET -> Response does not contain exercises", async () => {
    const res = await request(app)
      .get("/api/exercises/equipment/-1")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});

describe("Endpoint: /api/exercises/target/:target", () => {
  it("GET -> Response contains exercises", async () => {
    const expectedExerciseId: string = "0003";

    const res = await request(app)
      .get("/api/exercises/target/abs?limit=2&skip=2")
      .expect("Content-Type", /json/)
      .expect(200);

    const receivedBody = res.body as Exercise[];
    
    expect(receivedBody[0]._id).toStrictEqual(expectedExerciseId);
  });

  it("GET -> Response does not contain exercises", async () => {
    const res = await request(app)
      .get("/api/exercises/target/-1")
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
