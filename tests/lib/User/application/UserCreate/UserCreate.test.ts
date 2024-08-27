import { UserCreate } from "src/lib/User/application/UserCreate/UserCreate"
import { InMemoryUserRepository } from "../../__mocks__/InMemoryUserRepository"
import { UserStub } from "../../domain/UserStub";

describe("UserCreate should", () => {
    test("return all users", async () => {
        const userRepository = new InMemoryUserRepository();
        const useCase = new UserCreate(userRepository)

        const invalidUser = { id: "1", name: "Testing", email: "fasfsadfa@asefsda.com", createdAt: new Date(), }
        await invalidErrorMessage(useCase, invalidUser, `Invalid ID: ${invalidUser.id}. Less than 5 characters.`);
        invalidUser.id = "123456";
        invalidUser.name = "a";
        await invalidErrorMessage(useCase, invalidUser, `Invalid name: ${invalidUser.name}. Less than 5 characters.`);
        invalidUser.name = "Testing";
        invalidUser.email = "a";
        await invalidErrorMessage(useCase, invalidUser, `Invalid email: ${invalidUser.email}.`);

        const validUser = UserStub.create();
        await useCase.run(validUser.id.value, validUser.name.value, validUser.email.value, validUser.createdAt.value);

        const users = await userRepository.getAll();
        expect(users).toHaveLength(1);

        const user = users[0];
        expect(user.id.value).toEqual(validUser.id.value);
        expect(user.name.value).toEqual(validUser.name.value);
        expect(user.email.value).toEqual(validUser.email.value);
        expect(user.createdAt.value.toISOString()).toEqual(validUser.createdAt.value.toISOString());
    })
});

async function invalidErrorMessage(useCase: UserCreate, invalidUser: any, errorMessage: string): Promise<void> {
    try {
        await useCase.run(invalidUser.id, invalidUser.name, invalidUser.email, invalidUser.createdAt);
    } catch (error) {
        if (error instanceof Error) {
            expect(error.message).toEqual(errorMessage);
        }
    }
}