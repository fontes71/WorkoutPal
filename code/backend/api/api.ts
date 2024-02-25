import { Request, Response } from "express";
import { Services } from "../services/services";
import { Exercise } from "../domain/types";
import { apiErrorHandler } from "./api-utils";

export class Api {
  private service: Services;

  constructor(service: Services) {
    this.service = service;
    this.getExerciseById = this.getExerciseById.bind(this);
  }

  getExerciseById(req: Request, res: Response) {
    console.log("API")
    apiErrorHandler(res, async () => {
      const exercise: Exercise = await this.service.getExerciseById(
        req.params.exerciseId
      );
      res.json(exercise);
    });
  }
}
