import { ExerciseData } from "../../data/exercise-data.ts";
import { ExerciseServices } from "../../services/exercise-services.ts";
import { ExerciseApi } from "../../api/exercise-api.ts";
import { mockAddExerciseToWorkoutPlanRequest, mockCreateWorkoutPlanRequest, mockExercise, mockGetDailyLoggedWorkoutPlansRequest, mockGetExercisesFromWorkoutPlanRequest, mockGetUserWorkoutPlansRequest, mockLogWorkoutPlanRequest, mockRemoveExerciseFromWorkoutPlanRequest, mockRemoveWorkoutPlanRequest, mockResponseAddExerciseToWorkoutPlanBody, mockResponseCreateWorkoutPlanBody, mockResponseEmptySearchBody, mockResponseGetDailyLoggedWorkoutPlansBody, mockResponseGetExercisesFromWorkoutPlanBody, mockResponseGetUserWorkoutPlansBody, mockResponseLogWorkoutPlanBody, mockResponseRemoveExerciseFromWorkoutPlanBody, mockResponseRemoveWorkoutPlanBody, mockResponseSearchBody, mockResponseSearchByIdBody, mockSearchByBodyPartRequest, mockSearchByEquipmentRequest, mockSearchByIdRequest, mockSearchByNameAndFiltersRequest, mockSearchByNameRequest, mockSearchBySecondaryMuscleRequest, mockSearchByTargetRequest, mockWorkoutPlan } from "./mockData/exercise.ts";
import { AlreadyExistsError, InvalidAuthorizationTokenError, InvalidParamsError, NotFoundError } from "../../errors/app_errors.ts";

const exerciseData = new ExerciseData()
let exerciseServices: ExerciseServices;
let exerciseApi: ExerciseApi;

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
}

