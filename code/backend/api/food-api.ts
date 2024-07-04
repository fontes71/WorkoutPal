import { Request, Response } from "express";
import { Food } from "../domain/types";
import { IFoodApi, IFoodServices } from "../domain/interfaces";
import { InvalidDateError, InvalidLogIndexError, InvalidParamsError } from "../errors/app_errors";
import { apiErrorHandler, getToken, sendResponse } from "../utils/functions/api";
import { StatusCode } from "../domain/api";
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

      if (!date || typeof date != "string") throw InvalidParamsError;

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

  updateLog = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = getToken(req);

      const foodItem: Food = req.body.food;
      const date: string = req.body.date;
      const logIndex = parseInt(req.body.logIndex);

      if (logIndex < 0)
        throw InvalidLogIndexError


      if (!isValidDate(date))
        throw InvalidDateError

      const food = await this.service.updateLog(
        token,
        foodItem,
        date,
        logIndex
      );

      sendResponse(res, StatusCode.Success, "Food item log updated successfully", food)
    });
  };

  
  deleteLog = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = getToken(req);

      
      const { date } = req.query;
      if (!date || typeof date != "string") throw InvalidParamsError;

      if (!isValidDate(date))
        throw InvalidDateError

      const logIndex = parseInt(req.params.logIndex)
      if (logIndex < 0)
        throw InvalidLogIndexError

      const food = await this.service.deleteLog(token, logIndex, date);

      sendResponse(res, StatusCode.Success, "Food item log deleted successfully", food)
    });
  };

  dailyConsumption = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = getToken(req);

      const { date } = req.params;

      if (!date || typeof date != "string") throw InvalidParamsError;

      if (!isValidDate(date))
        throw InvalidDateError

      if (!date || typeof date != "string") throw InvalidParamsError;

      const food = await this.service.dailyConsumption(token, date);

      sendResponse(res, StatusCode.Success, "Daily consumption fetch successful", food)
    });
  };

}

