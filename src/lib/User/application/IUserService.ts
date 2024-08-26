import { User } from "../domain/User";
import { UserId } from "../domain/UserId";


// TODO: REMOVE! Not used in this example, but it's a good practice to define interfaces for services for small apps
export interface IUserService {
    getUser(id: UserId): Promise<User | null>;
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(id: UserId): Promise<void>;
    getAll(): Promise<User[]>;
}


 // this approach could adds dependency between developers because it contains all the requirements in one service
