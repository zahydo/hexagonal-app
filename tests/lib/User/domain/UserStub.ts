import { User } from "src/lib/User/domain/User";
import { UserCreatedAt } from "src/lib/User/domain/UserCreatedAt";
import { UserEmail } from "src/lib/User/domain/UserEmail";
import { UserId } from "src/lib/User/domain/UserId";
import { UserName } from "src/lib/User/domain/UserName";

import { faker } from '@faker-js/faker';

export class UserStub {
    static create(): User {
        return new User(
            new UserId(faker.string.uuid()),
            new UserName(faker.person.fullName()),
            new UserEmail(faker.internet.email()),
            new UserCreatedAt(new Date())
        );
    }
}