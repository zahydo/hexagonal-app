import { UserGetAll } from "src/lib/User/application/UserGetAll/UserGetAll"
import { InMemoryUserRepository } from "../../__mocks__/InMemoryUserRepository"

describe("UserGetAll should", () => {
    test("return all users", async () => {
        const userRepository = new InMemoryUserRepository();
        const useCase = new UserGetAll(userRepository)

        const users = await useCase.run();

        expect(users).toHaveLength(0);
    })
})