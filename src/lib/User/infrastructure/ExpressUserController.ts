import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
import { UserNotFoundError } from "../domain/UserNotFoundError";
import { z } from 'zod';
import { userIdSchema, UserSchema, zodErrorToResponse } from "./ExpressUserSchema";

export class ExpressUserController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await ServiceContainer.user.getAll.run();
            return res.json(users.map((user) => user.mapToPrimitives())).status(200);
        } catch (error) {
            next(error);
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        try {
            userIdSchema.parse(userId);
            const user = await ServiceContainer.user.getOneById.run(userId);
            return res.json(user.mapToPrimitives()).status(200);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            zodErrorToResponse(error, res, next);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, email, createdAt } = req.body as {
                id: string;
                name: string;
                email: string;
                createdAt: string
            };
            UserSchema.parse({ id, name, email, createdAt });
            const user = await ServiceContainer.user.create.run(id, name, email, new Date(createdAt));
            return res.json(user).status(201);
        } catch (error) {
            zodErrorToResponse(error, res, next);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, email, createdAt } = req.body as {
                id: string;
                name: string;
                email: string;
                createdAt: string
            };
            UserSchema.parse({ id, name, email, createdAt });
            const user = await ServiceContainer.user.update.run(id, name, email, new Date(createdAt));
            return res.json(user).status(204);
        } catch (error) {
            zodErrorToResponse(error, res, next);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            userIdSchema.parse(userId);
            await ServiceContainer.user.delete.run(userId);
            return res.status(204).send();
        } catch (error) {
            zodErrorToResponse(error, res, next);
        }
    }
}