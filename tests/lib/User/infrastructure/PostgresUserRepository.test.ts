import { PostgresUserRepository } from "src/lib/User/infrastructure/PostgresUserRepository";
import { UserStub } from "../domain/UserStub";

import * as dotenv from "dotenv";
import { User } from "src/lib/User/domain/User";
import { UserId } from "src/lib/User/domain/UserId";
import { UserName } from "src/lib/User/domain/UserName";
import { UserEmail } from "src/lib/User/domain/UserEmail";
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
}


describe("PostgresUserRepository should", () => {

    const createdUsers: User[] = [];
    const userRepository = new PostgresUserRepository(DATABASE_URL);

    afterAll(async () => {
        await userRepository.deleteAll(createdUsers.map((user) => user.id));
    })

    test("create a user", async () => {

        const user = UserStub.create();

        await userRepository.create(user);
        createdUsers.push(user);

        const userFound = await userRepository.getOneById(user.id);

        expect(userFound?.id.value).toEqual(user.id.value);
        expect(userFound?.name.value).toEqual(user.name.value);
        expect(userFound?.email.value).toEqual(user.email.value);
    })

    test("get all users", async () => {
        const user1 = UserStub.create();
        const user2 = UserStub.create();
        const user3 = UserStub.create();

        await userRepository.create(user1);
        await userRepository.create(user2);
        await userRepository.create(user3);
        createdUsers.push(user1);
        createdUsers.push(user2);
        createdUsers.push(user3);

        const users = await userRepository.getAll();

        expect(users.length).toEqual(createdUsers.length);
    });

    test("return a user", async () => {
        const user = UserStub.create();

        await userRepository.create(user);
        createdUsers.push(user);

        const userFound = await userRepository.getOneById(user.id);

        expect(userFound).not.toBeNull();

        if (userFound) {
            expect(userFound.id.value).toEqual(user.id.value);
            expect(userFound.name.value).toEqual(user.name.value);
            expect(userFound.email.value).toEqual(user.email.value);
        }
    });

    test("update a user", async () => {
        const user = UserStub.create();

        await userRepository.create(user);
        createdUsers.push(user);

        const userUpdated = new User(
            user.id,
            new UserName("updated name"),
            new UserEmail("asdfasdf@sample.com"),
            user.createdAt
        );

        await userRepository.update(userUpdated);

        const userFound = await userRepository.getOneById(user.id);

        expect(userFound?.id.value).toEqual(userUpdated.id.value);
        expect(userFound?.name.value).toEqual(userUpdated.name.value);
        expect(userFound?.email.value).toEqual(userUpdated.email.value);
    });

    test("delete a user", async () => {
        const user = UserStub.create();

        await userRepository.create(user);

        await userRepository.delete(user.id);

        const userFound = await userRepository.getOneById(user.id);

        expect(userFound).toBeNull();
    });

    test("throw an error when the user does not exist", async () => {
        try {
            await userRepository.getOneById(new UserId("123456"));
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toEqual(`User not found`);
            }
        }
    })
});