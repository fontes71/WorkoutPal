import {
  AlreadyExistsError,
  InvalidAuthorizationTokenError,
  NotFoundError,
} from "../../errors/app_errors.ts";
import { ExerciseServices } from "../../services/exercise-services.ts";
import { ExerciseData } from "../../data/exercise-data.ts";
import {
  mockExercise,
  mockExercise2,
  mockExercisesArray,
  mockWorkoutPlan,
} from "./mockData/exercise.ts";
import { ERROR_WORKOUTPLAN } from "../../utils/constants.ts";

jest.mock("mongoose", () => ({
  connect: jest.fn(),
  startSession: jest.fn(() => ({
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    abortTransaction: jest.fn(),
    endSession: jest.fn(),
  })),
  connection: {
    close: jest.fn(),
  },
  Schema: function () {
    return {};
  },
  model: jest.fn(),
}));

jest.mock("");

let exerciseServices: ExerciseServices;
let exerciseData: ExerciseData;

beforeEach(() => {
  exerciseData = new ExerciseData();
  exerciseServices = new ExerciseServices(exerciseData);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("GetExerciseById function tests", () => {
  it("getExerciseById returns the exercise successfully", async () => {
    exerciseData.getExerciseById = jest.fn().mockResolvedValue(mockExercise);
    const exercise = await exerciseServices.getExerciseById(mockExercise._id);
    expect(exercise._id).toBe(mockExercise._id);
    expect(exerciseData.getExerciseById).toHaveBeenCalledWith(mockExercise._id);
  });

  it("getExerciseById throws not found when exercise does not exist", () => {
    exerciseData.getExerciseById = jest.fn().mockResolvedValue(null);
    exerciseServices
      .getExerciseById(mockExercise._id)
      .catch((error: Error) => expect(error).toBe(NotFoundError));
    expect(exerciseData.getExerciseById).toHaveBeenCalledWith(mockExercise._id);
  });
});

describe("SearchExercisesByName function tests", () => {
  it("searchExercisesByName returns the exercises successfully", async () => {
    const name = "testExercise";
    exerciseData.searchExercisesByName = jest
      .fn()
      .mockResolvedValue(mockExercisesArray);
    const exercises = await exerciseServices.searchExercisesByName(name, 0, 10);
    expect(exercises).toBe(mockExercisesArray);
    expect(exerciseData.searchExercisesByName).toHaveBeenCalledWith(
      name,
      0,
      10
    );
  });

  it("searchExercisesByName throws not found when no exercises are found", () => {
    const name = "zzzz";
    exerciseData.searchExercisesByName = jest.fn().mockResolvedValue([]);
    exerciseServices
      .searchExercisesByName(name, 0, 1)
      .catch((error: Error) => expect(error).toBe(NotFoundError));
    expect(exerciseData.searchExercisesByName).toHaveBeenCalledWith(name, 0, 1);
  });

  it("searchExercisesByName returns the number of exercises requested", async () => {
    const name = "testExercise";
    exerciseData.searchExercisesByName = jest
      .fn()
      .mockResolvedValue([mockExercise]);
    const exercises = await exerciseServices.searchExercisesByName(name, 0, 1);
    expect(exercises.length).toBe(1);
    expect(exercises[0]).toBe(mockExercisesArray[0]);
    expect(exerciseData.searchExercisesByName).toHaveBeenCalledWith(name, 0, 1);
  });

  it("searchExercisesByName skips the number of exercises requested", async () => {
    const name = "testExercise";
    exerciseData.searchExercisesByName = jest
      .fn()
      .mockResolvedValue([mockExercise2]);
    const exercises = await exerciseServices.searchExercisesByName(name, 2, 1);
    expect(exercises[0]).toBe(mockExercise2);
    expect(exerciseData.searchExercisesByName).toHaveBeenCalledWith(name, 2, 1);
  });
});

describe("SearchExercisesByBodyPart function tests", () => {
  it("searchExercisesByBodyPart returns the exercises successfully", async () => {
    const bodyPart = "testBodyPart";
    exerciseData.searchExercisesByBodyPart = jest
      .fn()
      .mockResolvedValue(mockExercisesArray);
    const exercises = await exerciseServices.searchExercisesByBodyPart(
      bodyPart,
      0,
      10
    );
    expect(exercises).toBe(mockExercisesArray);
    expect(exerciseData.searchExercisesByBodyPart).toHaveBeenCalledWith(
      bodyPart,
      0,
      10
    );
  });

  it("searchExercisesByBodyPart throws not found when no exercises are found", () => {
    const bodyPart = "zzzz";
    exerciseData.searchExercisesByBodyPart = jest.fn().mockResolvedValue([]);
    exerciseServices
      .searchExercisesByBodyPart(bodyPart, 0, 1)
      .catch((error: Error) => expect(error).toBe(NotFoundError));
    expect(exerciseData.searchExercisesByBodyPart).toHaveBeenCalledWith(
      bodyPart,
      0,
      1
    );
  });

  it("searchExercisesByBodyPart returns the number of exercises requested", async () => {
    const bodyPart = "testBodyPart";
    exerciseData.searchExercisesByBodyPart = jest
      .fn()
      .mockResolvedValue([mockExercise]);
    const exercises = await exerciseServices.searchExercisesByBodyPart(
      bodyPart,
      0,
      1
    );
    expect(exercises.length).toBe(1);
    expect(exercises[0]).toBe(mockExercisesArray[0]);
    expect(exerciseData.searchExercisesByBodyPart).toHaveBeenCalledWith(
      bodyPart,
      0,
      1
    );
  });

  it("searchExercisesByBodyPart skips the number of exercises requested", async () => {
    const bodyPart = "testBodyPart";
    exerciseData.searchExercisesByBodyPart = jest
      .fn()
      .mockResolvedValue([mockExercise2]);
    const exercises = await exerciseServices.searchExercisesByBodyPart(
      bodyPart,
      2,
      1
    );
    expect(exercises[0]).toBe(mockExercise2);
    expect(exerciseData.searchExercisesByBodyPart).toHaveBeenCalledWith(
      bodyPart,
      2,
      1
    );
  });
});

describe("SearchExercisesByEquipment function tests", () => {
  it("searchExercisesByEquipment returns the exercises successfully", async () => {
    const equipment = "testEquipment";
    exerciseData.searchExercisesByEquipment = jest
      .fn()
      .mockResolvedValue(mockExercisesArray);
    const exercises = await exerciseServices.searchExercisesByEquipment(
      equipment,
      0,
      10
    );
    expect(exercises).toBe(mockExercisesArray);
    expect(exerciseData.searchExercisesByEquipment).toHaveBeenCalledWith(
      equipment,
      0,
      10
    );
  });

  it("searchExercisesByEquipment throws not found when no exercises are found", () => {
    const equipment = "zzzz";
    exerciseData.searchExercisesByEquipment = jest.fn().mockResolvedValue([]);
    exerciseServices
      .searchExercisesByEquipment(equipment, 0, 1)
      .catch((error: Error) => expect(error).toBe(NotFoundError));
    expect(exerciseData.searchExercisesByEquipment).toHaveBeenCalledWith(
      equipment,
      0,
      1
    );
  });

  it("searchExercisesByEquipment returns the number of exercises requested", async () => {
    const equipment = "testEquipment";
    exerciseData.searchExercisesByEquipment = jest
      .fn()
      .mockResolvedValue([mockExercise]);
    const exercises = await exerciseServices.searchExercisesByEquipment(
      equipment,
      0,
      1
    );
    expect(exercises.length).toBe(1);
    expect(exercises[0]).toBe(mockExercisesArray[0]);
    expect(exerciseData.searchExercisesByEquipment).toHaveBeenCalledWith(
      equipment,
      0,
      1
    );
  });

  it("searchExercisesByEquipment skips the number of exercises requested", async () => {
    const equipment = "testEquipment";
    exerciseData.searchExercisesByEquipment = jest
      .fn()
      .mockResolvedValue([mockExercise2]);
    const exercises = await exerciseServices.searchExercisesByEquipment(
      equipment,
      2,
      1
    );
    expect(exercises[0]).toBe(mockExercise2);
    expect(exerciseData.searchExercisesByEquipment).toHaveBeenCalledWith(
      equipment,
      2,
      1
    );
  });
});

describe("SearchExercisesByTarget function tests", () => {
  it("searchExercisesByTarget returns the exercises successfully", async () => {
    const target = "testTarget";
    exerciseData.searchExercisesByTarget = jest
      .fn()
      .mockResolvedValue(mockExercisesArray);
    const exercises = await exerciseServices.searchExercisesByTarget(
      target,
      0,
      10
    );
    expect(exercises).toBe(mockExercisesArray);
    expect(exerciseData.searchExercisesByTarget).toHaveBeenCalledWith(
      target,
      0,
      10
    );
  });

  it("searchExercisesByTarget throws not found when no exercises are found", () => {
    const target = "zzzz";
    exerciseData.searchExercisesByTarget = jest.fn().mockResolvedValue([]);
    exerciseServices
      .searchExercisesByTarget(target, 0, 1)
      .catch((error: Error) => expect(error).toBe(NotFoundError));
    expect(exerciseData.searchExercisesByTarget).toHaveBeenCalledWith(
      target,
      0,
      1
    );
  });

  it("searchExercisesByTarget returns the number of exercises requested", async () => {
    const target = "testTarget";
    exerciseData.searchExercisesByTarget = jest
      .fn()
      .mockResolvedValue([mockExercise]);
    const exercises = await exerciseServices.searchExercisesByTarget(
      target,
      0,
      1
    );
    expect(exercises.length).toBe(1);
    expect(exercises[0]).toBe(mockExercisesArray[0]);
    expect(exerciseData.searchExercisesByTarget).toHaveBeenCalledWith(
      target,
      0,
      1
    );
  });

  it("searchExercisesByTarget skips the number of exercises requested", async () => {
    const target = "testTarget";
    exerciseData.searchExercisesByTarget = jest
      .fn()
      .mockResolvedValue([mockExercise2]);
    const exercises = await exerciseServices.searchExercisesByTarget(
      target,
      2,
      1
    );
    expect(exercises[0]).toBe(mockExercise2);
    expect(exerciseData.searchExercisesByTarget).toHaveBeenCalledWith(
      target,
      2,
      1
    );
  });
});

describe("SearchExercisesBySecondaryMuscle function tests", () => {
  it("searchExercisesBySecondaryMuscle returns the exercises successfully", async () => {
    const secondaryMuscle = "testSecondaryMuscle1";
    exerciseData.searchExercisesBySecondaryMuscle = jest
      .fn()
      .mockResolvedValue(mockExercisesArray);
    const exercises = await exerciseServices.searchExercisesBySecondaryMuscle(
      secondaryMuscle,
      0,
      10
    );
    expect(exercises).toBe(mockExercisesArray);
    expect(exerciseData.searchExercisesBySecondaryMuscle).toHaveBeenCalledWith(
      secondaryMuscle,
      0,
      10
    );
  });

  it("searchExercisesBySecondaryMuscle throws not found when no exercises are found", () => {
    const secondaryMuscle = "zzzz";
    exerciseData.searchExercisesBySecondaryMuscle = jest
      .fn()
      .mockResolvedValue([]);
    exerciseServices
      .searchExercisesBySecondaryMuscle(secondaryMuscle, 0, 1)
      .catch((error: Error) => expect(error).toBe(NotFoundError));
    expect(exerciseData.searchExercisesBySecondaryMuscle).toHaveBeenCalledWith(
      secondaryMuscle,
      0,
      1
    );
  });

  it("searchExercisesBySecondaryMuscle returns the number of exercises requested", async () => {
    const secondaryMuscle = "testSecondaryMuscle1";
    exerciseData.searchExercisesBySecondaryMuscle = jest
      .fn()
      .mockResolvedValue([mockExercise]);
    const exercises = await exerciseServices.searchExercisesBySecondaryMuscle(
      secondaryMuscle,
      0,
      1
    );
    expect(exercises.length).toBe(1);
    expect(exercises[0]).toBe(mockExercisesArray[0]);
    expect(exerciseData.searchExercisesBySecondaryMuscle).toHaveBeenCalledWith(
      secondaryMuscle,
      0,
      1
    );
  });

  it("searchExercisesBySecondaryMuscle skips the number of exercises requested", async () => {
    const secondaryMuscle = "testSecondaryMuscle1";
    exerciseData.searchExercisesBySecondaryMuscle = jest
      .fn()
      .mockResolvedValue([mockExercise2]);
    const exercises = await exerciseServices.searchExercisesBySecondaryMuscle(
      secondaryMuscle,
      2,
      1
    );
    expect(exercises[0]).toBe(mockExercise2);
    expect(exerciseData.searchExercisesBySecondaryMuscle).toHaveBeenCalledWith(
      secondaryMuscle,
      2,
      1
    );
  });
});

describe("GetUserWorkoutPlans function tests", () => {
  it("getUserWorkoutPlans returns the user's workout plans successfully", async () => {
    const token = "testToken";
    exerciseData.getUserWorkoutPlans = jest
      .fn()
      .mockResolvedValue(mockWorkoutPlan);
    const workoutPlans = await exerciseServices.getUserWorkoutPlans(token);
    expect(workoutPlans).toBe(mockWorkoutPlan);
    expect(exerciseData.getUserWorkoutPlans).toHaveBeenCalledWith(token);
  });

  it("getUserWorkoutPlans throws InvalidAuthorizationError when the user's token does not exist", async () => {
    const token = "testToken";
    exerciseData.getUserWorkoutPlans = jest.fn().mockResolvedValue(null);
    exerciseServices
      .getUserWorkoutPlans(token)
      .catch((error: Error) =>
        expect(error).toBe(InvalidAuthorizationTokenError)
      );
    expect(exerciseData.getUserWorkoutPlans).toHaveBeenCalledWith(token);
  });
});

describe("CreateWorkoutPlan function tests", () => {
  it("createWorkoutPlan creates the workout plan successfully", async () => {
    const token = "testToken";
    const workoutPlanName = "testWorkoutPlanName";
    const description = "testDescription";
    exerciseData.createWorkoutPlan = jest
      .fn()
      .mockResolvedValue(mockWorkoutPlan);
    const workoutPlan = await exerciseServices.createWorkoutPlan(
      token,
      workoutPlanName,
      description
    );
    expect(workoutPlan).toBe(mockWorkoutPlan);
    expect(exerciseData.createWorkoutPlan).toHaveBeenCalledWith(
      token,
      workoutPlanName,
      description
    );
  });

  it("createWorkoutPlan throws InvalidAuthorizationError when the user's token does not exist", async () => {
    const token = "testToken";
    const workoutPlanName = "testWorkoutPlanName";
    const description = "testDescription";
    exerciseData.createWorkoutPlan = jest.fn().mockResolvedValue(null);
    exerciseServices
      .createWorkoutPlan(token, workoutPlanName, description)
      .catch((error: Error) =>
        expect(error).toBe(InvalidAuthorizationTokenError)
      );
    expect(exerciseData.createWorkoutPlan).toHaveBeenCalledWith(
      token,
      workoutPlanName,
      description
    );
  });

  it("createWorkoutPlan throws AlreadyExistsError when the workout plan already exists", async () => {
    const token = "testToken";
    const workoutPlanName = "testWorkoutPlanName";
    const description = "testDescription";
    exerciseData.createWorkoutPlan = jest
      .fn()
      .mockResolvedValue(ERROR_WORKOUTPLAN);
    exerciseServices
      .createWorkoutPlan(token, workoutPlanName, description)
      .catch((error: Error) => expect(error).toBe(AlreadyExistsError));
    expect(exerciseData.createWorkoutPlan).toHaveBeenCalledWith(
      token,
      workoutPlanName,
      description
    );
  });
});

describe("AddExerciseToWorkoutPlan function tests", () => {
  it("addExerciseToWorkoutPlan adds the exercise to the workout plan successfully", async () => {
    const token = "testToken";
    const workoutPlanName = "testWorkoutPlanName";
    const exerciseId = "testExerciseId";
    exerciseData.addExerciseToWorkoutPlan = jest
      .fn()
      .mockResolvedValue(mockWorkoutPlan);
    const workoutPlan = await exerciseServices.addExerciseToWorkoutPlan(
      token,
      workoutPlanName,
      exerciseId
    );
    expect(workoutPlan).toBe(mockWorkoutPlan);
    expect(exerciseData.addExerciseToWorkoutPlan).toHaveBeenCalledWith(
      token,
      workoutPlanName,
      exerciseId
    );
  });

  it("addExerciseToWorkoutPlan throws InvalidAuthorizationError when the user's token does not exist", async () => {
    const token = "testToken";
    const workoutPlanName = "testWorkoutPlanName";
    const exerciseId = "testExerciseId";
    exerciseData.addExerciseToWorkoutPlan = jest.fn().mockResolvedValue(null);
    exerciseServices
      .addExerciseToWorkoutPlan(token, workoutPlanName, exerciseId)
      .catch((error: Error) =>
        expect(error).toBe(InvalidAuthorizationTokenError)
      );
    expect(exerciseData.addExerciseToWorkoutPlan).toHaveBeenCalledWith(
      token,
      workoutPlanName,
      exerciseId
    );
  });

  it("addExerciseToWorkoutPlan throws AlreadyExistsError when the exercise already exists in the workout plan", async () => {
    const token = "testToken";
    const workoutPlanName = "testWorkoutPlanName";
    const exerciseId = "testExerciseId";
    exerciseData.addExerciseToWorkoutPlan = jest
      .fn()
      .mockResolvedValue(ERROR_WORKOUTPLAN);
    exerciseServices
      .addExerciseToWorkoutPlan(token, workoutPlanName, exerciseId)
      .catch((error: Error) => expect(error).toBe(AlreadyExistsError));
    expect(exerciseData.addExerciseToWorkoutPlan).toHaveBeenCalledWith(
      token,
      workoutPlanName,
      exerciseId
    );
  });
});

describe("RemoveExerciseFromWorkoutPlan function tests", () => {
  it("removeExerciseFromWorkoutPlan deletes the exercise from the workout plan successfully", async () => {
    const token = "testToken";
    const workoutPlanName = "testWorkoutPlanName";
    const exerciseId = "testExerciseId";
    exerciseData.removeExerciseFromWorkoutPlan = jest
      .fn()
      .mockResolvedValue(mockWorkoutPlan);
    const workoutPlan = await exerciseServices.removeExerciseFromWorkoutPlan(
      token,
      workoutPlanName,
      exerciseId
    );
    expect(workoutPlan).toBe(mockWorkoutPlan);
    expect(exerciseData.removeExerciseFromWorkoutPlan).toHaveBeenCalledWith(
      token,
      workoutPlanName,
      exerciseId
    );
  });

  it("removeExerciseFromWorkoutPlan throws InvalidAuthorizationError when the user's token does not exist", async () => {
    const token = "testToken";
    const workoutPlanName = "testWorkoutPlanName";
    const exerciseId = "testExerciseId";
    exerciseData.removeExerciseFromWorkoutPlan = jest
      .fn()
      .mockResolvedValue(null);
    exerciseServices
      .removeExerciseFromWorkoutPlan(token, workoutPlanName, exerciseId)
      .catch((error: Error) =>
        expect(error).toBe(InvalidAuthorizationTokenError)
      );
    expect(exerciseData.removeExerciseFromWorkoutPlan).toHaveBeenCalledWith(
      token,
      workoutPlanName,
      exerciseId
    );
  });

  it("removeExerciseFromWorkoutPlan throws NotFoundError when the exercise does not exist in the workout plan", async () => {
    const token = "testToken";
    const workoutPlanName = "testWorkoutPlanName";
    const exerciseId = "testExerciseId";
    exerciseData.removeExerciseFromWorkoutPlan = jest
      .fn()
      .mockResolvedValue(ERROR_WORKOUTPLAN);
    exerciseServices
      .removeExerciseFromWorkoutPlan(token, workoutPlanName, exerciseId)
      .catch((error: Error) => expect(error).toBe(NotFoundError));
    expect(exerciseData.removeExerciseFromWorkoutPlan).toHaveBeenCalledWith(
      token,
      workoutPlanName,
      exerciseId
    );
  });
});
