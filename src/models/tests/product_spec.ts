import { ProductStore } from '../product';

const productStore = new ProductStore();

describe("Product Model", () => {
    it("should have an index method", () => {
        expect(productStore.index).toBeDefined();
    });

    it("should have a show method", () => {
        expect(productStore.show).toBeDefined();
    });

    it("should have a create method", () => {
        expect(productStore.create).toBeDefined();
    });

    it("should have a delete method", () => {
        expect(productStore.delete).toBeDefined();
    });

    it("create method should add a product", async () => {
        const result = await productStore.create({
            name: 'test',
            price: 1,
        });
        expect(result).toEqual({
            id: 1,
            name: 'test',
            price: 1,
        });
    });

    it("index method should return a list of products", async () => {
        const result = await productStore.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'test',
                price: 1,
            },
        ]);
    });

    it("show method should return the correct product", async () => {
        const result = await productStore.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'test',
            price: 1,
        });
    });

    it("delete method should remove the product", async () => {
        await productStore.delete(1);
        const result = await productStore.index();
        expect(result).toEqual([]);
    });
});