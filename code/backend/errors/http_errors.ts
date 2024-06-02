type HttpCode = 404 | 401 | 409 | 400 | 406 | 500
type HttpStatus = 'NOT_FOUND' | 'UNAUTHORIZED' | 'CONFLICT' | 'BAD_REQUEST' | 'NOT_ACCEPTABLE' | 'INTERNAL_SERVER_ERROR'

export interface HttpError {
    code: HttpCode,
    status: HttpStatus,
    message: string
}

const errorsMap: Record<string, HttpError> = {
  'NotFoundError': { code: 404, status: 'NOT_FOUND', message: 'The resource was not found' },
  'AlreadyExistsError': { code: 409, status: 'CONFLICT', message: 'The resource already exists' },
  'InvalidParamsError': { code: 400, status: 'BAD_REQUEST', message: 'Missing or invalid parameters' },
  'InvalidCredentialsError': { code: 400, status: 'BAD_REQUEST', message: 'Invalid Credentials' },
  'IncorrectPasswordError': { code: 400, status: 'BAD_REQUEST', message: 'Password is incorrect' },
  'NonExistentEmailError': { code: 404, status: 'NOT_FOUND', message: 'No user associated with the inserted email' },
  'ExistentEmailError': { code: 409, status: 'CONFLICT', message: 'There is already an account with the inserted email' },
  'InvalidAuthorizationTokenError': { code: 400, status: 'BAD_REQUEST', message: 'Authorization token needs to be bearer' },
  'NonExistentAuthorizationTokenError': { code: 400, status: 'BAD_REQUEST', message: 'No authorization token provided' },
  'UnauthorizedError': { code: 401, status: 'UNAUTHORIZED', message: 'Access denied' },
}

export function mapAppErrorToHttpError(error: Error): HttpError {
  return errorsMap[error.name] || { code: 500, status: 'INTERNAL_SERVER_ERROR', message: 'An internal error has occurred' }
}