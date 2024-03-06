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

describe("SearchExercisesByName function tests", () => {
  test("searchExercisesByName returns the exercises successfully", () => {
    const name = "sit";
    service
      .searchExercisesByName(name, 0, 10)
      .then((exercises) => expect(exercises[0]._id).toBe("0001"));
  });

  test("searchExercisesByName throws not found when no exercises are found", () => {
    service
      .searchExercisesByName("zzzz", 0, 1)
      .catch((error) => expect(error).toBe(NotFoundError));
  });

  test("searchExercisesByName returns the number of exercises requested", () => {
    const name = "sit";
    service
      .searchExercisesByName(name, 0, 1)
      .then((exercises) => expect(exercises.length).toBe(1));
  });

  test("searchExercisesByName skips the number of exercises requested", () => {
    const name = "sit";
    service
      .searchExercisesByName(name, 2, 1)
      .then((exercises) => expect(exercises[0]._id).toBe("1758"));
  });
});

describe("SearchExercisesByBodyPart function tests", () => {
  test("searchExercisesByBodyPart returns the exercises successfully", () => {
    const bodyPart = "waist";
    service
      .searchExercisesByBodyPart(bodyPart, 0, 10)
      .then((exercises) => expect(exercises[0]._id).toBe("0003"));
  });

  test("searchExercisesByBodyPart throws not found when no exercises are found", () => {
    service
      .searchExercisesByBodyPart("zzzz", 0, 1)
      .catch((error) => expect(error).toBe(NotFoundError));
  });

  test("searchExercisesByBodyPart returns the number of exercises requested", () => {
    const bodyPart = "waist";
    service
      .searchExercisesByBodyPart(bodyPart, 0, 1)
      .then((exercises) => expect(exercises.length).toBe(1));
  });

  test("searchExercisesByBodyPart skips the number of exercises requested", () => {
    const bodyPart = "waist";
    service
      .searchExercisesByBodyPart(bodyPart, 2, 1)
      .then((exercises) => expect(exercises[0]._id).toBe("0003"));
  });
});

describe("SearchExercisesByEquipment function tests", () => {
  test("searchExercisesByEquipment returns the exercises successfully", () => {
    const equipment = "body weight";
    service
      .searchExercisesByEquipment(equipment, 0, 10)
      .then((exercises) => expect(exercises[0]._id).toBe("0003"));
  });

  test("searchExercisesByEquipment throws not found when no exercises are found", () => {
    service
      .searchExercisesByEquipment("zzzz", 0, 1)
      .catch((error) => expect(error).toBe(NotFoundError));
  });

  test("searchExercisesByEquipment returns the number of exercises requested", () => {
    const equipment = "body weight";
    service
      .searchExercisesByEquipment(equipment, 0, 1)
      .then((exercises) => expect(exercises.length).toBe(1));
  });

  test("searchExercisesByEquipment skips the number of exercises requested", () => {
    const equipment = "body weight";
    service
      .searchExercisesByEquipment(equipment, 2, 1)
      .then((exercises) => expect(exercises[0]._id).toBe("0003"));
  });
});

describe("SearchExercisesByTarget function tests", () => {
  test("searchExercisesByTarget returns the exercises successfully", () => {
    const target = "abs";
    service
      .searchExercisesByTarget(target, 0, 10)
      .then((exercises) => expect(exercises[0]._id).toBe("0003"));
  });

  test("searchExercisesByTarget throws not found when no exercises are found", () => {
    service
      .searchExercisesByTarget("zzzz", 0, 1)
      .catch((error) => expect(error).toBe(NotFoundError));
  });

  test("searchExercisesByTarget returns the number of exercises requested", () => {
    const target = "abs";
    service
      .searchExercisesByTarget(target, 0, 1)
      .then((exercises) => expect(exercises.length).toBe(1));
  });

  test("searchExercisesByTarget skips the number of exercises requested", () => {
    const target = "abs";
    service
      .searchExercisesByTarget(target, 2, 1)
      .then((exercises) => expect(exercises[0]._id).toBe("0003"));
  });
});