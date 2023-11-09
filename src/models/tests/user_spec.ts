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

    it("should have an authenticate method", () => {
        expect(userStore.authenticate).toBeDefined();
    });

    it("create method should add a user", async () => {
        const result = await userStore.create({
            firstname: 'John',
            lastname: 'Doe',
            password: 'pw1234',
        });
        expect(result.firstname).toEqual('John');
        expect(result.lastname).toEqual('Doe');
    });

    it("index method should return a list of users", async () => {
        const result = await userStore.index();
        expect(result[0].firstname).toEqual('John');
        expect(result[0].lastname).toEqual('Doe');
    });

    it("show method should return the correct user", async () => {
        const result = await userStore.show(5);
        expect(result.firstname).toEqual('John');
        expect(result.lastname).toEqual('Doe');
    });

    it("authenticate method should return the correct user", async () => {
        const result = await userStore.authenticate('John', 'Doe', 'pw1234');
        expect(result).not.toBeNull();
    });

    it("delete method should remove the user", async () => {
        await userStore.delete(5);
        const result = await userStore.index();
        expect(result).toEqual([]);
    });
});