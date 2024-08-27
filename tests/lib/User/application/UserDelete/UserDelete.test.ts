import { UserDelete } from "src/lib/User/application/UserDelete/UserDelete";
import { InMemoryUserRepository } from "../../__mocks__/InMemoryUserRepository";
import { UserStub } from "../../domain/UserStub";

describe("UserDelete should", () => {
    test("delete a user", async () => {
        const userRepository = new InMemoryUserRepository();
        const useCase = new UserDelete(userRepository)

        const user = UserStub.create();
        await userRepository.create(user);
        const existingUsers = await userRepository.getAll()
        expect(existingUsers).toHaveLength(1);

        await useCase.run(user.id.value);

        const users = await userRepository.getAll();
        expect(users).toHaveLength(0);
    })

    test("throw an error when the user does not exist", async () => {
        const userRepository = new InMemoryUserRepository();
        const useCase = new UserDelete(userRepository)

        const user = UserStub.create();
        await userRepository.create(user);

        try {
            await useCase.run("123456");
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toEqual(`User not found`);
            }
        }
    })
})