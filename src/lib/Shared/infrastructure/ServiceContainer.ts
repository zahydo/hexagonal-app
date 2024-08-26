import { UserGetAll } from '../../User/application/UserGetAll/UserGetAll';
import { UserGetOneById } from '../../User/application/UserGetOneById/UserGetOneById';
import { UserCreate } from '../../User/application/UserCreate/UserCreate';
import { UserUpdate } from '../../User/application/UserUpdate/UserUpdate';
import { UserDelete } from '../../User/application/UserDelete/UserDelete';

import { InMemoryUserRepository } from '../../User/infrastructure/InMemoryUserRepository';


const userRepository = new InMemoryUserRepository();

export const ServiceContainer = {
    user: {
        getAll: new UserGetAll(userRepository),
        getOneById: new UserGetOneById(userRepository),
        create: new UserCreate(userRepository),
        update: new UserUpdate(userRepository),
        delete: new UserDelete(userRepository)
    }
}