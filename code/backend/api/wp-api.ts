import { Request, Response } from "express";
import { WpService } from "../services/wp-service";

export class WpApi {
  private service: WpService;

  constructor(service: WpService) {
    this.service = service;
    this.getExerciseById = this.getExerciseById.bind(this);
  }

  async getExerciseById(req: Request, res: Response) {
    const exercise = await this.service.getExerciseById(req.params.exerciseId)
    return res.json({response: exercise});
  }
}
