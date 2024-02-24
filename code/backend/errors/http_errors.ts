type HttpCode = 404 | 401 | 409 | 400 | 406 | 500
type HttpStatus = 'NOT_FOUND' | 'UNAUTHORIZED' | 'CONFLICT' | 'BAD_REQUEST' | 'NOT_ACCEPTABLE' | 'INTERNAL_SERVER_ERROR'

export interface HttpError {
    code: HttpCode,
    status: HttpStatus,
    message: string
}

const errorsMap: Record<string, HttpError> = {
  'NotFoundError': { code: 404, status: 'NOT_FOUND', message: 'The resource was not found' }
}

export function mapAppErrorToHttpError(error: Error): HttpError {
  return errorsMap[error.name] || { code: 500, status: 'INTERNAL_SERVER_ERROR', message: 'An internal error has occurred' }
}