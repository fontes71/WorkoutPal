import { Request, Response } from "express";
import { Exercise, Food } from "../domain/types";
import { IFoodApi, IFoodData, IFoodServices } from "../domain/interfaces";
import { InvalidParamsError } from "../errors/app_errors";
import { apiErrorHandler, getToken, sendResponse } from "../utils/functions/api";
import { StatusCode } from "../domain/api";

export class FoodApi implements IFoodApi {
  private service: IFoodServices;

  constructor(service: IFoodServices) {
    this.service = service;
  }

  searchByName = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const { query } = req.query;
      const { page } = req.query;

     
  

      if (!query || typeof query != "string" || !page || typeof page != "string") throw InvalidParamsError;

      const food: Food[] = await this.service.searchByName(query, parseInt(page));

 
      sendResponse(res, StatusCode.Success, "Search successful", food)
    });
  };

  searchByBarcode = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const { barcode } = req.query;

      if (!barcode || typeof barcode != "string") throw InvalidParamsError;

      const food: Food = await this.service.searchByBarcode(parseInt(barcode));
      sendResponse(res, StatusCode.Success, "Search successful", food)
    });
  };

  consume = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = getToken(req);

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

      sendResponse(res, StatusCode.Created, "Food item consumed successfully", {})
    });
  };

  dailyConsumption = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = getToken(req);

      const { query } = req.query;

      if (!query || typeof query != "string") throw InvalidParamsError;

      const food = await this.service.dailyConsumption(token, query);

      sendResponse(res, StatusCode.Success, "Daily consumption fetch successful", food)
    });
  };
}

