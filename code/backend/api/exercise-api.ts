import { Request, Response } from "express";
import { Exercise } from "../domain/types";
import { IExerciseApi, IExerciseData, IExerciseServices } from "../domain/interfaces";
import { apiErrorHandler, sendResponse } from "../utils/functions/api";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { StatusCode } from "../domain/api";
import { send } from "process";

export class ExerciseApi implements IExerciseApi {
  private service: IExerciseServices;
  private data: IExerciseData;

  constructor(service: IExerciseServices, data: IExerciseData) {
    this.service = service;
    this.data = data;
  }

  getExerciseById = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const exercise: Exercise = await this.service.getExerciseById(
        req.params.exerciseId
      );
      sendResponse(res, StatusCode.Success, "Exercise found", exercise);
    });
  }

  searchExercisesByName = async (req: Request, res: Response) => {
    const skip = !req.query.skip ? '0' : req.query.skip as string;
    const limit = !req.query.limit ? '10': req.query.limit as string;
    await apiErrorHandler(res, async () => {
      const exercises: Array<Exercise> = await this.service.searchExercisesByName(
        req.params.exerciseName,
        parseInt(skip),
        parseInt(limit)
      );
      sendResponse(res, StatusCode.Success, "Search successful", exercises);
    });
  }

  searchExercisesByBodyPart = async (req: Request, res: Response) => {
    const skip = !req.query.skip ? '0' : req.query.skip as string;
    const limit = !req.query.limit ? '10': req.query.limit as string;
    await apiErrorHandler(res, async () => {
      const exercises: Array<Exercise> = await this.service.searchExercisesByBodyPart(
        req.params.exerciseBodyPart,
        parseInt(skip),
        parseInt(limit)
      );
      sendResponse(res, StatusCode.Success, "Search successful", exercises);
    });
  }

  searchExercisesByEquipment = async (req: Request, res: Response) => {
    const skip = !req.query.skip ? '0' : req.query.skip as string;
    const limit = !req.query.limit ? '10': req.query.limit as string;
    await apiErrorHandler(res, async () => {
      const exercises: Array<Exercise> = await this.service.searchExercisesByEquipment(
        req.params.exerciseEquipment,
        parseInt(skip),
        parseInt(limit)
      );
      sendResponse(res, StatusCode.Success, "Search successful", exercises);
    });
  }

  searchExercisesByTarget = async (req: Request, res: Response) => {
    const skip = !req.query.skip ? '0' : req.query.skip as string;
    const limit = !req.query.limit ? '10': req.query.limit as string;
    await apiErrorHandler(res, async () => {
      const exercises: Array<Exercise> = await this.service.searchExercisesByTarget(
        req.params.exerciseTarget,
        parseInt(skip),
        parseInt(limit)
      );
      sendResponse(res, StatusCode.Success, "Search successful", exercises);
    });
  }

  searchExercisesBySecondaryMuscle = async (req: Request, res: Response) => {
    const skip = !req.query.skip ? '0' : req.query.skip as string;
    const limit = !req.query.limit ? '10': req.query.limit as string;
    await apiErrorHandler(res, async () => {
      const exercises: Array<Exercise> = await this.service.searchExercisesBySecondaryMuscle(
        req.params.exerciseSecondaryMuscle,
        parseInt(skip),
        parseInt(limit)
      );
      sendResponse(res, StatusCode.Success, "Search successful", exercises);
    });
  }

  getUserWorkoutPlans = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = (req.headers.authorization as string).replace("Bearer ", "");
      const workoutPlans = await this.service.getUserWorkoutPlans(token);
      sendResponse(res, StatusCode.Success, "Workout plans fetched successfully", workoutPlans);
    });
  }

  createWorkoutPlan = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = (req.headers.authorization as string).replace("Bearer ", "");
      const { workoutPlanName, description } = req.body;
      console.log("WORKOUT PLAN NAME: ", workoutPlanName)
      console.log("DESCRIPTION: ", description)
      const workoutPlan = await this.service.createWorkoutPlan(token, workoutPlanName, description);
      sendResponse(res, StatusCode.Created, "Workout plan created", workoutPlan);
    });
  }

  addExerciseToWorkoutPlan = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = (req.headers.authorization as string).replace("Bearer ", "");
      const workoutPlanName = req.params.workoutPlanName;
      const { exerciseId } = req.body;
      const workoutPlan = await this.service.addExerciseToWorkoutPlan(token, workoutPlanName, exerciseId);
      sendResponse(res, StatusCode.Success, "Exercise added to workout plan", workoutPlan);
    });
  }

  removeExerciseFromWorkoutPlan = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = (req.headers.authorization as string).replace("Bearer ", "");
      const workoutPlanName = req.params.workoutPlanName;
      const exerciseId = req.params.exerciseId;
      const workoutPlan = await this.service.removeExerciseFromWorkoutPlan(token, workoutPlanName, exerciseId);
      sendResponse(res, StatusCode.Success, "Exercise removed from workout plan", workoutPlan);
    });
  }

  logWorkoutPlan = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = (req.headers.authorization as string).replace("Bearer ", "");
      const { workoutPlanName } = req.body;
      const workoutPlan = await this.service.logWorkoutPlan(token, workoutPlanName);
      sendResponse(res, StatusCode.Success, "Workout plan logged", workoutPlan);
    });
  }

  getDailyLoggedWorkoutPlans = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = (req.headers.authorization as string).replace("Bearer ", "");
      const day = req.params.day;
      const workoutPlans = await this.service.getDailyLoggedWorkoutPlans(token, day);
      sendResponse(res, StatusCode.Success, "Daily logged workout plans fetched successfully", workoutPlans);
    });
  }

  getExercisesFromWorkoutPlan = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
      await apiErrorHandler(res, async () => {
        const token = (req.headers.authorization as string).replace("Bearer ", "");
        const workoutPlanName = req.params.workoutPlanName;
        const exercises = await this.service.getExercisesFromWorkoutPlan(token, workoutPlanName);
        sendResponse(res, StatusCode.Success, "Exercises fetched successfully", exercises);
      });
  }

  cloneExerciseDB = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      this.data.cloneExerciseDB();
      res.sendStatus(200)
    });
  }
}
