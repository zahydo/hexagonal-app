import { UserGetOneById } from "src/lib/User/application/UserGetOneById/UserGetOneById";
import { InMemoryUserRepository } from "../../__mocks__/InMemoryUserRepository";
import { UserStub } from "../../domain/UserStub";

describe("UserGetOneById should", () => {
    test("return a user", async () => {
        const userRepository = new InMemoryUserRepository();
        const useCase = new UserGetOneById(userRepository)

        const user = UserStub.create();
        await userRepository.create(user);

        const userFound = await useCase.run(user.id.value);

        expect(userFound.id.value).toEqual(user.id.value);
        expect(userFound.name.value).toEqual(user.name.value);
        expect(userFound.email.value).toEqual(user.email.value);
        expect(userFound.createdAt.value.toISOString()).toEqual(user.createdAt.value.toISOString());
    })

    test("throw an error when the user does not exist", async () => {
        const userRepository = new InMemoryUserRepository();
        const useCase = new UserGetOneById(userRepository)

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