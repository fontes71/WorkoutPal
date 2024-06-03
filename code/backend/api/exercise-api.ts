import { Request, Response } from "express";
import { Exercise } from "../domain/types";
import { IExerciseApi, IExerciseData, IExerciseServices } from "../domain/interfaces";
import { apiErrorHandler } from "../utils/functions/api";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class ExerciseApi implements IExerciseApi {
  private service: IExerciseServices;
  private data: IExerciseData;

  constructor(service: IExerciseServices, data: IExerciseData) {
    this.service = service;
    this.data = data;
  }

  getExerciseById = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      const exercise: Exercise = await this.service.getExerciseById(
        req.params.exerciseId
      );
      res.status(200).json(exercise);
    });
  }

  searchExercisesByName = (req: Request, res: Response) => {
    const skip = !req.query.skip ? '0' : req.query.skip as string;
    const limit = !req.query.limit ? '10': req.query.limit as string;
    apiErrorHandler(res, async () => {
      const exercises: Array<Exercise> = await this.service.searchExercisesByName(
        req.params.exerciseName,
        parseInt(skip),
        parseInt(limit)
      );
      res.status(200).json(exercises);
    });
  }

  searchExercisesByBodyPart = (req: Request, res: Response) => {
    const skip = !req.query.skip ? '0' : req.query.skip as string;
    const limit = !req.query.limit ? '10': req.query.limit as string;
    apiErrorHandler(res, async () => {
      const exercises: Array<Exercise> = await this.service.searchExercisesByBodyPart(
        req.params.exerciseBodyPart,
        parseInt(skip),
        parseInt(limit)
      );
      res.status(200).json(exercises);
    });
  }

  searchExercisesByEquipment = (req: Request, res: Response) => {
    const skip = !req.query.skip ? '0' : req.query.skip as string;
    const limit = !req.query.limit ? '10': req.query.limit as string;
    apiErrorHandler(res, async () => {
      const exercises: Array<Exercise> = await this.service.searchExercisesByEquipment(
        req.params.exerciseEquipment,
        parseInt(skip),
        parseInt(limit)
      );
      res.status(200).json(exercises);
    });
  }

  searchExercisesByTarget = (req: Request, res: Response) => {
    const skip = !req.query.skip ? '0' : req.query.skip as string;
    const limit = !req.query.limit ? '10': req.query.limit as string;
    apiErrorHandler(res, async () => {
      const exercises: Array<Exercise> = await this.service.searchExercisesByTarget(
        req.params.exerciseTarget,
        parseInt(skip),
        parseInt(limit)
      );
      res.status(200).json(exercises);
    });
  }

  searchExercisesBySecondaryMuscle = (req: Request, res: Response) => {
    const skip = !req.query.skip ? '0' : req.query.skip as string;
    const limit = !req.query.limit ? '10': req.query.limit as string;
    apiErrorHandler(res, async () => {
      const exercises: Array<Exercise> = await this.service.searchExercisesBySecondaryMuscle(
        req.params.exerciseSecondaryMuscle,
        parseInt(skip),
        parseInt(limit)
      );
      res.status(200).json(exercises);
    });
  }

  getUserWorkoutPlans = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      const token = (req.headers.authorization as string).replace("Bearer ", "");
      const workoutPlans = await this.service.getUserWorkoutPlans(token);
      res.status(200).json(workoutPlans);
    });
  }

  createWorkoutPlan = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      const token = (req.headers.authorization as string).replace("Bearer ", "");
      const { workoutPlanName, description } = req.body;
      const workoutPlan = await this.service.createWorkoutPlan(token, workoutPlanName, description);
      res.status(201).json(workoutPlan);
    });
  }

  addExerciseToWorkoutPlan = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      const token = (req.headers.authorization as string).replace("Bearer ", "");
      const workoutPlanName = req.params.workoutPlanName;
      const { exerciseId } = req.body;
      const workoutPlan = await this.service.addExerciseToWorkoutPlan(token, workoutPlanName, exerciseId);
      res.status(200).json(workoutPlan);
    });
  }

  removeExerciseFromWorkoutPlan = (req: Request, res: Response): void => {
      apiErrorHandler(res, async () => {
        const token = (req.headers.authorization as string).replace("Bearer ", "");
        const workoutPlanName = req.params.workoutPlanName;
        const exerciseId = req.params.exerciseId;
        const workoutPlan = await this.service.removeExerciseFromWorkoutPlan(token, workoutPlanName, exerciseId);
        res.status(200).json(workoutPlan);
      });
  }

  logWorkoutPlan = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      const token = (req.headers.authorization as string).replace("Bearer ", "");
      const { workoutPlanName } = req.body;
      const workoutPlan = await this.service.logWorkoutPlan(token, workoutPlanName);
      res.status(200).json(workoutPlan);
    });
  }

  getDailyLoggedWorkoutPlans = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      const token = (req.headers.authorization as string).replace("Bearer ", "");
      const day = req.params.day;
      const workoutPlans = await this.service.getDailyLoggedWorkoutPlans(token, day);
      res.status(200).json(workoutPlans);
    });
  }

  cloneExerciseDB = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      this.data.cloneExerciseDB();
      res.sendStatus(200)
    });
  }
}
