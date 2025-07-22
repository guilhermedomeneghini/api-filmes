import{ Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation error',
            issues: err.issues
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
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
}