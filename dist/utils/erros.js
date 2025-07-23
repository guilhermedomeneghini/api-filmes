"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.AuthError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 400, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}
exports.AppError = AppError;
class AuthError extends AppError {
    constructor(message, details) {
        super(message, 401, details);
    }
}
exports.AuthError = AuthError;
class NotFoundError extends AppError {
    constructor(message, details) {
        super(message, 404, details);
    }
}
exports.NotFoundError = NotFoundError;
