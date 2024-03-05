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
    this.cloneExerciseDB = this.cloneExerciseDB.bind(this);

    // need to be inside a class called AuthApi
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
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

  cloneExerciseDB(req: Request, res: Response) {
    apiErrorHandler(res, async () => {
      this.service.cloneExerciseDB();
      res.sendStatus(200)
    });
  }

  // need to be inside a class called AuthApi
  signup(req: Request, res: Response) {
    apiErrorHandler(res, async () => {
      const token = await this.service.signup(req.body.username, req.body.password, req.body.mail);
      res.status(201).json({'authentication_token': token});
    });
  }

  login(req: Request, res: Response) {
    res.json({'status': 'login'});
  }
}
