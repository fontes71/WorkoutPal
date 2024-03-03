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
    const expectedBody: Exercise = {
      bodyPart: "waist",
      equipment: "body weight",
      gifUrl: "https://v2.exercisedb.io/image/kAZXQ6b53Vc10k",
      _id: "0001",
      name: "3/4 sit-up",
      target: "abs",
      secondaryMuscles: ["hip flexors", "lower back"],
      instructions: [
        "Lie flat on your back with your knees bent and feet flat on the ground.",
        "Place your hands behind your head with your elbows pointing outwards.",
        "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
        "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
        "Repeat for the desired number of repetitions.",
      ],
    };

    const res = await request(app)
      .get("/api/exercise/0001")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body as Exercise).toStrictEqual(expectedBody);
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
    const expectedBody: Exercise[] = [
      {
          "_id": "1758",
          "bodyPart": "waist",
          "equipment": "assisted",
          "gifUrl": "https://v2.exercisedb.io/image/ZSi5gT4EAVUttd",
          "name": "assisted sit-up",
          "target": "abs",
          "secondaryMuscles": [
              "hip flexors"
          ],
          "instructions": [
              "Sit on the edge of a bench or have someone hold your feet down.",
              "Lie flat on your back with your knees bent and feet flat on the ground.",
              "Place your hands behind your head with your elbows pointing outwards.",
              "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
              "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
              "Repeat for the desired number of repetitions."
          ]
      }
    ];

    const res = await request(app)
      .get("/api/exercises/sit?limit=1&skip=2")
      .expect("Content-Type", /json/)
      .expect(200);

    const receivedBody = res.body as Exercise[];
    
    expect(receivedBody[0]._id).toStrictEqual(expectedBody[0]._id);
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
