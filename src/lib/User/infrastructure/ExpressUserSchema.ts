import { NextFunction, Response } from 'express';
import { z } from 'zod';
import { UserNotFoundError } from '../domain/UserNotFoundError';

export const userIdSchema = z.string().min(5);

export const UserSchema = z.object({
    id: z.string().min(5),
    name: z.string(),
    email: z.string().email()
});

export const zodErrorToResponse = (error: unknown, response: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        return response.status(400).json({ message: error.errors });
    }
    if (error instanceof UserNotFoundError) {
        return response.status(404).json({ message: error.message });
    }
    next(error);
}
