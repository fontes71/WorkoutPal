import { Request, Response } from "express";
import { Exercise, Food } from "../domain/types";
import { IFoodApi, IFoodData, IFoodServices } from "../domain/interfaces";
import { InvalidDateError, InvalidParamsError } from "../errors/app_errors";
import { apiErrorHandler, getToken, sendResponse } from "../utils/functions/api";
import { StatusCode } from "../domain/api";
import { isValid } from "date-fns";
import isValidDate from "../utils/functions/app/isValidDate";

export class FoodApi implements IFoodApi {
  private service: IFoodServices;

  constructor(service: IFoodServices) {
    this.service = service;
  }

  searchByName = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const { query } = req.query;
      const { page } = req.query;
  

      if (!query || typeof query != "string" || page && typeof page != "string") throw InvalidParamsError;

      const parsedPage = page ? parseInt(page) : 0

      const food: Food[] = await this.service.searchByName(query, parsedPage);

 
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

  log = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = getToken(req);

      const foodItem: Food = req.body.food;
      const date: string = req.body.date;
      console.log(date)

      if (!isValidDate(date))
        throw InvalidDateError

      const food = await this.service.log(
        token,
        foodItem,
        date
      );

      sendResponse(res, StatusCode.Created, "Food item logged successfully", food)
    });
  };

  
  delete = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = getToken(req);

      const food = await this.service.delete(token, parseInt(req.params.itemIndex));

      sendResponse(res, StatusCode.Success, "Food item deleted successfully", food)
    });
  };

  dailyConsumption = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = getToken(req);
      console.log(req.params)

      const { date } = req.params;

      if (!isValidDate(date))
        throw InvalidDateError

      if (!date || typeof date != "string") throw InvalidParamsError;

      const food = await this.service.dailyConsumption(token, date);

      sendResponse(res, StatusCode.Success, "Daily consumption fetch successful", food)
    });
  };

}

