class AppError extends Error {}

export class NotFoundError extends AppError {}
export class InalidParamsError extends AppError {}
export class InvalidCredentialsError extends AppError {}
export class IncorrectPasswordError extends AppError {}
export class NonExistentEmailError extends AppError {}