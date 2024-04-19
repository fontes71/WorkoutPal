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

  searchFood = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
        const { query } = req.query

        if (!query || typeof query != "string")
            throw InvalidParamsError

      const food: Food[] = await this.service.searchFood(query, 0, 0);
      res.json(food);
    });
  };

  consumeFood = (req: Request, res: Response) => {
    apiErrorHandler(res, async () => {
      const token = "711a048a-9537-40c9-859f-8cbbdf4f210b"

      const { id,name, calories, protein,fat, carbs,fiber } = req.body

      await this.service.consumeFood(token, id,name, calories, protein ,fat, carbs, fiber )
      
      res.status(200).json({})
    });
  };
}
