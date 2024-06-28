import { Request, Response } from "express";
import { IProgressApi, IProgressServices } from "../domain/interfaces";
import { apiErrorHandler, getToken, sendResponse } from "../utils/functions/api";
import { StatusCode } from "../domain/api";

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
}

