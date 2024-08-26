import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];
    async create(user: User): Promise<void> {
        this.users.push(user);
    }
    async update(user: User): Promise<void> {
        const index = this.users.findIndex((u) => u.id.value === user.id.value);
        this.users[index] = user;
    }
    async delete(id: UserId): Promise<void> {
        this.users = this.users.filter((u) => u.id.value !== id.value);
    }
    async getOneById(id: UserId): Promise<User | null> {
        return this.users.find((u) => u.id.value === id.value) || null;
    }
    async getAll(): Promise<User[]> {
        return this.users;
    }
}