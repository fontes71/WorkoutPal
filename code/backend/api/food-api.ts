import { Request, Response } from "express";
import { Exercise, Food } from "../domain/types";
import { apiErrorHandler } from "./api-utils";
import { IFoodApi, IFoodData, IFoodServices } from "../domain/interfaces";
import { InvalidParamsError } from "../errors/app_errors";

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

        if (query == undefined || typeof query != "string")
            throw InvalidParamsError

      const food: Food[] = await this.service.searchFood(query, 0, 0);
      res.json(food);
    });
  };
}
