import { Request, Response } from "express";
import { WpService } from "../services/wp-service";

export class WpApi {
  private service: WpService;

  constructor(service: WpService) {
    this.service = service;
    this.getExerciseById = this.getExerciseById.bind(this);
  }

  getExerciseById(req: Request, res: Response) {
    return this.service.getExerciseById(parseInt(req.params.exerciseId));
  }
}
