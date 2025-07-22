export class AppError extends Error {
  statusCode: number;
  details?: any;
  constructor(message: string, statusCode = 400, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class AuthError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 401, details);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 404, details);
  }
}