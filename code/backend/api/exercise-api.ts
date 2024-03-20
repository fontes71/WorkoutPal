import { Request, Response } from "express";
import { Exercise } from "../domain/types";
import { IExerciseApi, IExerciseData, IExerciseServices } from "../domain/interfaces";
import { apiErrorHandler } from "../utils/functions/api";

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
      res.json(exercise);
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
      res.json(exercises);
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
      res.json(exercises);
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
      res.json(exercises);
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
      res.json(exercises);
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
      res.json(exercises);
    });
  }

  cloneExerciseDB = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      this.data.cloneExerciseDB();
      res.sendStatus(200)
    });
  }
}