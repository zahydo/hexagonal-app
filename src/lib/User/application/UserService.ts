import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserId } from "../domain/UserId";
import { IUserService } from "./IUserService";


// TODO: REMOVE! It's not used in this example, but it's a good practice to define interfaces for services for small apps
export class UserService implements IUserService {
    constructor(private readonly repository: UserRepository) {
        this.repository = repository;
    }
    getUser(id: UserId): Promise<User | null> {
        return this.repository.getOneById(id);
    }
    create(user: User): Promise<void> {
        return this.repository.create(user);
    }
    update(user: User): Promise<void> {
        return this.repository.update(user);
    }
    delete(id: UserId): Promise<void> {
        return this.repository.delete(id);
    }
    getAll(): Promise<User[]> {
        return this.repository.getAll();
    }
}

// Instead of using this, we'll define a service for each use case