import { Request, Response } from "express";
import { Services } from "../services/services";
import { Exercise } from "../domain/types";
import { apiErrorHandler } from "./api-utils";

export class Api {
  private service: Services;

  constructor(service: Services) {
    this.service = service;
    this.getExerciseById = this.getExerciseById.bind(this);
    this.searchExercisesByName = this.searchExercisesByName.bind(this);
    this.searchExercisesByBodyPart = this.searchExercisesByBodyPart.bind(this);
    this.searchExercisesByEquipment = this.searchExercisesByEquipment.bind(this);
    this.searchExercisesByTarget = this.searchExercisesByTarget.bind(this);
    this.searchExercisesBySecondaryMuscle = this.searchExercisesBySecondaryMuscle.bind(this)
    this.cloneExerciseDB = this.cloneExerciseDB.bind(this);
  }

  getExerciseById(req: Request, res: Response) {
    apiErrorHandler(res, async () => {
      const exercise: Exercise = await this.service.getExerciseById(
        req.params.exerciseId
      );
      res.json(exercise);
    });
  }

  searchExercisesByName(req: Request, res: Response) {
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

  searchExercisesByBodyPart(req: Request, res: Response) {
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

  searchExercisesByEquipment(req: Request, res: Response) {
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

  searchExercisesByTarget(req: Request, res: Response) {
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

  searchExercisesBySecondaryMuscle(req: Request, res: Response) {
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

  cloneExerciseDB(req: Request, res: Response) {
    apiErrorHandler(res, async () => {
      this.service.cloneExerciseDB();
      res.sendStatus(200)
    });
  }
}
