import { User } from "./User";
import { UserId } from "./UserId";

export interface UserRepository {
    create(user: User): Promise<void>
    update(user: User): Promise<void>
    delete(id: UserId): Promise<void>
    getOneById(id: UserId): Promise<User | null>
    getAll(): Promise<User[]>

}