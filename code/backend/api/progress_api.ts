import { Request, Response } from "express";
import { IProgressApi, IProgressServices } from "../domain/interfaces";
import { apiErrorHandler, getToken, sendResponse } from "../utils/functions/api";
import { StatusCode } from "../domain/api";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { InvalidParamsError } from "../errors/app_errors";

export class ProgressApi implements IProgressApi {
  private service: IProgressServices;

  constructor(service: IProgressServices) {
    this.service = service;
  }

  updateWeight = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
        const token = getToken(req)
        await this.service.updateWeight(req.body.newWeight, req.body.day, token)
        sendResponse(res, StatusCode.Success, `Weight of day (${req.body.day}) updated successfully`, {})
    })
  }

  getDays = async (req: Request, res: Response) => {
    await apiErrorHandler(res, async () => {
      const token = getToken(req)
      const period = !req.query.period ? "month" : req.query.period as string
      const days = await this.service.getDays(period, token)
      sendResponse(res, StatusCode.Success, `Days Successfully Fetched`, {"days": days})
    })
  }
}

