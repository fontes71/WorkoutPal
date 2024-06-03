import { Request, Response } from "express";
import { Exercise, Food } from "../domain/types";
import { IFoodApi, IFoodData, IFoodServices } from "../domain/interfaces";
import { InvalidParamsError } from "../errors/app_errors";
import { apiErrorHandler } from "../utils/functions/api";

export class FoodApi implements IFoodApi {
  private service: IFoodServices;

  constructor(service: IFoodServices) {
    this.service = service;
  }

  searchByName = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const { query } = req.query;

      if (!query || typeof query != "string") throw InvalidParamsError;

      const food: Food[] = await this.service.searchByName(query, 0, 0);
      res.status(200).json(food);
    });
  };

  searchByBarcode = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const { barcode } = req.query;

      if (!barcode || typeof barcode != "string") throw InvalidParamsError;

      const food: Food = await this.service.searchByBarcode(parseInt(barcode));
      res.status(200).json(food);
    });
  };

  consume = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = "6b8c5f1d-4ce1-4982-83d3-720969912f12";

      const { id, name, calories, protein, fat, carbs } = req.body;

      await this.service.consume(
        token,
        id,
        name,
        calories,
        protein,
        fat,
        carbs
      );

      res.status(201).json({});
    });
  };

  dailyConsumption = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = "6b8c5f1d-4ce1-4982-83d3-720969912f12";

      const { query } = req.query;

      if (!query || typeof query != "string") throw InvalidParamsError;

      const food = await this.service.dailyConsumption(token, query);

      res.status(200).json(food);
    });
  };
}
