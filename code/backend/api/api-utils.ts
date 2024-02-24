import { Response } from "express";
import { HttpError, mapAppErrorToHttpError } from "../errors/http_errors";

export async function apiErrorHandler(res: Response, action: () => Promise<void>) {
    try {
        await action() 
    } catch(error) {
        const httpError: HttpError = mapAppErrorToHttpError(error)
        res.status(httpError.code).json({error_message: httpError.message})
    }
}