beforeEach(() => {
  exerciseServices = new ExerciseServices(exerciseData)
  exerciseApi = new ExerciseApi(exerciseServices, exerciseData)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe("Endpoint: /api/exercise/:exerciseId", () => {
  it("GET -> Returns the Exercise successfully", async () => {
    exerciseServices.getExerciseById = jest.fn().mockResolvedValue(mockExercise);

    await exerciseApi.getExerciseById(mockSearchByIdRequest as any, mockResponse as any);

    expect(exerciseServices.getExerciseById).toHaveBeenCalledWith(mockSearchByIdRequest.params.exerciseId);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseSearchByIdBody);
  });

  it("GET -> Returns NotFoundError", async () => {
    exerciseServices.getExerciseById = jest.fn().mockRejectedValue(NotFoundError);

    await exerciseApi.getExerciseById(mockSearchByIdRequest as any, mockResponse as any);

    expect(exerciseServices.getExerciseById).toHaveBeenCalledWith(mockSearchByIdRequest.params.exerciseId);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});

describe("Endpoint: /api/exercises/name/:exerciseName", () => {
  it("GET -> Returns the Exercises successfully", async () => {
    exerciseServices.searchExercisesByName = jest.fn().mockResolvedValue([mockExercise]);

    await exerciseApi.searchExercisesByName(mockSearchByNameRequest as any, mockResponse as any);

    expect(exerciseServices.searchExercisesByName).toHaveBeenCalledWith(
      mockSearchByNameRequest.params.exerciseName, 
      mockSearchByNameRequest.query.skip,
      mockSearchByNameRequest.query.limit
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseSearchBody);
  });

  it("GET -> Returns no Exercises successfully", async () => {
    exerciseServices.searchExercisesByName = jest.fn().mockResolvedValue([]);

    await exerciseApi.searchExercisesByName(mockSearchByNameRequest as any, mockResponse as any);

    expect(exerciseServices.searchExercisesByName).toHaveBeenCalledWith(
      mockSearchByNameRequest.params.exerciseName, 
      mockSearchByNameRequest.query.skip, 
      mockSearchByNameRequest.query.limit
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseEmptySearchBody);
  });
});

describe("Endpoint: /api/exercises/bodyPart/:exerciseBodyPart", () => {
  it("GET -> Returns the Exercises successfully", async () => {
    exerciseServices.searchExercisesByBodyPart = jest.fn().mockResolvedValue([mockExercise]);

    await exerciseApi.searchExercisesByBodyPart(mockSearchByBodyPartRequest as any, mockResponse as any);

    expect(exerciseServices.searchExercisesByBodyPart).toHaveBeenCalledWith(
      mockSearchByBodyPartRequest.params.exerciseBodyPart, 
      mockSearchByBodyPartRequest.query.skip, 
      mockSearchByBodyPartRequest.query.limit
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseSearchBody);
  });

  it("GET -> Returns no Exercises successfully", async () => {
    exerciseServices.searchExercisesByBodyPart = jest.fn().mockResolvedValue([]);

    await exerciseApi.searchExercisesByBodyPart(mockSearchByBodyPartRequest as any, mockResponse as any);

    expect(exerciseServices.searchExercisesByBodyPart).toHaveBeenCalledWith(
      mockSearchByBodyPartRequest.params.exerciseBodyPart, 
      mockSearchByBodyPartRequest.query.skip, 
      mockSearchByBodyPartRequest.query.limit
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseEmptySearchBody);
  });
});

describe("Endpoint: /api/exercises/equipment/:exerciseEquipment", () => {
  it("GET -> Returns the Exercises successfully", async () => {
    exerciseServices.searchExercisesByEquipment = jest.fn().mockResolvedValue([mockExercise]);

    await exerciseApi.searchExercisesByEquipment(mockSearchByEquipmentRequest as any, mockResponse as any);

    expect(exerciseServices.searchExercisesByEquipment).toHaveBeenCalledWith(
      mockSearchByEquipmentRequest.params.exerciseEquipment, 
      mockSearchByEquipmentRequest.query.skip, 
      mockSearchByEquipmentRequest.query.limit
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseSearchBody);
  });

  it("GET -> Returns no Exercises successfully", async () => {
    exerciseServices.searchExercisesByEquipment = jest.fn().mockResolvedValue([]);

    await exerciseApi.searchExercisesByEquipment(mockSearchByEquipmentRequest as any, mockResponse as any);

    expect(exerciseServices.searchExercisesByEquipment).toHaveBeenCalledWith(
      mockSearchByEquipmentRequest.params.exerciseEquipment, 
      mockSearchByEquipmentRequest.query.skip, 
      mockSearchByEquipmentRequest.query.limit
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseEmptySearchBody);
  });
});

describe("Endpoint: /api/exercises/target/:exerciseTarget", () => {
  it("GET -> Returns the Exercises successfully", async () => {
    exerciseServices.searchExercisesByTarget = jest.fn().mockResolvedValue([mockExercise]);

    await exerciseApi.searchExercisesByTarget(mockSearchByTargetRequest as any, mockResponse as any);

    expect(exerciseServices.searchExercisesByTarget).toHaveBeenCalledWith(
      mockSearchByTargetRequest.params.exerciseTarget, 
      mockSearchByTargetRequest.query.skip, 
      mockSearchByTargetRequest.query.limit
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseSearchBody);
  });

  it("GET -> Returns no Exercises successfully", async () => {
    exerciseServices.searchExercisesByTarget = jest.fn().mockResolvedValue([]);

    await exerciseApi.searchExercisesByTarget(mockSearchByTargetRequest as any, mockResponse as any);

    expect(exerciseServices.searchExercisesByTarget).toHaveBeenCalledWith(
      mockSearchByTargetRequest.params.exerciseTarget, 
      mockSearchByTargetRequest.query.skip, 
      mockSearchByTargetRequest.query.limit
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseEmptySearchBody);
  });
});

describe("Endpoint: /api/exercises/secondaryMuscle/:exerciseSecondaryMuscle", () => {
  it("GET -> Returns the Exercises successfully", async () => {
    exerciseServices.searchExercisesBySecondaryMuscle = jest.fn().mockResolvedValue([mockExercise]);

    await exerciseApi.searchExercisesBySecondaryMuscle(mockSearchBySecondaryMuscleRequest as any, mockResponse as any);

    expect(exerciseServices.searchExercisesBySecondaryMuscle).toHaveBeenCalledWith(
      mockSearchBySecondaryMuscleRequest.params.exerciseSecondaryMuscle, 
      mockSearchBySecondaryMuscleRequest.query.skip, 
      mockSearchBySecondaryMuscleRequest.query.limit
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseSearchBody);
  });

  it("GET -> Returns no Exercises successfully", async () => {
    exerciseServices.searchExercisesBySecondaryMuscle = jest.fn().mockResolvedValue([]);

    await exerciseApi.searchExercisesBySecondaryMuscle(mockSearchBySecondaryMuscleRequest as any, mockResponse as any);

    expect(exerciseServices.searchExercisesBySecondaryMuscle).toHaveBeenCalledWith(
      mockSearchBySecondaryMuscleRequest.params.exerciseSecondaryMuscle, 
      mockSearchBySecondaryMuscleRequest.query.skip, 
      mockSearchBySecondaryMuscleRequest.query.limit
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseEmptySearchBody);
  });
});

describe("Endpoint: /api/exercises/name/:exerciseName/filters", () => {
  it("GET -> Returns the Exercises successfully", async () => {
    exerciseServices.searchExercisesByNameAndFilters = jest.fn().mockResolvedValue([mockExercise]);

    await exerciseApi.searchExercisesByNameAndFilters(mockSearchByNameAndFiltersRequest as any, mockResponse as any);

    expect(exerciseServices.searchExercisesByNameAndFilters).toHaveBeenCalledWith(
      mockSearchByNameAndFiltersRequest.params.exerciseName, 
      mockSearchByNameAndFiltersRequest.query.bodyPart, 
      mockSearchByNameAndFiltersRequest.query.equipment, 
      mockSearchByNameAndFiltersRequest.query.target, 
      mockSearchByNameAndFiltersRequest.query.skip, 
      mockSearchByNameAndFiltersRequest.query.limit
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseSearchBody);
  });

  it("GET -> Returns no Exercises successfully", async () => {
    exerciseServices.searchExercisesByNameAndFilters = jest.fn().mockResolvedValue([]);

    await exerciseApi.searchExercisesByNameAndFilters(mockSearchByNameAndFiltersRequest as any, mockResponse as any);

    expect(exerciseServices.searchExercisesByNameAndFilters).toHaveBeenCalledWith(
      mockSearchByNameAndFiltersRequest.params.exerciseName, 
      mockSearchByNameAndFiltersRequest.query.bodyPart, 
      mockSearchByNameAndFiltersRequest.query.equipment, 
      mockSearchByNameAndFiltersRequest.query.target, 
      mockSearchByNameAndFiltersRequest.query.skip, 
      mockSearchByNameAndFiltersRequest.query.limit
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseEmptySearchBody);
  });
});

describe("Endpoint: /api/exercises/workoutPlans", () => {
  it("GET -> Returns the WorkoutPlans successfully", async () => {
    exerciseServices.getUserWorkoutPlans = jest.fn().mockResolvedValue([mockWorkoutPlan]);

    await exerciseApi.getUserWorkoutPlans(mockGetUserWorkoutPlansRequest as any, mockResponse as any);

    expect(exerciseServices.getUserWorkoutPlans).toHaveBeenCalledWith(mockGetUserWorkoutPlansRequest.headers.authorization);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseGetUserWorkoutPlansBody);
  });

  it("GET -> Return InvalidAuthorizationTokenError", async () => {
    exerciseServices.getUserWorkoutPlans = jest.fn().mockRejectedValue(InvalidAuthorizationTokenError);

    await exerciseApi.getUserWorkoutPlans(mockGetUserWorkoutPlansRequest as any, mockResponse as any);

    expect(exerciseServices.getUserWorkoutPlans).toHaveBeenCalledWith(mockGetUserWorkoutPlansRequest.headers.authorization);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it("POST -> Creates a new WorkoutPlan successfully", async () => {
    exerciseServices.createWorkoutPlan = jest.fn().mockResolvedValue(mockWorkoutPlan);

    await exerciseApi.createWorkoutPlan(mockCreateWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.createWorkoutPlan).toHaveBeenCalledWith(
      mockCreateWorkoutPlanRequest.headers.authorization, 
      mockCreateWorkoutPlanRequest.body.workoutPlanName, 
      mockCreateWorkoutPlanRequest.body.description
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseCreateWorkoutPlanBody);
  });

  it("POST -> Returns InvalidAuthorizationTokenError", async () => {
    exerciseServices.createWorkoutPlan = jest.fn().mockRejectedValue(InvalidAuthorizationTokenError);

    await exerciseApi.createWorkoutPlan(mockCreateWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.createWorkoutPlan).toHaveBeenCalledWith(
      mockCreateWorkoutPlanRequest.headers.authorization, 
      mockCreateWorkoutPlanRequest.body.workoutPlanName, 
      mockCreateWorkoutPlanRequest.body.description
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it("POST -> Returns AlreadyExistsError", async () => {
    exerciseServices.createWorkoutPlan = jest.fn().mockRejectedValue(AlreadyExistsError);

    await exerciseApi.createWorkoutPlan(mockCreateWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.createWorkoutPlan).toHaveBeenCalledWith(
      mockCreateWorkoutPlanRequest.headers.authorization, 
      mockCreateWorkoutPlanRequest.body.workoutPlanName, 
      mockCreateWorkoutPlanRequest.body.description
    );
    expect(mockResponse.status).toHaveBeenCalledWith(409);
  });

  it("POST -> Returns InvalidParamsError", async () => {
    exerciseServices.createWorkoutPlan = jest.fn().mockRejectedValue(InvalidParamsError);

    await exerciseApi.createWorkoutPlan(mockCreateWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.createWorkoutPlan).not.toHaveBeenCalledWith();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
});

describe("Endpoint: /api/exercises/workoutPlans/:workoutPlanName", () => {
  it("DELETE -> Removes a WorkoutPlan successfully", async () => {
    exerciseServices.removeWorkoutPlan = jest.fn().mockResolvedValue(mockWorkoutPlan);

    await exerciseApi.removeWorkoutPlan(mockRemoveWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.removeWorkoutPlan).toHaveBeenCalledWith(
      mockRemoveWorkoutPlanRequest.headers.authorization, 
      mockRemoveWorkoutPlanRequest.params.workoutPlanName
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseRemoveWorkoutPlanBody);
  });

  it("DELETE -> Returns InvalidAuthorizationTokenError", async () => {
    exerciseServices.removeWorkoutPlan = jest.fn().mockRejectedValue(InvalidAuthorizationTokenError);

    await exerciseApi.removeWorkoutPlan(mockRemoveWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.removeWorkoutPlan).toHaveBeenCalledWith(
      mockRemoveWorkoutPlanRequest.headers.authorization, 
      mockRemoveWorkoutPlanRequest.params.workoutPlanName
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it("DELETE -> Returns NotFoundError", async () => {
    exerciseServices.removeWorkoutPlan = jest.fn().mockRejectedValue(NotFoundError);

    await exerciseApi.removeWorkoutPlan(mockRemoveWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.removeWorkoutPlan).toHaveBeenCalledWith(
      mockRemoveWorkoutPlanRequest.headers.authorization, 
      mockRemoveWorkoutPlanRequest.params.workoutPlanName
    );
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it("POST -> Adds an Exercise to a WorkoutPlan successfully", async () => {
    exerciseServices.addExerciseToWorkoutPlan = jest.fn().mockResolvedValue(mockWorkoutPlan);

    await exerciseApi.addExerciseToWorkoutPlan(mockAddExerciseToWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.addExerciseToWorkoutPlan).toHaveBeenCalledWith(
      mockAddExerciseToWorkoutPlanRequest.headers.authorization, 
      mockAddExerciseToWorkoutPlanRequest.params.workoutPlanName, 
      mockAddExerciseToWorkoutPlanRequest.body.exerciseId
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseAddExerciseToWorkoutPlanBody);
  });

  it("POST -> Returns InvalidAuthorizationTokenError", async () => {
    exerciseServices.addExerciseToWorkoutPlan = jest.fn().mockRejectedValue(InvalidAuthorizationTokenError);

    await exerciseApi.addExerciseToWorkoutPlan(mockAddExerciseToWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.addExerciseToWorkoutPlan).toHaveBeenCalledWith(
      mockAddExerciseToWorkoutPlanRequest.headers.authorization, 
      mockAddExerciseToWorkoutPlanRequest.params.workoutPlanName, 
      mockAddExerciseToWorkoutPlanRequest.body.exerciseId
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it("POST -> Returns AlreadyExistsError", async () => {
    exerciseServices.addExerciseToWorkoutPlan = jest.fn().mockRejectedValue(AlreadyExistsError);

    await exerciseApi.addExerciseToWorkoutPlan(mockAddExerciseToWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.addExerciseToWorkoutPlan).toHaveBeenCalledWith(
      mockAddExerciseToWorkoutPlanRequest.headers.authorization, 
      mockAddExerciseToWorkoutPlanRequest.params.workoutPlanName, 
      mockAddExerciseToWorkoutPlanRequest.body.exerciseId
    );
    expect(mockResponse.status).toHaveBeenCalledWith(409);
  });
});

describe("Endpoint: /api/exercises/workoutPlans/:workoutPlanName/exercise/:exerciseId", () => {
  it("DELETE -> Removes an Exercise from a WorkoutPlan successfully", async () => {
    exerciseServices.removeExerciseFromWorkoutPlan = jest.fn().mockResolvedValue(mockWorkoutPlan);

    await exerciseApi.removeExerciseFromWorkoutPlan(mockRemoveExerciseFromWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.removeExerciseFromWorkoutPlan).toHaveBeenCalledWith(
      mockRemoveExerciseFromWorkoutPlanRequest.headers.authorization, 
      mockRemoveExerciseFromWorkoutPlanRequest.params.workoutPlanName, 
      mockRemoveExerciseFromWorkoutPlanRequest.params.exerciseId
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseRemoveExerciseFromWorkoutPlanBody);
  });

  it("DELETE -> Returns InvalidAuthorizationTokenError", async () => {
    exerciseServices.removeExerciseFromWorkoutPlan = jest.fn().mockRejectedValue(InvalidAuthorizationTokenError);

    await exerciseApi.removeExerciseFromWorkoutPlan(mockRemoveExerciseFromWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.removeExerciseFromWorkoutPlan).toHaveBeenCalledWith(
      mockRemoveExerciseFromWorkoutPlanRequest.headers.authorization, 
      mockRemoveExerciseFromWorkoutPlanRequest.params.workoutPlanName, 
      mockRemoveExerciseFromWorkoutPlanRequest.params.exerciseId
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it("DELETE -> Returns NotFoundError", async () => {
    exerciseServices.removeExerciseFromWorkoutPlan = jest.fn().mockRejectedValue(NotFoundError);

    await exerciseApi.removeExerciseFromWorkoutPlan(mockRemoveExerciseFromWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.removeExerciseFromWorkoutPlan).toHaveBeenCalledWith(
      mockRemoveExerciseFromWorkoutPlanRequest.headers.authorization, 
      mockRemoveExerciseFromWorkoutPlanRequest.params.workoutPlanName, 
      mockRemoveExerciseFromWorkoutPlanRequest.params.exerciseId
    );
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});

describe("Endpoint: /api/exercises/workoutPlans/log", () => {
  it("POST -> Logs a WorkoutPlan successfully", async () => {
    exerciseServices.logWorkoutPlan = jest.fn().mockResolvedValue(mockWorkoutPlan);

    await exerciseApi.logWorkoutPlan(mockLogWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.logWorkoutPlan).toHaveBeenCalledWith(
      mockLogWorkoutPlanRequest.headers.authorization, 
      mockLogWorkoutPlanRequest.body.workoutPlanName
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseLogWorkoutPlanBody);
  });

  it("POST -> Returns InvalidAuthorizationTokenError", async () => {
    exerciseServices.logWorkoutPlan = jest.fn().mockRejectedValue(InvalidAuthorizationTokenError);

    await exerciseApi.logWorkoutPlan(mockLogWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.logWorkoutPlan).toHaveBeenCalledWith(
      mockLogWorkoutPlanRequest.headers.authorization, 
      mockLogWorkoutPlanRequest.body.workoutPlanName
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it("POST -> Returns NotFoundError", async () => {
    exerciseServices.logWorkoutPlan = jest.fn().mockRejectedValue(NotFoundError);

    await exerciseApi.logWorkoutPlan(mockLogWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.logWorkoutPlan).toHaveBeenCalledWith(
      mockLogWorkoutPlanRequest.headers.authorization, 
      mockLogWorkoutPlanRequest.body.workoutPlanName
    );
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});

describe("Endpoint: /api/exercises/workoutPlans/log/:day", () => {
  it("GET -> Returns the Daily Logged WorkoutPlans successfully", async () => {
    exerciseServices.getDailyLoggedWorkoutPlans = jest.fn().mockResolvedValue([mockWorkoutPlan]);

    await exerciseApi.getDailyLoggedWorkoutPlans(mockGetDailyLoggedWorkoutPlansRequest as any, mockResponse as any);

    expect(exerciseServices.getDailyLoggedWorkoutPlans).toHaveBeenCalledWith(
      mockGetDailyLoggedWorkoutPlansRequest.headers.authorization, 
      mockGetDailyLoggedWorkoutPlansRequest.params.day
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseGetDailyLoggedWorkoutPlansBody);
  });

  it("GET -> Returns InvalidAuthorizationTokenError", async () => {
    exerciseServices.getDailyLoggedWorkoutPlans = jest.fn().mockRejectedValue(InvalidAuthorizationTokenError);

    await exerciseApi.getDailyLoggedWorkoutPlans(mockGetDailyLoggedWorkoutPlansRequest as any, mockResponse as any);

    expect(exerciseServices.getDailyLoggedWorkoutPlans).toHaveBeenCalledWith(
      mockGetDailyLoggedWorkoutPlansRequest.headers.authorization, 
      mockGetDailyLoggedWorkoutPlansRequest.params.day
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it("GET -> Returns InvalidParamsError", async () => {
    exerciseServices.getDailyLoggedWorkoutPlans = jest.fn().mockRejectedValue(InvalidParamsError);

    await exerciseApi.getDailyLoggedWorkoutPlans(mockGetDailyLoggedWorkoutPlansRequest as any, mockResponse as any);

    expect(exerciseServices.getDailyLoggedWorkoutPlans).not.toHaveBeenCalledWith();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
});

describe("/api/exercises/workoutPlans/:workoutPlanName", () => {
  it("GET -> Returns the Exercises from a WorkoutPlan successfully", async () => {
    exerciseServices.getExercisesFromWorkoutPlan = jest.fn().mockResolvedValue([mockExercise]);

    await exerciseApi.getExercisesFromWorkoutPlan(mockGetExercisesFromWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.getExercisesFromWorkoutPlan).toHaveBeenCalledWith(
      mockGetExercisesFromWorkoutPlanRequest.headers.authorization, 
      mockGetExercisesFromWorkoutPlanRequest.params.workoutPlanName
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockResponseGetExercisesFromWorkoutPlanBody);
  });

  it("GET -> Returns InvalidAuthorizationTokenError", async () => {
    exerciseServices.getExercisesFromWorkoutPlan = jest.fn().mockRejectedValue(InvalidAuthorizationTokenError);

    await exerciseApi.getExercisesFromWorkoutPlan(mockGetExercisesFromWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.getExercisesFromWorkoutPlan).toHaveBeenCalledWith(
      mockGetExercisesFromWorkoutPlanRequest.headers.authorization, 
      mockGetExercisesFromWorkoutPlanRequest.params.workoutPlanName
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it("GET -> Returns NotFoundError", async () => {
    exerciseServices.getExercisesFromWorkoutPlan = jest.fn().mockRejectedValue(NotFoundError);

    await exerciseApi.getExercisesFromWorkoutPlan(mockGetExercisesFromWorkoutPlanRequest as any, mockResponse as any);

    expect(exerciseServices.getExercisesFromWorkoutPlan).toHaveBeenCalledWith(
      mockGetExercisesFromWorkoutPlanRequest.headers.authorization, 
      mockGetExercisesFromWorkoutPlanRequest.params.workoutPlanName
    );
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});