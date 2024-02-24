import { Request, Response } from "express";
import { WpService } from "../services/wp-service";
import { Exercise } from "../domain/types";
import { apiErrorHandler } from "./api-utils";

export class WpApi {
  private service: WpService;

  constructor(service: WpService) {
    this.service = service;
    this.getExerciseById = this.getExerciseById.bind(this);
  }

  getExerciseById(req: Request, res: Response) {
    apiErrorHandler(res, async () => {
      const exercise: Exercise = await this.service.getExerciseById(req.params.exerciseId);
      res.json(exercise);
    })
  }
}
