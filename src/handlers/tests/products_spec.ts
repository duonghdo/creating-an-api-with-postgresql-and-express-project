import supertest from "supertest";

import app from "../../server";

const request = supertest(app);

describe("Test products endpoints responses", () => {
    it("post /products/ endpoint", async () => {
        const response = await request.post("/products/").send({
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
        const response = await request.get("/products/1");
        expect(response.status).toBe(200);
    });

    it("delete /products/:id endpoint", async () => {
        const response = await request.delete("/products/1");
        expect(response.status).toBe(200);
    });
});