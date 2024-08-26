import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UserGetAll {
    constructor(private readonly repository: UserRepository) {
        this.repository = repository;
    }

    async run(): Promise<User[]> {
        return this.repository.getAll();
    }
}