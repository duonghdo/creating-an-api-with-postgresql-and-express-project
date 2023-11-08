import { UserStore } from "../user";

const userStore = new UserStore();

describe("User Model", () => {
    it("should have an index method", () => {
        expect(userStore.index).toBeDefined();
    });

    it("should have a show method", () => {
        expect(userStore.show).toBeDefined();
    });

    it("should have a create method", () => {
        expect(userStore.create).toBeDefined();
    });

    it("should have a delete method", () => {
        expect(userStore.delete).toBeDefined();
    });

    it("create method should add a user", async () => {
        const result = await userStore.create({
            firstname: 'John',
            lastname: 'Doe',
            password: 'pw1234',
        });
        expect(result).toEqual({
            id: 2,
            firstname: 'John',
            lastname: 'Doe',
            password: 'pw1234',
        });
    });

    it("index method should return a list of users", async () => {
        const result = await userStore.index();
        expect(result).toEqual([
            {
                id: 2,
                firstname: 'John',
                lastname: 'Doe',
                password: 'pw1234',
            },
        ]);
    });

    it("show method should return the correct user", async () => {
        const result = await userStore.show(2);
        expect(result).toEqual({
            id: 2,
            firstname: 'John',
            lastname: 'Doe',
            password: 'pw1234',
        });
    });

    it("delete method should remove the user", async () => {
        await userStore.delete(2);
        const result = await userStore.index();
        expect(result).toEqual([]);
    });
});