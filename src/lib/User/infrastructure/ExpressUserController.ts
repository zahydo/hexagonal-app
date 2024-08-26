import { Request, Response } from "express";
import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
import { UserNotFoundError } from "../domain/UserNotFoundError";

export class ExpressUserController {
    async getAll(req: Request, res: Response) {
        const users = await ServiceContainer.user.getAll.run();

        return res.json(users).status(200);
    }

    async getOneById(req: Request, res: Response) {
        const userId = req.params.id;
        try {
            const user = await ServiceContainer.user.getOneById.run(userId);
            return res.json(user).status(200);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            throw error;
        }
    }

    async create(req: Request, res: Response) {
        const { id, name, email, createdAt } = req.body as {
            id: string;
            name: string;
            email: string;
            createdAt: string
        };
        const user = await ServiceContainer.user.create.run(id, name, email, new Date(createdAt));

        return res.json(user).status(201);
    }

    async update(req: Request, res: Response) {
        const { id, name, email, createdAt } = req.body as {
            id: string;
            name: string;
            email: string;
            createdAt: string
        };
        const user = await ServiceContainer.user.update.run(id, name, email, new Date(createdAt));
        return res.json(user).status(204);
    }

    async delete(req: Request, res: Response) {
        const userId = req.params.id;
        await ServiceContainer.user.delete.run(userId);
        return res.status(204).send();
    }
}