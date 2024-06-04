
import { InvalidAuthorizationTokenError, NonExistentAuthorizationTokenError } from "../../errors/app_errors";
import { HttpError, mapAppErrorToHttpError } from "../../errors/http_errors";
import { Request, Response, NextFunction } from "express";



export async function apiErrorHandler(res: Response, action: () => Promise<void>) {
    try {
        await action() 
    } catch(error: any) {
        console.log("Error -> ", error)
        const httpError: HttpError = mapAppErrorToHttpError(error)
        res.status(httpError.code).json({error_message: httpError.message})
    }
}

export function getToken(req: Request): string {
    const authHeader = req.headers.authorization
    if (!authHeader) throw NonExistentAuthorizationTokenError
    else {
      const tokenInfo = authHeader.split(' ')
      const tokenType = tokenInfo[0]
      if (tokenType != 'Bearer') throw InvalidAuthorizationTokenError
      return tokenInfo[1]
    }
  }

 export const sendResponse = (
    res: Response<any, Record<string, any>>,
    code: number,
    message: string,
    obj: any
  ) => {
    return res.status(code).json({
      statusCode: code,
      message: message,
      obj: obj,
    });
  };
  