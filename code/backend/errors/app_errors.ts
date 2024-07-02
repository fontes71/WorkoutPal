class AppError extends Error {}

export class NotFoundError extends AppError {}
export class AlreadyExistsError extends AppError {}
export class InvalidParamsError extends AppError {}
export class InvalidCredentialsError extends AppError {}
export class IncorrectPasswordError extends AppError {}
export class NonExistentEmailError extends AppError {}
export class ExistentEmailError extends AppError {}
export class InvalidAuthorizationTokenError extends AppError {}
export class NonExistentAuthorizationTokenError extends AppError {}
export class UnauthorizedError extends AppError {}
export class InvalidBarcodeError extends AppError {}
export class NoItemToDeleteError extends AppError {}
export class InvalidLoggedFoodIndexError extends AppError {}
export class InvalidDateError extends AppError {}