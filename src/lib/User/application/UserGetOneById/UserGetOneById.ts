import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { UserNotFoundError } from "../../domain/UserNotFoundError";
import { UserRepository } from "../../domain/UserRepository";

export class UserGetOneById {
    constructor(private readonly repository: UserRepository) {
        this.repository = repository;
    }
    async run(id: string): Promise<User> {
        const user = await this.repository.getOneById(new UserId(id));

        if (!user) { throw new UserNotFoundError('User not found'); }
        return user;
    }
}