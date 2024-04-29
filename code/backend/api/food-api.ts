import { Request, Response } from "express";
import { Exercise, Food } from "../domain/types";
import { IFoodApi, IFoodData, IFoodServices } from "../domain/interfaces";
import { InvalidParamsError } from "../errors/app_errors";
import { apiErrorHandler } from "../utils/functions/api";

export class FoodApi implements IFoodApi {
  private service: IFoodServices;
  private data: IFoodData;

  constructor(service: IFoodServices, data: IFoodData) {
    this.service = service;
    this.data = data;
  }

  search = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
        const { query } = req.query

        if (!query || typeof query != "string")
            throw InvalidParamsError

      const food: Food[] = await this.service.search(query, 0, 0);
      res.json(food);
    });
  };

  consume = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      const token = "711a048a-9537-40c9-859f-8cbbdf4f210b"

      const { id,name, calories, protein, fat, carbs,fiber } = req.body

      await this.service.consume(token, id,name, calories, protein,fat, carbs, fiber )
      
      res.status(200).json({})
    });
  };

  dailyConsumption = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      const token = "6b8c5f1d-4ce1-4982-83d3-720969912f12"

      const { query } = req.query

      if (!query || typeof query != "string")
          throw InvalidParamsError

      const food = await this.service.dailyConsumption(token, query)
      
      res.json(food)
    });
  };
}
