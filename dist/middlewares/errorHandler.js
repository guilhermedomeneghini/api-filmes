"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation error',
            issues: err.issues
        });
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({
            status: 'error',
            message: 'Database error',
            details: err.message
        });
    }
    console.error(err);
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
};
exports.errorHandler = errorHandler;
