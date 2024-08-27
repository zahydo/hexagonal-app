import { UserUpdate } from "src/lib/User/application/UserUpdate/UserUpdate";
import { InMemoryUserRepository } from "../../__mocks__/InMemoryUserRepository";
import { UserStub } from "../../domain/UserStub";

describe("UserUpdate should", () => {
    test("update a user", async () => {
        const userRepository = new InMemoryUserRepository();
        const useCase = new UserUpdate(userRepository)

        const user = UserStub.create();
        await userRepository.create(user);

        const updatedUser = UserStub.create();
        await useCase.run(user.id.value, updatedUser.name.value, updatedUser.email.value, updatedUser.createdAt.value);

        const users = await userRepository.getAll();
        expect(users).toHaveLength(1);

        const userUpdated = users[0];
        expect(userUpdated.id.value).toEqual(user.id.value);
        expect(userUpdated.name.value).toEqual(updatedUser.name.value);
        expect(userUpdated.email.value).toEqual(updatedUser.email.value);
        expect(userUpdated.createdAt.value.toISOString()).toEqual(updatedUser.createdAt.value.toISOString());
    })

    test("throw an error when the user does not exist", async () => {
        const userRepository = new InMemoryUserRepository();
        const useCase = new UserUpdate(userRepository)

        const user = UserStub.create();
        await userRepository.create(user);

        try {
            await useCase.run("123456", "Testing", "", new Date());
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toEqual(`User not found`);
            }
        }
    })
})