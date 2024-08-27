import * as request from 'supertest';
import * as express from 'express';
import { ExpressUserRouter } from 'src/lib/User/infrastructure/ExpressUserRouter';



describe("ExpressUserRouter should", () => {
    let app: express.Application;
    const createdUserIds: string[] = [];

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use(ExpressUserRouter);
    });

    afterAll(async () => {
        for (const userId of createdUserIds) {
            await request(app).delete(`/users/${userId}`);
        }
    })

    test("return all users", async () => {
        const response = await request(app).get('/users');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([]);
    });

    test("create a user", async () => {
        const response = await request(app).post('/users').send({
            id: "123456",
            name: 'John Doe',
            email: 'asdfaf@asdfasfsa.com'
        });
        createdUserIds.push("123456");
        expect(response.status).toEqual(200);
    });

    test("return a user", async () => {
        const response = await request(app).get('/users/12345678');
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({ message: 'User not found' });

        const responseCreation = await request(app).post('/users').send({
            id: "1234567",
            name: 'John Doe',
            email: 'asdfaf@asdfasfsa.com',
        })
        createdUserIds.push("1234567");
        expect(responseCreation.status).toEqual(200);

        const responseGetOneById = await request(app).get('/users/1234567');
        expect(responseGetOneById.status).toEqual(200);
        expect(responseGetOneById.body.id).toEqual("1234567");
        expect(responseGetOneById.body.name).toEqual("John Doe");
        expect(responseGetOneById.body.email).toEqual("asdfaf@asdfasfsa.com");
    });

    test("update a user", async () => {
        const responseCreation = await request(app).post('/users').send({
            id: "123456890",
            name: 'John Doe',
            email: 'asdfaf@asdfasfsa.com',
        })
        createdUserIds.push("123456890");
        expect(responseCreation.status).toEqual(200);
        const response = await request(app).put('/users').send({
            id: '123456890',
            name: 'John Doe',
            email: "updatedEmail@asdfasfsa.com"
        })
        expect(response.status).toEqual(200);

        const responseGetOneById = await request(app).get('/users/123456890');
        expect(responseGetOneById.status).toEqual(200);
        expect(responseGetOneById.body.id).toEqual("123456890");
        expect(responseGetOneById.body.name).toEqual("John Doe");
        expect(responseGetOneById.body.email).toEqual("updatedEmail@asdfasfsa.com");
    });

    test("delete a user", async () => {
        const responseCreation = await request(app).post('/users').send({
            id: "1234568901",
            name: 'John Doe',
            email: 'deletedUser@gmail.com'
        });
        expect(responseCreation.status).toEqual(200);
        const response = await request(app).delete('/users/1234568901');
        expect(response.status).toEqual(204);
    })
})

