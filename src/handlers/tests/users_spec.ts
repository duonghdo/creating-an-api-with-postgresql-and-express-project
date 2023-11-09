import supertest from "supertest";

import app from "../../server";

const request = supertest(app);

describe("Test users endpoints responses", () => {
    let token: string;

    beforeAll(async () => {
        const testUser = (await request.post('/users/').send({
            firstname: 'John',
            lastname: 'Doe',
            password: 'pw1234',
        }));
        token = testUser.body;
    });

    afterAll(async () => {
        await request.delete('/users/3').set('Authorization', 'Bearer ' + token);
    });

    it("post /users/ endpoint", async () => {
        const response = await request.post("/users/").send({
            firstname: "John",
            lastname: "Doe",
            password: "pw1234",
        });
        expect(response.status).toBe(200);
    });

    it("get /users/ endpoint", async () => {
        const response = await request.get("/users/").set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });

    it("get /users/:id endpoint", async () => {
        const response = await request.get("/users/3").set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });

    it("post /users/authenticate endpoint", async () => {
        const response = await request.post("/users/authenticate").send({
            firstname: "John",
            lastname: "Doe",
            password: "pw1234",
        });
        expect(response.status).toBe(200);
    });

    it("delete /users/:id endpoint", async () => {
        const response = await request.delete("/users/4").set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
});