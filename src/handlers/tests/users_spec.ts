import supertest from "supertest";

import app from "../../server";

const request = supertest(app);

describe("Test users endpoints responses", () => {
    it("post /users/ endpoint", async () => {
        const response = await request.post("/users/").send({
            firstname: "John",
            lastname: "Doe",
            password: "pw1234",
        });
        expect(response.status).toBe(200);
    });

    it("get /users/ endpoint", async () => {
        const response = await request.get("/users/");
        expect(response.status).toBe(200);
    });

    it("get /users/:id endpoint", async () => {
        const response = await request.get("/users/1");
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
        const response = await request.delete("/users/1");
        expect(response.status).toBe(200);
    });
});