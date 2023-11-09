import supertest from "supertest";

import app from "../../server";

const request = supertest(app);

describe("Test products endpoints responses", () => {
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
        await request.delete('/users/2').set('Authorization', 'Bearer ' + token);
    });

    it("post /products/ endpoint", async () => {
        const response = await request.post("/products/").set('Authorization', 'Bearer ' + token).send({
            name: "test product",
            price: 100,
        });
        expect(response.status).toBe(200);
    });

    it("get /products/ endpoint", async () => {
        const response = await request.get("/products/");
        expect(response.status).toBe(200);
    });

    it("get /products/:id endpoint", async () => {
        const response = await request.get("/products/2");
        expect(response.status).toBe(200);
    });

    it("delete /products/:id endpoint", async () => {
        const response = await request.delete("/products/2").set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
});