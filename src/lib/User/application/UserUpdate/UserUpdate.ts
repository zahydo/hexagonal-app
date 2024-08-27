import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserNotFoundError } from "../../domain/UserNotFoundError";
import { UserRepository } from "../../domain/UserRepository";

export class UserUpdate {
    constructor(private readonly repository: UserRepository) {
        this.repository = repository;
    }
    async run(id: string, name: string, email: string, createdAt: Date): Promise<void> {
        const userId = new UserId(id)
        const userExists = await this.repository.getOneById(userId);
        if (!userExists) {
            throw new UserNotFoundError('User not found');
        }
        const user = new User(
            userId,
            new UserName(name),
            new UserEmail(email),
            new UserCreatedAt(createdAt)
        )
        await this.repository.update(user);
    }
}